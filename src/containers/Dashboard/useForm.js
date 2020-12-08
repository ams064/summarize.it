import { useState, useContext, useEffect } from "react";
import { AppContext } from "../../context/Provider";
import { useHistory } from "react-router-dom";
import { updateUserInfo } from "../../context/actions/update";
import axios from 'axios';

export default () => {

    const {
      authDispatch,
      authState: {
        auth: { error, data, isAuth, rowsChange },
      },
    } = useContext(AppContext);

    const [form, setForm] = useState('');
    const [err, setErr] = useState('');
    const [loading, setLoading] = useState(false);
    const [rows, setRows] = useState([]);
    const [rowsChanged, setRowsChanged] = useState(true);
    const history = useHistory();
    const [downloading, setDownloading] = useState({});
  
    const onChange = (event) => {
      const { target: { name, value } } = event;
      setForm({...form, [name] : value});
    }

    let axiosConfig = {
      headers: {
          'Authorization': data.signInUserSession.idToken.jwtToken,
      }
    };

    const onSubmit = () => {
      setLoading(true);
      if (form.newPassword?.length !== 0 && form.newPassword === form.confirmPassword) {
        updateUserInfo(form)(authDispatch)(setLoading);
      } else if (form.newPassword?.length === 0) {
        updateUserInfo(form)(authDispatch)(setLoading);
      }
      else if(form.newPassword !== form.confirmPassword) {
        setErr('Passwords does not match');
        setLoading(false);
      }
    };

    const handleDocumentDownload = (row, index) => {

      var postData = {
        document_name: row['document'],
        timestamp : row['date'],
      };

      setDownloading({...downloading, [index] : true});
      axios.post('https://c915r94n6g.execute-api.us-west-1.amazonaws.com/ver1', postData, axiosConfig)
      .then((url) => {
        let u = url.data.body.substring(9, url.data.body.length - 1);
        return axios.get('https://'  + u)
      })
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', row['document'] +'.txt');
        document.body.appendChild(link);
        link.click();
        setDownloading({...downloading, [index] : false});
      })
      .catch((err) => {
        console.log(err);
        setDownloading({...downloading, [index] : false});
      })
    }
    
    useEffect(() => {
      if (isAuth && data) {
        if (data && data.signInUserSession !== null) {
          setForm({['firstName'] : data.attributes['custom:first_name'], ['lastName'] : data.attributes['custom:last_name'], ['email'] : data.attributes['email'], ['currentPassword'] : '', ['newPassword'] :'', ['confirmPassword'] : '' });
          history.push("/dashboard");
        }
      } else {
          history.push("/dashboard");
      }
    }, [data]);

    useEffect(() => {
      let axiosConfig = {
        headers: {
            'Authorization': data.signInUserSession.idToken.jwtToken,
        }
      };

      axios.post('https://z44imzml3m.execute-api.us-west-1.amazonaws.com/Ver1', {dummy_data : "test"}, axiosConfig)
      .then((res) => {
        let r = JSON.parse(res.data.body);
        setRows(r);
        setRowsChanged(false);
      }).catch((err) => {
        console.log(err);
      })
    }, [rowsChanged]);
  
    const load = loading;
    const infoUpdated = ((form.firstName?.length && form.lastName?.length) && (
      (!form.newPassword?.length && !form.currentPassword?.length && !form.confirmPassword?.length) ||
      (form.newPassword?.length && form.currentPassword?.length && form.confirmPassword?.length))) === 0 ? false : true;

    return { form, infoUpdated, onChange, onSubmit, load, rows, handleDocumentDownload, downloading};
};
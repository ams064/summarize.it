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

    const [newPage, setPage] = useState(0);
    const [form, setForm] = useState('');
    const [infoUp, setInfoUp] = useState(false);
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

    const onSubmit = () => {
      setInfoUp(false);
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

    const handleDocumentDownload = (row) => {
      var postData = {
        document_name: row['document'],
        timestamp : 'today',
      };
      
      let axiosConfig = {
        headers: {
            'Access-Control-Allow-Origin' : '*',
            'Authorization': data.signInUserSession.idToken.jwtToken,
        }
      };
      setDownloading({...downloading, [row['document']] : true});
      axios.post('https://c915r94n6g.execute-api.us-west-1.amazonaws.com/ver1', postData, axiosConfig)
      .then((url) => {
        return axios.get(url.data)
      })
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'hello.txt');
        document.body.appendChild(link);
        link.click();
        setDownloading({...downloading, [row['document']] : false});
      })
      .catch((err) => {
        console.log(err);
        setDownloading({...downloading, [row['document']] : false});
      })
    }
    
    useEffect(() => {
      if (isAuth && data) {
        if (data && data.signInUserSession != null) {
          setForm({['firstName'] : data.attributes['custom:first_name'], ['lastName'] : data.attributes['custom:last_name'], ['email'] : data.attributes['email'], ['currentPassword'] : '', ['newPassword'] :'', ['confirmPassword'] : '' });
          history.push("/dashboard");
        }
      } else {
          history.push("/dashboard");
      }
    }, [data]);

    useEffect(() => {
      axios.post('https://ptdnxz4a65.execute-api.us-west-2.amazonaws.com/test', {document_name : 'hello'})
      .then((res) => {
        let r = JSON.parse(res.data.body);
        setRows(r);
        setRowsChanged(false);
        console.log(r);  
      }).catch((err) => {
        console.log(err);
      })
    }, [rowsChanged]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        // call api to get the rows and update it.
        setRows({});
    };
  
    const load = loading;
    const infoUpdated = ((form.firstName?.length && form.lastName?.length) && (
      (!form.newPassword?.length && !form.currentPassword?.length && !form.confirmPassword?.length) ||
      (form.newPassword?.length && form.currentPassword?.length && form.confirmPassword?.length))) == 0 ? false : true;

    return { form, infoUpdated, onChange, onSubmit, load, rows, handleDocumentDownload, downloading};
};
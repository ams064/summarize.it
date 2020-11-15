import { useState, useContext, useEffect } from "react";
import { AppContext } from "../../context/Provider";
import { useHistory } from "react-router-dom";
import { updateUserInfo } from "../../context/actions/update";

function createData(document, date, download) {
    return { document, date, download };   
}

export default () => {

    const {
      authDispatch,
      authState: {
        auth: { error, data, isAuth },
      },
    } = useContext(AppContext);

    const [newPage, setPage] = useState(0);
    const [form, setForm] = useState('');
    const [infoUp, setInfoUp] = useState(false);
    const [err, setErr] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const onChange = (event) => {
      console.log(data);
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
    
    useEffect(() => {
      console.log(data);
      if (isAuth && data) {
        if (data && data.signInUserSession != null) {
          setForm({['firstName'] : data.attributes['custom:first_name'], ['lastName'] : data.attributes['custom:last_name'], ['email'] : data.attributes['email'], ['currentPassword'] : '', ['newPassword'] :'', ['confirmPassword'] : '' });
          history.push("/dashboard");
        }
      } else {
          history.push("/dashboard");
      }
    }, [data]);

    const rows_init = [
        createData('India', 'IN', 1324171354),
        createData('China', 'CN', 1403500365),
        createData('Italy', 'IT', 60483973),
        createData('United States', 'US', 327167434),
        createData('Canada', 'CA', 37602103),
        createData('Australia', 'AU', 25475400),
      ];

    const [rows, setRows] = useState(rows_init);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        // call api to get the rows and update it.
        const rows_ini = [
            createData('Amit', 'IN', 1324171354),
            createData('China', 'CN', 1403500365),
            createData('Italy', 'IT', 60483973),
            createData('United States', 'US', 327167434),
            createData('Canada', 'CA', 37602103),
            createData('Australia', 'AU', 25475400),
          ];
        setRows(rows_ini);
    };
  
    const load = loading;
    const infoUpdated = ((form.firstName?.length && form.lastName?.length) && (
      (!form.newPassword?.length && !form.currentPassword?.length && !form.confirmPassword?.length) ||
      (form.newPassword?.length && form.currentPassword?.length && form.confirmPassword?.length))) == 0 ? false : true;

    return { form, infoUpdated, onChange, onSubmit, load };
};
import { useState, useContext, useEffect } from "react";
import { AppContext } from "../../context/Provider";
import { useHistory } from "react-router-dom";
import { login } from "../../context/actions/login";

function createData(document, date, download) {
    return { document, date, download };      
}

export default () => {
    const [newPage, setPage] = useState(0);

    const history = useHistory();

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

    return { handleChangePage, rows, newPage };
};
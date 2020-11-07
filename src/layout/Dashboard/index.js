import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Header from '../../components/Header';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import DescriptionIcon from '@material-ui/icons/Description';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

const columns = [
  { id: 'document', label: 'Document', minWidth: 100 },
  { id: 'date', label: 'Date', minWidth: 20 },
  { id: 'download', label: 'Download', minWidth: 10}
];

const useStyles = makeStyles({
  root: {
    width: '50%',
    margin: '0 auto',
  },
  container: {
    maxHeight: 440,
  },
});

const DocumentTable = ({
    tabledata : {handleChangePage, rows, newPage}
 }) => {
  const classes = useStyles();
  const [rowsPerPage, setRowsPerPage] = React.useState(6);
  console.log(rows);
  console.log(newPage);
  return (
    <Grid>
    <div id="container">
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(newPage * rowsPerPage, newPage * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={newPage}
        onChangePage={handleChangePage}
      />
    </Paper>
    </div>
    </Grid>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-prevent-tab-${index}`,
    'aria-controls': `scrollable-prevent-tabpanel-${index}`,
  };
}

const useStyles_ = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const DashboardUI = ({
    data : { handleChangePage, rows, newPage }
}) => {

  const classes = useStyles_();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
        <Header />
        <div></div>
        <AppBar  style={{width:'30%', margin: '0 auto'}} position="static">
            <Tabs
                value={value}
                fullWidth={true}
                onChange={handleChange}
                variant="fullWidth"
                scrollButtons="off"
                aria-label="scrollable prevent tabs example"
                centered
            >
                <Tab icon={<PersonPinIcon />} aria-label="phone" {...a11yProps(0)} />
                <Tab icon={<DescriptionIcon />} aria-label="favorite" {...a11yProps(1)} />
            </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
        </TabPanel>
        <TabPanel value={value} index={1}>
            <DocumentTable tabledata={{handleChangePage, rows, newPage}} />
        </TabPanel>
    </div>
  );
}

export default DashboardUI;
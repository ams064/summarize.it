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
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Button as SemButton } from 'semantic-ui-react';
import Grid from '@material-ui/core/Grid';
import { FormHelperText } from '@material-ui/core';


const __useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
      backgroundColor : theme.palette.primary,
      fontSize: '143px',
    },
    '& .MuiButton-contained.Mui-disabled': {
      backgroundColor: '#cce2ff',
      color : 'white',
    }
  },
}));

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

const UserProfileInfo = ({form, buttonDisable, onChange, onSubmit}) => { 
  const classes = __useStyles();

  return (
    <Grid container alignItems="center" justify="center">
    <form className={classes.root} noValidate autoComplete="off" centered>
      <FormHelperText>This is helper</FormHelperText>
      <div>
        <TextField 
          id="standard-error" 
          label="First Name" 
          name="firstName" 
          value={form.firstName || ''} 
          onChange={onChange}
          error = {form.firstName?.length == 0 ? true : false}
          helperText={form.firstName?.length == 0 ? "Field can not be blank" : "" }/>
        <TextField
          error = {form.lastName?.length == 0 ? true : false}
          id="standard-error"
          label="Last Name"
          value={form.lastName || ''}
          onChange={onChange}
          name="lastName"
          helperText={form.lastName?.length == 0 ? "Field can not be blank" : "" }
        />
      </div>
      <div>
        <TextField error = {false} id="standard-error" name="email" label="Email" value={form.email || ''}  disabled onChange={onChange} />
        <TextField  error = {false} id="standard-error" 
        name="currentPassword" 
        label="Current Password" 
        type="password" 
        onChange={onChange}
        error={(form.newPassword?.length && form.confirmPassword?.length) ? form.currentPassword?.length == 0 ? true : false : false} />
      </div>
      <div>
        <TextField
          error = {(form.currentPassword?.length) ? form.newPassword?.length == 0 ? true : false : false}
          id="standard-error"
          label="New Password"
          type= "password"
          onChange={onChange}
          name="newPassword"
          helperText={(form.currentPassword?.length) ? form.newPassword?.length == 0 ? "Field can not be blank" : "" : ""}
        />
        <TextField 
        error = {(form.newPassword?.length) ? form.confirmPassword?.length == 0 ? true : false : false} 
        id="standard-error" 
        label="Confirm Password" 
        name="confirmPassword" 
        type="password" 
        onChange={onChange} />
      </div>
      <div>
      <Button onClick={onSubmit} disabled={!buttonDisable} color='primary' variant="contained">Update Information</Button>
      </div>
    </form>
    </Grid>
  );
}

const StickyHeadTable = ({rows, handleDocumentDownload, downloading}) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
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
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
              return (
                <TableRow role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {(column.id === 'download' ) || (column.format && typeof value === 'number') ?  
                          column.id === 'download' ? 
                            <SemButton color='primary' variant='contained' loading={downloading[index] === true ? true : false} onClick={() => { handleDocumentDownload(row, index) } }> Download </SemButton>
                            : column.format(value) : value }
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
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
    </div>
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
    backgroundColor: theme.palette.background.paper,
  },
}));

const DashboardUI = ({ 
  data : {form, infoUpdated, onChange, onSubmit, rows, handleDocumentDownload, downloading}
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
        <AppBar position="static">
            <Tabs
                value={value}
                onChange={handleChange}
                aria-label="scrollable prevent tabs example"
                centered
            >
                <Tab label="Profile" icon={<PersonPinIcon />} aria-label="phone" {...a11yProps(0)} />
                <Tab label= "Documents" icon={<DescriptionIcon />} aria-label="favorite" {...a11yProps(1)} />
            </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <UserProfileInfo form={form} buttonDisable = {infoUpdated} onChange={onChange} onSubmit={onSubmit} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <StickyHeadTable rows={rows} handleDocumentDownload={handleDocumentDownload} downloading={downloading} />
        </TabPanel>
    </div>
  );
}

export default DashboardUI;
import React from 'react';
import Header from '../../components/Header';
import { Button, Form, Grid, TextArea, Icon, Modal } from 'semantic-ui-react';
import '../../App.css';
import { Link } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MatButton from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { INPUT_SUMMARIZED } from '../../utils/constants/actiontypes';
import { input } from 'aws-amplify';


const SummarizeUI = ({
    form : {onInputChange, inputText, outputText, inputTextValid, onOutputChange, err, onSummarizeSubmit, onSaveSubmit, summarizeLoad, saveLoad, canSave }
}) => {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    return (
        <div>
            <Header />
            <Grid container columns={2} relaxed stackable centered>
                <Grid.Column>
                    <Form style={{ resize : "none" }}>
                        <TextArea
                        value = {inputText || ""}
                        onChange = {onInputChange}
                        name = "inputText"
                        label = "InputText"
                        style={{ border : 'black solid' }} 
                        placeholder='Copy/Paste the text here' 
                        />
                    </Form>
                </Grid.Column>
                <Grid.Column>
                    <Form>
                        <TextArea 
                        style={{ border : 'black solid' }} 
                        readOnly={true} 
                        placeholder='Output text summary' 
                        name="outputText"
                        label = "OutputText"
                        value = {outputText || ""}
                        onChange = {onOutputChange}
                        />
                    </Form>
                </Grid.Column>
            </Grid>
            <Grid container columns={2} stackable centered >
                <Grid.Column textAlign="right">
                    <Button style={{ width:150 }} onClick = {onSummarizeSubmit} primary loading={summarizeLoad} disabled={inputTextValid}>
                        <Icon name="compress"></Icon>
                        Summarize
                        </Button>
                </Grid.Column>
                <Grid.Column textAlign="left">
                    <Button style={{ width:150 }} primary loading={saveLoad} onClick= {handleClickOpen} disabled={ canSave }>
                        <Icon name="save"></Icon>
                        Save
                    </Button>
                    {localStorage.getItem('isAuth') == 'true' ? 
                        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">Save</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Please Enter a document name to save the summary on the cloud.
                                </DialogContentText>
                                <TextField
                                autoFocus
                                margin="dense"
                                id="document_name"
                                label="Document Name"
                                type="text"
                                fullWidth  
                                />
                            </DialogContent>
                            <DialogActions>
                                <MatButton onClick={handleClose} color="primary">
                                    Cancel
                                </MatButton>
                                <MatButton onClick={handleClose} color="primary">
                                    Proceed
                                </MatButton>
                            </DialogActions>
                            </Dialog>
                    :
                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Save</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please login to save the summary on the cloud.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <MatButton onClick={handleClose} color="primary">
                            Cancel
                        </MatButton>
                        <MatButton component={Link} to={'/login'} color="primary">
                            Login
                        </MatButton>
                    </DialogActions>
                    </Dialog>
                }
                </Grid.Column>
            </Grid>
        </div>
    );
}

export default SummarizeUI;
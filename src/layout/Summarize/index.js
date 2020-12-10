import _ from 'lodash';
import '../../App.css';
import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Button, Form, Grid, TextArea, Icon, Dropdown } from 'semantic-ui-react';
import '../../App.css';
import { Link } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MatButton from '@material-ui/core/Button';
import ChipInput from 'material-ui-chip-input';
import LinearScaleIcon from '@material-ui/icons/LinearScale';
import { Card, Image } from 'semantic-ui-react'
import reader from '../../assets/images/college.png'
import writer from '../../assets/images/writer.png'


const getOptions = (number, prefix = 'Length: ', suffix = '%') =>
  _.times(number, (index) => ({
    key: index,
    text: `${prefix}${(index+1)*10}${suffix}`,
    value: index,
  }))

const Cards = () => {
    return (
    <div style={{width:'50%', textAlign:'center', margin:'0 auto'}}>
    <Card.Group centered raised itemsPerRow={2} stackable>
    <Card>
      <Image src={reader} wrapped ui={false} />
      <Card.Content>
        <Card.Description>
          If you are casual reader, college student, or a professional who wants to save time and increase productivity by summarizing large text into smaller but meaningful text. Summarize.it is for you.  
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
      </Card.Content>
    </Card>

    <Card>
      <Image src={writer} wrapped ui={false} />
      <Card.Content>
        <Card.Description>
            If you are novelist, journalist or a editor who wants to summarize thier creations for presentation or lessons, summarize.it has got you covered.
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
      </Card.Content>
    </Card>
    </Card.Group>
    </div>
  )
}

const SummarizeUI = ({
    form : {onInputChange, inputText, outputText, inputTextValid, onOutputChange, err, 
        onSummarizeSubmit, open, handleClose, handleSaveClickOpen, onSaveSubmit, 
        summarizeLoad, saveLoad, canSave, handleLength, handleContextTags, 
        handleClearOutputText, isMobile, outputRef, handleDocumentOnChange, documentName }
}) => {

    return (
        <div>
            <Header />
            {isMobile === true ? <div>
                <Grid container columns={2} relaxed stackable centered>
                <Grid.Column>
                    <Form style={{ resize : "none" }}>
                        <TextArea
                        style={{ border : 'black solid' }} 
                        value = {inputText || ""}
                        onChange = {onInputChange}
                        name = "inputText"
                        label = "InputText"
                        placeholder='Copy/Paste the text here' 
                        />
                    </Form>
                </Grid.Column>
                <Grid container columns={2} stackable centered >
                <ChipInput
                    fullWidth
                    defaultValue={['News']}
                    onChange={(chips) => handleContextTags(chips)}
                    variant='outlined'
                    placeholder="Enter/Delete tags"
                    allowDuplicates={false}
                />
                <Grid.Column textAlign="center">
                    <Dropdown style={{ textAlign:'center', width:150, backgroundColor:'#2185d0', color:'#f2fafe'}} 
                    className='button icon' 
                    primary 
                    placeholder='Length' 
                    scrolling 
                    options={getOptions(7)} 
                    onChange={handleLength}
                    />
                    <Button style={{ width:140 }} onClick = {onSummarizeSubmit} primary loading={summarizeLoad} disabled={inputTextValid}>
                        <Icon name="compress"></Icon>
                        Summarize
                        </Button>
                </Grid.Column>
                </Grid>
                <Grid.Column>
                    <Form>
                        <div ref={outputRef}>
                        <TextArea 
                        style={{ border : 'black solid' }} 
                        readOnly={true} 
                        placeholder='Output text summary' 
                        name="outputText"
                        label = "OutputText"
                        value = {outputText || ""}
                        onChange = {onOutputChange}
                        />
                        </div>
                    </Form>
                </Grid.Column>
            </Grid>
            <Grid>
                <Grid.Column textAlign="center">
                    <Button style={{ width:145 }} primary loading={saveLoad} onClick= {handleSaveClickOpen} disabled={ canSave }>
                        <Icon name="save"></Icon>
                        Save
                    </Button>
                    <Button style={{ width:145 }} primary onClick= {handleClearOutputText} >
                        <Icon name="save"></Icon>
                        Clear Output
                    </Button>
                    { localStorage.getItem('isAuth') === 'true' ? 
                        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">Save</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Please Enter a document name to save the summary on the cloud.
                                </DialogContentText>
                                <TextArea
                                value={documentName || ""}
                                autoFocus
                                margin="dense"
                                id="document_name"
                                name="documentName"
                                label="Document Name"
                                type="text"
                                fullWidth  
                                onChange={handleDocumentOnChange}
                                />
                            </DialogContent>
                            <DialogActions>
                                <MatButton onClick={handleClose} color="primary">
                                    Cancel
                                </MatButton>
                                <MatButton onClick={onSaveSubmit} color="primary">
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
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <div className="how-it-works">
                <h1> How it works ?</h1>
                <LinearScaleIcon/><LinearScaleIcon/><LinearScaleIcon/>
                <p>&nbsp;</p>
                <p className="text">To help you summarize and analyze your argumentative texts, your articles, your scientific texts, 
                    your history texts as well as your well-structured analyses work of art, 
                    Summarize.it provides you with a "Summary text tool" : an educational tool that 
                    identifies and summarizes the important ideas and facts of your documents.
                    Summarize in 1-Click, go to the main idea or skim through so that you can then 
                    interpret your texts quickly and develop your syntheses.</p>
            </div>
            <div className="who-is-it-for">
                <h1> Who should use Summarize.it ?</h1>
                <LinearScaleIcon/><LinearScaleIcon/><LinearScaleIcon/>
                <p>&nbsp;</p>
                <Cards/>
            </div>
            </div>
            :
            <>
            <Grid container columns={2} relaxed stackable centered>
                <Grid.Column>
                    <Form style={{ resize : "none" }}>
                        <TextArea
                        style={{ border : 'black solid' }} 
                        value = {inputText || ""}
                        onChange = {onInputChange}
                        name = "inputText"
                        label = "InputText"
                        placeholder='Copy/Paste the text here' 
                        />
                    </Form>
                </Grid.Column>
                <Grid.Column>
                    <Form >
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
                <ChipInput
                    fullWidth
                    defaultValue={['News']}
                    onChange={(chips) => handleContextTags(chips)}
                    variant='outlined'
                    placeholder="Enter/Delete tags"
                    allowDuplicates={false}
                />
                <Grid.Column textAlign="center">
                    <Dropdown style={{ textAlign:'center', width:150, backgroundColor:'#2185d0', color:'#f2fafe'}} 
                    className='button icon' 
                    primary 
                    placeholder='Length' 
                    scrolling 
                    options={getOptions(7)} 
                    onChange={handleLength}
                    />
                    <Button style={{ width:150 }} onClick = {onSummarizeSubmit} primary loading={summarizeLoad} disabled={inputTextValid}>
                        <Icon name="compress"></Icon>
                        Summarize
                        </Button>
                </Grid.Column>
                <Grid.Column textAlign="center">
                    <Button style={{ width:150 }} primary loading={saveLoad} onClick= {handleSaveClickOpen} disabled={ canSave }>
                        <Icon name="save"></Icon>
                        Save
                    </Button>
                    <Button style={{ width:150 }} primary loading={saveLoad} onClick= {handleClearOutputText} disabled={ canSave }>
                        <Icon name="save"></Icon>
                        Clear Output
                    </Button>
                    { localStorage.getItem('isAuth') === 'true' ? 
                        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">Save</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Please Enter a document name to save the summary on the cloud.
                                </DialogContentText>
                                <TextArea
                                autoFocus
                                value = {documentName || ""}
                                onChange = {handleDocumentOnChange}
                                name = "documentName"
                                label = "document name"
                                fullWidth
                                />
                            </DialogContent>
                            <DialogActions>
                                <MatButton onClick={handleClose} color="primary">
                                    Cancel
                                </MatButton>
                                <MatButton onClick={onSaveSubmit} color="primary">
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
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <div className="how-it-works">
                <h1> How it works ?</h1>
                <LinearScaleIcon/><LinearScaleIcon/><LinearScaleIcon/>
                <p>&nbsp;</p>
                <p className="text">We use state-of-the-art natural langauage processing technique to evaluate the importance of each sentence. Summaries can be generated for your news article, scientific journal, and many more documents in just 1-click.
                Context and size for the summaries can be provided to tune summaries as per the user's needs. Additionally, all the summaries can be stored on cloud, making them accessible to you anytime and anywhere. </p>
            </div>
            <div className="who-is-it-for">
                <h1> Who should use Summarize.it ?</h1>
                <LinearScaleIcon/><LinearScaleIcon/><LinearScaleIcon/>
                <p>&nbsp;</p>
                <Cards/>
            </div>
            </>
            }
          <Footer/>
        </div>
    );
}

export default SummarizeUI;
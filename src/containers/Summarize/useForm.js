import { useState, useContext, useEffect, useRef } from "react";
import { AppContext } from "../../context/Provider";
import { summarize } from '../../context/actions/summarize';
import { save } from '../../context/actions/save';
import { INPUT_CHANGE } from "../../utils/constants/actiontypes";
import { useMediaQuery } from 'react-responsive';

export default () => {

  const {
    authDispatch,
    authState: {
      auth: { error, currInput, currOutput, data, currSave, currLength, currTags},
    },
  } = useContext(AppContext);

  const [inputText, setInputText] = useState(currInput);
  const [outputText, setOutputText] = useState(currOutput);
  const [documentName, setDocumentName] = useState('');
  const [err, setErrors] = useState('');
  const [summarizeLoad, setSummarizeLoad] = useState(false);
  const [saveLoad, setSaveLoad] = useState(false);
  const [summarized, setSummarized] = useState(true);
  const [deflength, setDefOutputLength] = useState((currLength/10) -1);
  const [length, setOutputLength] = useState(currLength);
  const [tags, setContextTags] = useState(currTags);
  const [canSave, setCanSave] = useState(currSave);
  const outputRef = useRef(null);
  const [open, setOpen] = useState(false);

  // Check wether the current viewing screen is a mobile or desktop
  const isMobile = useMediaQuery({
    query: '(max-width: 770px)'
  })

  const onInputChange = (e, { name, value }) => {
    setErrors('');
    setInputText(value);
    setSummarized(true);
    setCanSave(false);
    authDispatch({
      type: INPUT_CHANGE,
      payload : {
        inputText : null,
        outputText : null
      }
    });
  };

  const handleDocumentOnChange = (e, {name, value}) => {
    setDocumentName(value);
  };

  const handleLength = (event, {value}) => {
    setOutputLength((value + 1)*10);
  }

  function handleContextTags(chips) {
    setContextTags(chips);
  }

  const handleClearOutputText = () => {
    setOutputText('');
    setSummarized(true);
    setCanSave(false);
  }

  useEffect(() => {
    if (error != null) {
        setErrors(error);
      }
  }, [error]);

  // Empty text is invalid, if ther is text enabled the summariz button
  const inputTextValid = !inputText?.length

  // Call summarize API
  const onSummarizeSubmit = () => {
    setErrors('');
    setSummarizeLoad(true);
    summarize(inputText, length, tags)(setOutputText)(setSummarizeLoad)(setSummarized)(setCanSave)(authDispatch);
    // FOr mobile scorll down to output text window
    if(isMobile === true && outputRef.current !== null) {
      outputRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const onSaveSubmit = () => {
    setOpen(false);
    setSaveLoad(true);
    save(inputText, outputText, documentName, data)(setSaveLoad)(setCanSave)(authDispatch);
  }

  // Handels save dialog open/close
  const handleSaveClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }
  
  return { inputText, onInputChange, outputText, summarizeLoad, err, 
    inputTextValid, handleSaveClickOpen, onSummarizeSubmit, onSaveSubmit, 
    saveLoad, canSave, handleLength, handleContextTags, handleClearOutputText, 
    isMobile, outputRef, open, handleDocumentOnChange, documentName, handleClose, tags, deflength};
};
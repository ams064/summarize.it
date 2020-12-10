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
      auth: { error, currInput, currOutput, data},
    },
  } = useContext(AppContext);

  const [inputText, setInputText] = useState(currInput);
  const [outputText, setOutputText] = useState(currOutput);
  const [documentName, setDocumentName] = useState('');
  const [err, setErrors] = useState('');
  const [summarizeLoad, setSummarizeLoad] = useState(false);
  const [saveLoad, setSaveLoad] = useState(false);
  const [summarized, setSummarized] = useState(true);
  const [length, setOutputLength] = useState(50);
  const [tags, setContextTags] = useState(['News']);
  const outputRef = useRef(null);
  const [open, setOpen] = useState(false);

  const isMobile = useMediaQuery({
    query: '(max-width: 770px)'
  })

  const onInputChange = (e, { name, value }) => {
    setErrors('');
    setInputText(value);
    setSummarized(true);
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
  }

  useEffect(() => {
    if (error != null) {
        setErrors(error);
      }
  }, [error]);

  const inputTextValid = !inputText?.length

  const onSummarizeSubmit = () => {
    setErrors('');
    setSummarizeLoad(true);
    summarize(inputText, length, tags)(setOutputText)(setSummarizeLoad)(setSummarized)(authDispatch);
    if(isMobile === true && outputRef.current !== null) {
      outputRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const onSaveSubmit = () => {
    setOpen(false);
    setSaveLoad(true);
    save(inputText, outputText, documentName, data)(setSaveLoad)(authDispatch);
  }

  const handleSaveClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }

  const canSave = summarized;
  
  return { inputText, onInputChange, outputText, summarizeLoad, err, 
    inputTextValid, handleSaveClickOpen, onSummarizeSubmit, onSaveSubmit, 
    saveLoad, canSave, handleLength, handleContextTags, handleClearOutputText, 
    isMobile, outputRef, open, handleDocumentOnChange, documentName, handleClose};
};
import { useState, useContext, useEffect } from "react";
import { AppContext } from "../../context/Provider";
import { useHistory } from "react-router-dom";
import { summarize } from '../../context/actions/summarize';
import { save } from '../../context/actions/save';
import { INPUT_CHANGE } from "../../utils/constants/actiontypes";

export default () => {

  const {
    authDispatch,
    authState: {
      auth: { error, currInput, currOutput },
    },
  } = useContext(AppContext);

  const [inputText, setInputText] = useState(currInput);
  const [outputText, setOutputText] = useState(currOutput);
  const [err, setErrors] = useState('');
  const [summarizeLoad, setSummarizeLoad] = useState(false);
  const [saveLoad, setSaveLoad] = useState(false);
  const [summarized, setSummarized] = useState(true);

  const history = useHistory();


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

  useEffect(() => {
    if (error != null) {
        setErrors(error);
      }
  }, [error]);

  const inputTextValid = !inputText?.length

  const onSummarizeSubmit = () => {
    setErrors('');
    setSummarizeLoad(true);
    summarize(inputText)(setOutputText)(setSummarizeLoad)(setSummarized)(authDispatch);
  };

  const onSaveSubmit = () => {
    setSaveLoad(true);
    save(inputText, outputText)(setSaveLoad);
  }

  const canSave = summarized;
  

  return { inputText, onInputChange, outputText, summarizeLoad, err, inputTextValid, onSummarizeSubmit, onSaveSubmit, saveLoad, canSave };
};
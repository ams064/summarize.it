import { useFormControl } from '@material-ui/core';
import React from 'react';
import SummarizeUI from '../../layout/Summarize';
import useForm from './useForm';

const SummarizeContainer = () => {
    return <SummarizeUI form={useForm()} />
};

export default SummarizeContainer;
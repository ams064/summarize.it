import { useFormControl } from '@material-ui/core';
import React from 'react';
import DashboardUI from '../../layout/Dashboard';
import useForm from '../Dashboard/useForm';

const DashboardContainer = () => {
    return <DashboardUI data = { useForm() } />
};

export default DashboardContainer;
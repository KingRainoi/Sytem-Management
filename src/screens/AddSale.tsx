import React,  { useState,Fragment }  from 'react';
import {Sale} from '../resources/info/FirebaseSale.ts';
import useForm from '../hooks/useForm.ts';
import { Alert, Button, TextField } from '@mui/material';
import {db} from '../firebase.ts';
import {addSale} from '../resources/info/FirebaseSale.ts';
import ListBox from '../components/ListBox.tsx';
import { saleInitialState,SaleContextData,SaleContext } from '../hooks/saleContext.ts';

function AddSale() {

    const [data, handleChange] = useForm(saleInitialState);
    const [error,setError] = useState('');
    const [success,setSuccess] = useState('');
    const {items,date,total} = data;

    const save = async () => {
        const result = await addSale(formSale);    
        result ? setSuccess("Sale registered") : setError("Error registering new sale");
    }

    const handleSave = () => {
        if (formSale.items.length >0) {
            save();
        } else {
            setError("You must select at least one item");
            return;
        }
    };

    const contextData : SaleContextData = {
        data,
        handleChange
    }

    return (
         <div>
            <SaleContext.Provider value={contextData}>
                <h1>Add Sale</h1>
                { success && <Alert severity="success">{success}</Alert>}
                { error && <Alert severity="error">{error}</Alert>}
                
                <Button variant="outlined" onClick={handleSave} >save</Button>
            </SaleContext.Provider>
        </div>
    );

}

export default AddSale;
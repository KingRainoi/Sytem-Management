import React,  { useState,Fragment }  from 'react';
import {Sale} from '../resources/info/FirebaseSale.ts';
import { useDropdown } from '../hooks/useDropdown.ts';
import { Alert, Button, TextField } from '@mui/material';
import {db} from '../firebase.ts';
import {addSale} from '../resources/info/FirebaseSale.ts';
import ListBox from '../components/ListBox.tsx';
import { saleInitialState,SaleContextData,SaleContext } from '../hooks/saleContext.ts';

function AddSale() {

    const [data, handleChange] = useDropdown(saleInitialState);
    const [error,setError] = useState('');
    const [success,setSuccess] = useState('');
    const {items,date,total} = data;

    const save = async () => {
        const result = await addSale(data);    
        result ? setSuccess("Sale registered") : setError("Error registering new sale");
    }

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
                <ListBox />
                <Button variant="outlined" onClick={save} >save</Button>
            </SaleContext.Provider>
        </div>
    );

}

export default AddSale;
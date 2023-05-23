import React,  { useEffect, useState }  from 'react';
import {collection, addDoc, Timestamp} from 'firebase/firestore';
import {db} from '../firebase.ts';
import { useParams } from "react-router-dom";
import useForm from '../hooks/useForm.ts';
import { Alert, Button, TextField } from '@mui/material';
import { Service,addService } from '../resources/info/FirebaseServices.ts';


const emptyService:Service  = {
    name: '',
    sale_price: 0,
    purchase_price: 0
}

function AddService() {

    const service = emptyService;
    const [formService, handleChange] = useForm(service);
    const [ error, setError ] = useState('');
    const [ success, setSuccess ] = useState('');

    const { name, sale_price, purchase_price } = formService; 

    const save = async () => {
        const result = await addService(formService);    
        result ? setSuccess("Service added") : setError("Error adding new service");
    }

    const handleSave = () => {
        //formProduct data must be all different from emptyProduct
        if (formService.name === '') {
            setError("Name is required");
            return;
        }
        if (formService.sale_price === 0) {
            setError("Sale price is required");
            return;
        }
        if (formService.purchase_price === 0) {
            setError("Purchase price is required");
            return;
        }
        
        if (formService.sale_price < formService.purchase_price) {
            save();
            return;
        } else {
            setError("Sale price must be less than purchase price");
            return;
        }
    };

    return (
        <div>
            <h1>Create new service</h1>
            { success && <Alert severity="success">{success}</Alert>}
            { error && <Alert severity="error">{error}</Alert>}
            <TextField type="text" name="name" value={name} onChange={handleChange} fullWidth={true} label="Name" variant="outlined" />
            <br/><br/>
            <TextField type="number" name="sale_price" value={sale_price} onChange={handleChange} fullWidth={true} label="Sale Price" variant="outlined" />
            <br/><br/>
            <TextField type="number" name="purchase_price" value={purchase_price} onChange={handleChange} fullWidth={true} label="Purchase Price" variant="outlined" />
            <br/><br/>
            <Button variant="outlined" onClick={handleSave} >save</Button>
        </div>
    )
};

export default AddService;
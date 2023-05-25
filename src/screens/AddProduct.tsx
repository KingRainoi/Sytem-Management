import React,  { useEffect, useState }  from 'react';
import {collection, addDoc, Timestamp} from 'firebase/firestore';
import {db} from '../firebase.ts';
import { useParams } from "react-router-dom";
import useForm from '../hooks/useForm.ts';
import { Alert, Button, TextField } from '@mui/material';
import { addProduct,Product } from '../resources/info/FirebaseProducts.ts';

const emptyProduct: Product = {
    name: '',
    sale_price: 0,
    purchase_price: 0,
    stock: 0,
}

function AddProduct() {

    const product = emptyProduct;
    const [formProduct, handleChange] = useForm(product);
    const [ error, setError ] = useState('');
    const [ success, setSuccess ] = useState('');

    const { name, sale_price, purchase_price, stock } = formProduct; 

    const save = async () => {
        const result = await addProduct(formProduct);    
        result ? setSuccess("Product added") : setError("Error adding product");
    }

    const handleSave = () => {
        //formProduct data must be all different from emptyProduct
        if (formProduct.name === '') {
            setError("Name is required");
            return;
        }
        if (formProduct.sale_price === 0) {
            setError("Sale price is required");
            return;
        }
        if (formProduct.purchase_price === 0) {
            setError("Purchase price is required");
            return;
        }
        if (formProduct.stock === 0) {
            setError("Stock is required");
            return;
        }
        
        if (formProduct.sale_price > formProduct.purchase_price) {
            save();
        } else {
            setError("Sale price must be less than purchase price");
            return;
        }
    };

    return (
        <div>
            <h1>Create Product</h1>
            { success && <Alert severity="success">{success}</Alert>}
            { error && <Alert severity="error">{error}</Alert>}
            <TextField type="text" name="name" value={name} onChange={handleChange} fullWidth={true} label="Name" variant="outlined" />
            <br/><br/>
            <TextField type="number" name="sale_price" value={sale_price} onChange={handleChange} fullWidth={true} label="Sale Price" variant="outlined" />
            <br/><br/>
            <TextField type="number" name="purchase_price" value={purchase_price} onChange={handleChange} fullWidth={true} label="Purchase Price" variant="outlined" />
            <br/><br/>
            <TextField type="number" name="stock" value={stock} onChange={handleChange} fullWidth={true} label="Stock" variant="outlined" />
            <br/><br/>
            <Button variant="outlined" onClick={handleSave} >save</Button>
        </div>
    )
};

export default AddProduct;

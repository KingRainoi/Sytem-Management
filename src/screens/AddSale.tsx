import React,  { useState,Fragment, useEffect }  from 'react';
import {Sale} from '../resources/info/FirebaseSale.ts';
import useDropdown from '../hooks/useDropdown.ts';
import { Alert, Button, TextField } from '@mui/material';
import {db} from '../firebase.ts';
import {addSale} from '../resources/info/FirebaseSale.ts';
import ListBox from '../components/ListBox.tsx';
import { saleInitialState,SaleContextData,SaleContext } from '../hooks/saleContext.ts';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { getProducts,getProductById } from '../resources/info/FirebaseProducts.ts';
import ItemsList from '../components/ItemsList.tsx';

function AddSale() {

    const [products, setProducts] = useState<QueryDocumentSnapshot<DocumentData>[] | []>([]);
    const [selectedProducts,setSelectedProducts] = useState<QueryDocumentSnapshot<DocumentData>[] | []>([]);

    const getProductsData = async () => {
        const fbProducts = await getProducts();
        setProducts(fbProducts.docs); 
    }

    useEffect(() => {
      getProductsData();
    },[]);

    const [data, handleChange] = useDropdown(saleInitialState, products);
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
                <ListBox type={"product"} />
                <ItemsList/>
                <p>Total a pagar: ${total}</p>
                <Button variant="outlined" onClick={save} >save</Button>
            </SaleContext.Provider>
        </div>
    );
}

export default AddSale;
import React,  { useState,Fragment, useEffect }  from 'react';
import {Sale, getItemFromFirebase, itemsModel} from '../resources/info/FirebaseSale.ts';
import useDropdown from '../hooks/useDropdown.ts';
import { Alert, Button, TextField } from '@mui/material';
import {db} from '../firebase.ts';
import {addSale} from '../resources/info/FirebaseSale.ts';
import ListBox from '../components/ListBox.tsx';
import { saleInitialState,SaleContextData,SaleContext } from '../hooks/saleContext.ts';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { getProducts, Product } from '../resources/info/FirebaseProducts.ts';
import ItemsList from '../components/ItemsList.tsx';
import { getServices } from '../resources/info/FirebaseServices.ts';

function AddSale() {

    const [products, setProducts] = useState<QueryDocumentSnapshot<DocumentData>[] | []>([]);
    
    const handleProductSelect = (
    product: QueryDocumentSnapshot<DocumentData>,
    setState: (state: any) => void
    ) => {
        console.log("product selected");
        console.log(product);
        const { name, purchase_price } = product.data();
        const newItem: itemsModel = {
        id: product.id,
        name,
        sale_price: purchase_price,
        quantity: 1,
        total: parseFloat(purchase_price), // Asegura que el valor sea un número
        };

        setState(prevData => ({
            ...prevData,
            items: [...prevData.items, newItem]
        }));
    }

    const getProductsData = async () => {
        const fbProducts = await getProducts();
        const fbServices = await getServices();
        setProducts([...fbProducts.docs, ...fbServices.docs]);
    }

    useEffect(() => {
      getProductsData();
    },[]);

    const [data, handleChange, total] = useDropdown(saleInitialState, products, handleProductSelect);

    const [error,setError] = useState('');
    const [success,setSuccess] = useState('');

    const {items,date} = data;

    const save = async () => {
        // Verificar stock
        let stockAvailable = true;
        for (const item of data.items) {
            const itemDoc = await getItemFromFirebase(item.id); // Reemplaza 'getItemFromFirebase' con tu método para obtener el documento del elemento desde Firebase
            const stock = itemDoc.data()?.stock;
            if (stock < item.quantity) {
            stockAvailable = false;
            break;
            }
        }

        // Guardar registro de venta
        if (stockAvailable) {
            const saleData: Sale = {
            items: data.items,
            date: new Date(),
            total: data.total,
            };
            const result = await addSale(saleData);    
            result ? setSuccess("Sale registered") : setError("Error registering new sale");
        } else {
            setError("Insufficient stock for one or more items");
        }
    };


    const contextData : SaleContextData = {
        data,
        handleChange
    }
    console.log("Soy items");
    console.log(items);
    return (
        <div>
            <SaleContext.Provider value={contextData}>
                <h1>Add Sale</h1>
                { success && <Alert severity="success">{success}</Alert>}
                { error && <Alert severity="error">{error}</Alert>}
                <ListBox/>
                <ItemsList/>
                <p>Total a pagar: ${total}</p>
                <Button variant="outlined" onClick={save} >save</Button>
            </SaleContext.Provider>
        </div>
    );
}

export default AddSale;
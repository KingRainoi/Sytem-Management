import React, { useEffect, useState } from 'react';
import { DocumentData, doc, getDoc, updateDoc } from 'firebase/firestore';
import {db} from '../firebase.ts';
import { Product } from '../resources/info/FirebaseProducts.ts';
import { NavLink, useParams } from 'react-router-dom';
import useForm from '../hooks/useForm.ts';
import { Button, TextField } from '@mui/material';

const getProductById = async (id) => {
  const product_ = await getDoc(doc(db, 'products', id));
  if (product_.exists()) {
    return product_.data();
  }
  return null;
}

const updateProduct = async (productId, data) => {
  const productRef = doc(db, 'products', productId);
  await updateDoc(productRef, data);
}

const modifiedProduct:Product = {
  name: "",
  purchase_price: 0,
  sale_price: 0,
  stock: 0
};

function EditProduct() {

    const { id } = useParams();
    const [product, setProduct] = useState<DocumentData | null>(null);
    const [formProduct, handleChange] = useForm(modifiedProduct);

    useEffect(() => {
    const fetchProduct = async () => {
      const product_ = await getProductById(id);
      setProduct(product_);
    }
    fetchProduct();
  }, []);

  if(product===null){
    return(
        <div className="container">
          <h1>Product not found </h1>
        </div>
    )
  }

  const {name, purchase_price, sale_price, stock} = product;

  return (
     <div className="userDetails">
      <h1 className='userDetails_title'>User Details</h1>
      <div className='userDetails_container'>
        <div className='userDetails_container_name'>
          <h5>Username: {name}</h5>
          <TextField type='text' name='name' value={formProduct.name} onChange={handleChange} color='primary' variant="filled"  label="Change username"  focused />
        </div>
        <div className='userDetails_container_purchase_price'>
          <h5>Purchase price: {purchase_price}</h5>
          <TextField name='purchase_price' onChange={handleChange} value={formProduct.purchase_price} color='primary' variant="filled" label="Change purchase price" focused />
         
        </div>
        <div className='userDetails_container_sale_price'>
          <h5>Sale price: {sale_price}</h5>
          <TextField name='sale_price' onChange={handleChange} value={formProduct.sale_price} color='primary' label="Change sale price" variant="filled" focused />
        </div>
        <div className='userDetails_container_stock'>
            <h5>Stock: {stock}</h5>
            <TextField name='stock' onChange={handleChange} value={formProduct.stock} color='primary' variant="filled" label="Change stock quantity" focused />
        </div>
        <div className='userDetails_container_buttons'>
        
        <Button variant="contained" onClick={() => updateProduct(id, formProduct)}>Guardar</Button>
 
        <NavLink className='cancel_button' to={'/products'} >Cancelar</NavLink>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
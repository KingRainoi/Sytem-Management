import React, { useContext, useEffect, useState } from 'react';
import { saleInitialState,SaleContextData,SaleContext } from '../hooks/saleContext.ts';
import {Sale} from '../resources/info/FirebaseSale.ts';
import { getProducts } from '../resources/info/FirebaseProducts.ts';
import { getServices } from '../resources/info/FirebaseServices.ts';
import { DocumentData, QueryDocumentSnapshot, QuerySnapshot, deleteDoc, doc } from "firebase/firestore";
import { ListItem, ListItemButton, ListItemText } from '@mui/material';

function ListBox({type:int}) {
    
    const {data: {items}, handleChange} = useContext<SaleContextData>(SaleContext);
    const [products, setProducts] = useState<QueryDocumentSnapshot<DocumentData>[] | []>([]);

    const getProductsData = async () => {
        const fbProducts = await getProducts();
        setProducts(fbProducts.docs); 
    }

    useEffect(() => {
      getProductsData();
    },[]);
    console.log(items);
    
    return (
        <div>
            <select className='items' value={items} onChange={handleChange}>
                <option value="">Selecciona algúna opción</option>
                {
                    products.map((product:QueryDocumentSnapshot<DocumentData>)=> {
                        const { name, purchase_price, stock } = product.data();
                        const { id } = product;

                        return(
                            <option value={id}>{name} </option>
                        )
                    })
                }
            </select>
        </div>
    );
}

export default ListBox;
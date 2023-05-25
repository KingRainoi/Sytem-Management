import React, { useContext, useEffect, useState } from 'react';
import { saleInitialState,SaleContextData,SaleContext } from '../hooks/saleContext.ts';
import {Sale} from '../resources/info/FirebaseSale.ts';
import { Product, getProducts } from '../resources/info/FirebaseProducts.ts';
import { getServices } from '../resources/info/FirebaseServices.ts';
import { DocumentData, QueryDocumentSnapshot, QuerySnapshot, deleteDoc, doc } from "firebase/firestore";
import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import { itemsModel } from '../resources/info/FirebaseSale.ts';

function ListBox() {
    
    const {data: {items}, handleChange} = useContext<SaleContextData>(SaleContext);
    
        const [selectedItems, setSelectedItems] = useState<QueryDocumentSnapshot<DocumentData>[] | []>([]);
        const [services,setServices] = useState<QueryDocumentSnapshot<DocumentData>[] | []>([]);

        const getProductsData = async () => {
            const fbProducts = await getProducts();
            setSelectedItems(fbProducts.docs); 
        }

        const getServicesData = async () => {
            const fbServices = await getServices();
            setServices(fbServices.docs); 
        }

        useEffect(() => {
            getProductsData();
            getServicesData();
        }, []);

    const [selectedProductItem, setSelectedProductItem] = useState<string | undefined>();
    const [selectedServiceItem, setSelectedServiceItem] = useState<string | undefined>();
    
    return (
        <div>
            <select className='items' value={selectedProductItem} onChange={handleChange}>
                <option key={0} value={undefined}>Selecciona algúna opción</option>
                {
                    selectedItems.map((product:QueryDocumentSnapshot<DocumentData>,index)=> {
                        const { name, sale_price, stock } = product.data();
                        const { id } = product;

                        return(
                            <option key={index+1} value={id}>{name} </option>
                        )
                    })
                }
            </select>
            
            <select className='items' value={selectedServiceItem} onChange={handleChange}>
                <option key={0} value={undefined}>Selecciona algóna opción</option>
                {
                    services.map((service:QueryDocumentSnapshot<DocumentData>,index)=> {
                        const { name, sale_price, stock } = service.data();
                        const { id } = service;

                        return(
                            <option key={index+1} value={id}>{name} </option>
                        )
                    })
                }
            </select>
        </div>
    );
}

export default ListBox;
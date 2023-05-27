import React, { useContext, useEffect, useState } from 'react';
import { saleInitialState,SaleContextData,SaleContext } from '../hooks/saleContext.ts';
import {Sale} from '../resources/info/FirebaseSale.ts';
import { Product, getProducts } from '../resources/info/FirebaseProducts.ts';
import { getServices } from '../resources/info/FirebaseServices.ts';
import { DocumentData, QueryDocumentSnapshot, QuerySnapshot, deleteDoc, doc } from "firebase/firestore";
import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import { itemsModel } from '../resources/info/FirebaseSale.ts';

const ListBox = () => {
  const { data: { items }, handleChange } = useContext<SaleContextData>(SaleContext);
  const [selectedItems, setSelectedItems] = useState<QueryDocumentSnapshot<DocumentData>[] | []>([]);
  const [services, setServices] = useState<QueryDocumentSnapshot<DocumentData>[] | []>([]);

  const getProductsData = async () => {
    const fbProducts = await getProducts();
    setSelectedItems(fbProducts.docs);
  };

  const getServicesData = async () => {
    const fbServices = await getServices();
    setServices(fbServices.docs);
  };

  useEffect(() => {
    getProductsData();
    getServicesData();
  }, []);

  const [selectedItemsData, setSelectedItemsData] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);

  const handleProductSelect = (product: QueryDocumentSnapshot<DocumentData>) => {
    setSelectedItemsData((prevData) => [...prevData, product]);
  };

  const handleServiceSelect = (service: QueryDocumentSnapshot<DocumentData>) => {
    setSelectedItemsData((prevData) => [...prevData, service]);
  };


  return (
    <div>
      <select className='items' value={undefined} onChange={(e) => handleChange(e, undefined)}>
        <option key={0} value={undefined}>Selecciona alguna opción</option>
        {selectedItems.map((product: QueryDocumentSnapshot<DocumentData>, index) => {
          const { name, sale_price, stock } = product.data();
          const { id } = product;

          return (
            <option key={index + 1} value={id} onClick={() => handleProductSelect(product)}>
              {name}
            </option>
          );
        })}
      </select>

      <select className='items' value={undefined} onChange={(e) => handleChange(e, undefined)}>
        <option key={0} value={undefined}>Selecciona alguna opción</option>
        {services.map((service: QueryDocumentSnapshot<DocumentData>, index) => {
          const { name, sale_price, stock } = service.data();
          const { id } = service;

          return (
            <option key={index + 1} value={id} onClick={() => handleServiceSelect(service)}>
              {name}
            </option>
          );
        })}
      </select>

    </div>
  );
};


export default ListBox;
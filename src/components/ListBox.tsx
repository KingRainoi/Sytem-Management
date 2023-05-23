import { Listbox } from '@headlessui/react';
import React, { useContext, useEffect, useState } from 'react';
import { saleInitialState,SaleContextData,SaleContext } from '../hooks/saleContext.ts';
import {Sale} from '../resources/info/FirebaseSale.ts';
import { getProducts } from '../resources/info/FirebaseProducts.ts';
import { getServices } from '../resources/info/FirebaseServices.ts';
import { DocumentData, QueryDocumentSnapshot, QuerySnapshot, deleteDoc, doc } from "firebase/firestore";

function ListBox() {
    
    const {data: {items}, handleChange} = useContext<SaleContextData>(SaleContext);
    const [products, setProducts] = useState<QueryDocumentSnapshot<DocumentData>[] | []>([]);

   const getProductsData = async () => {
        const fbProducts = await getProducts();
        setProducts(fbProducts.docs); 
    }

    useEffect(() => {
      getProductsData();
    },[]);
    
    return (
       <Listbox>
           <Listbox.Button>{products.name}</Listbox.Button>
           <Listbox.Options onChange={handleChange}>
               {products.map((product) => (
               <Listbox.Option key={product.id} value={product}>
                   {product.name}
               </Listbox.Option>
               ))}
           </Listbox.Options>
       </Listbox>
    );
}

export default ListBox;
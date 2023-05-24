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
        <div>
            <select onChange={undefined}>
                <option value="">Selecciona algúna opción</option>
                {
                    products.map((product:QueryDocumentSnapshot<DocumentData>,index)=> {
                        const { name, purchase_price, stock } = product.data();
                        const { id } = product;

                        return(
                            <option key={index} value={id}>{name} </option>
                        )
                    })
                }
            </select>
        </div>
    );
}

export default ListBox;
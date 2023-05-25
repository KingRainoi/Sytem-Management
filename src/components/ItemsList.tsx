import React, { useContext, useEffect, useState } from "react";
import { SaleContext, SaleContextData } from "../hooks/saleContext.ts";
import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { getProductById,Product } from "../resources/info/FirebaseProducts.ts";

function ItemsList() {
    
    const {data: {items}, handleChange} = useContext<SaleContextData>(SaleContext);
    const [products,setProducts] = useState<QueryDocumentSnapshot<DocumentData>[] | []>([]);

    useEffect(() => {
    const fetchProducts = async () => {
      const productsData: Product[] = [];

      for (const productSnapshot of products) {
        const product = productSnapshot.data() as Product;
        if (product) {
          productsData.push(product);
        }
      }

      setProducts(products);
    };

    fetchProducts();
  }, [products]);

  useEffect(() => {
    const getProductSnapshots = async () => {
      const productSnapshots: QueryDocumentSnapshot<DocumentData>[] = [];

      for (const itemId of items) {
        const productSnapshot = await getProductById(itemId);
        if (productSnapshot) {
          productSnapshots.push(productSnapshot);
        }
      }

      setProducts(productSnapshots);
    };

    getProductSnapshots();
  }, [items]);

  console.log(products);

    return(
        <div>
            <ListItem component="div" disablePadding>
                <ListItemButton>
                    {
                    items.map((item)=> {

                        return(
                            <ListItemText primary={`${item}`} />
                        )
                    })
                    }
                </ListItemButton>
            </ListItem>
        </div>
    );
}

export default ItemsList;
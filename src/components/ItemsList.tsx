import React, { useContext, useEffect, useState } from "react";
import { SaleContext, SaleContextData } from "../hooks/saleContext.ts";
import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { Product } from "../resources/info/FirebaseProducts.ts";

function ItemsList() {
    
  const {data: {items}, handleChange} = useContext<SaleContextData>(SaleContext);
  
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
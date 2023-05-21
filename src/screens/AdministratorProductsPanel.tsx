import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar.tsx';
import Button from '@mui/material/Button';
import { Container, Divider, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { DocumentData, QueryDocumentSnapshot, QuerySnapshot, deleteDoc, doc } from "firebase/firestore";
import {db} from '../firebase.ts';
import { getProducts } from '../resources/info/FirebaseProducts.ts';
import { Tab } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';


const deleteProduct = async (productId) => {
  const productRef = doc(db, 'products', productId);
  confirmAlert({
    title: 'Confirmar eliminación',
    message: '¿Estás seguro de que quieres eliminar este producto?',
    buttons: [
      {
        label: 'Sí',
        onClick: () => deleteDoc(productRef)
      },
      {
        label: 'No',
        onClick: () => {}
      }
    ]
  });
}

function AdministratorProductsPanel() {

  const [products, setProducts] = useState<QueryDocumentSnapshot<DocumentData>[] | []>([]);

   const getProductsData = async () => {
    const fbProducts = await getProducts();
    setProducts(fbProducts.docs); 
    }

    useEffect(() => {
      getProductsData();
    },[]);

    return (
      <Container>
        <NavBar />
        <Grid container spacing={2} marginTop={3}>
          <Grid container>
            <Grid item md={2} sm={1} xs={0}></Grid>
            <Grid item md={8} sm={10} xs={12}>
              <Typography variant="h4" color={"lightblue"}>
                Users list
              </Typography>
              <NavLink 
                to={`/products/add`} 
                className="btn btn-info mx-2"
              >Add product</NavLink>
              <Divider color="black" />
            </Grid>
          </Grid>
          <Grid container marginTop={2}>
            <Grid item md={1} sm={5} xs={2}></Grid>
            <Grid item md={9} sm={10} xs={12}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell align="right">Name</TableCell>
                      <TableCell align="right">Sale price</TableCell>
                      <TableCell align="right" >Purchase price</TableCell>
                      <TableCell align="right">Stock</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      products.map((product: QueryDocumentSnapshot<DocumentData>) => {

                        const { name, sale_price, purchase_price, stock } = product.data();
                        const { id } = product;
                        return (
                          <TableRow
                            key={id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                          <TableCell>{id}</TableCell>
                          <TableCell align="right"> {name}</TableCell>
                          <TableCell align="right">{sale_price}</TableCell>
                          <TableCell align="right">{purchase_price}</TableCell>
                          <TableCell align="right">{stock}</TableCell>
                          <TableCell >
                            <NavLink 
                              to={`/UsersDetailsScreen/${id}`} 
                              className="btn btn-info mx-2"
                            >Edit</NavLink>
                          </TableCell>
                          <TableCell>
                            <Button color="error" variant="contained" onClick={() => deleteProduct(id)}>Delete</Button>
                          </TableCell>
                        </TableRow>);
                      })
                    }
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    )
};

export default AdministratorProductsPanel;
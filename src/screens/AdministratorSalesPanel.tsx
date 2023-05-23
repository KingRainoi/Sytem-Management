import NavBar from '../components/NavBar.tsx';
import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import { Container, Divider, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { DocumentData, QueryDocumentSnapshot, QuerySnapshot, deleteDoc, doc } from "firebase/firestore";
import {db} from '../firebase.ts';
import { getSales } from '../resources/info/FirebaseSale.ts';
import { confirmAlert } from 'react-confirm-alert';

const deleteSale = async (id: string) => {
  const saleRef = doc(db, "sales", id);
  confirmAlert({
    title: 'Confirmar eliminación',
    message: '¿Estás seguro de que quieres eliminar esta venta?',
    buttons: [
      {
        label: 'Sí',
        onClick: () => deleteDoc(saleRef)
      },
      {
        label: 'No',
        onClick: () => {}
      }
    ]
  });
}

function AdministratorSalesPanel() {

  const [sales,setSales] = useState<QueryDocumentSnapshot<DocumentData>[] | []>([]);
  
  const getSalesData = async () => {
    const fbSales = await getSales();
    setSales(fbSales);
  }

  useEffect(() => {
    getSalesData();
  },[])

    return (
      <Container>
        <NavBar />
        <Grid container spacing={2} marginTop={3}>
          <Grid container>
            <Grid item md={2} sm={1} xs={0}></Grid>
            <Grid item md={8} sm={10} xs={12}>
              <Typography variant="h4" color={"lightblue"}>
                Sales list
              </Typography>
              <NavLink 
                to={`/sales/add`} 
                className="btn btn-info mx-2"
              >Register sale</NavLink>
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
                      <TableCell align="right">Servicio o Producto</TableCell>
                      <TableCell align="right">Fecha de venta</TableCell>
                      <TableCell align="right" >Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      sales.map((sale: QueryDocumentSnapshot<DocumentData>) => {

                        const { items, date,total } = sale.data();
                        const { id } = sale;
                        return (
                          <TableRow
                            key={id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                          <TableCell>{id}</TableCell>
                          <TableCell align="right"> {items}</TableCell>
                          <TableCell align="right">{date}</TableCell>
                          <TableCell align="right">{total}</TableCell>
                          <TableCell >
                            <NavLink 
                              to={`/UsersDetailsScreen/${id}`} 
                              className="btn btn-info mx-2"
                            >Edit</NavLink>
                          </TableCell>
                          <TableCell>
                            <Button color="error" variant="contained" onClick={() => deleteSale(id)}>Delete</Button>
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

export default AdministratorSalesPanel;
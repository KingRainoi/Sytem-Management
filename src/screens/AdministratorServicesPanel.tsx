import React, { useEffect, useState } from 'react';
import { Button, Container, Divider, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import NavBar from '../components/NavBar.tsx';
import { NavLink } from 'react-router-dom';
import { DocumentData, QueryDocumentSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { getServices } from '../resources/info/FirebaseServices.ts';
import { confirmAlert } from 'react-confirm-alert';
import { db } from '../firebase.ts';

const deleteService = async (serviceId) => {
  const serviceRef = doc(db, 'services', serviceId);
  confirmAlert({
    title: 'Confirmar eliminación',
    message: '¿Estás seguro de que quieres eliminar este producto?',
    buttons: [
      {
        label: 'Sí',
        onClick: () => deleteDoc(serviceRef)
      },
      {
        label: 'No',
        onClick: () => {}
      }
    ]
  });
}

function AdministratorServicesPanel() {

    const [services, setServices] = useState<QueryDocumentSnapshot<DocumentData>[] | []>([]);

    const getProductsData = async () => {
    const fbServices = await getServices();
        setServices(fbServices.docs); 
    }

    useEffect(() => {
      getProductsData();
    },[]);

  return(
     <Container>
        <NavBar />
        <Grid container spacing={2} marginTop={3}>
          <Grid container>
            <Grid item md={2} sm={1} xs={0}></Grid>
            <Grid item md={8} sm={10} xs={12}>
              <Typography variant="h4" color={"lightblue"}>
                Services list
              </Typography>
              <NavLink 
                to={`/services/add`} 
                className="btn btn-info mx-2"
              >Register new service</NavLink>
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
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      services.map((service: QueryDocumentSnapshot<DocumentData>) => {

                        const { name, sale_price,purchase_price } = service.data();
                        const { id } = service;
                        return (
                          <TableRow
                            key={id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                          <TableCell>{id}</TableCell>
                          <TableCell align="right"> {name}</TableCell>
                          <TableCell align="right">{sale_price}</TableCell>
                          <TableCell align="right">{purchase_price}</TableCell>
                          <TableCell >
                            <NavLink 
                              to={`/UsersDetailsScreen/${id}`} 
                              className="btn btn-info mx-2"
                            >Edit</NavLink>
                          </TableCell>
                          <TableCell>
                            <Button color="error" variant="contained" onClick={() => deleteService(id)}>Delete</Button>
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

export default AdministratorServicesPanel;
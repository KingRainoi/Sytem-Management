import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar.tsx';
import Button from '@mui/material/Button';
import { Container, Divider, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { DocumentData, QueryDocumentSnapshot, QuerySnapshot, deleteDoc, doc } from "firebase/firestore";
import {db} from '../firebase.ts';

function AdministratorProductsPanel() {

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
                to={`/create-user`} 
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
                      <TableCell align="right">Name</TableCell>
                      <TableCell align="right">Email</TableCell>
                      <TableCell align="right" >Password</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                 
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    )
};

export default AdministratorProductsPanel;
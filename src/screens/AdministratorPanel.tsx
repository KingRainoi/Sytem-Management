import NavBar from '../components/NavBar.tsx';
import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import { Container, Divider, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { DocumentData, QueryDocumentSnapshot, QuerySnapshot, deleteDoc, doc } from "firebase/firestore";
import { getUsers } from '../resources/info/FirebaseUsers.ts';
import {db} from '../firebase.ts';

function AdministratorPanel() {

    const [ users, setUsers ] = useState<QueryDocumentSnapshot<DocumentData>[] | []>([]);
  
    const getUsersData = async () => {
    const fbUsers = await getUsers();
        setUsers(fbUsers.docs); 
    }

    useEffect(() => {
        getUsersData();
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
                to={`/create-user`} 
                className="btn btn-info mx-2"
              >Add new user</NavLink>
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
                  <TableBody>
                    {
                      users.map((user: QueryDocumentSnapshot<DocumentData>) => {

                        const { name, email,password } = user.data();
                        const { id } = user;
                        return (
                          <TableRow
                            key={id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                          <TableCell>{id}</TableCell>
                          <TableCell align="right"> {name}</TableCell>
                          <TableCell align="right">{email}</TableCell>
                          <TableCell align="right">{password}</TableCell>
                          <TableCell >
                            <NavLink 
                              to={`/UsersDetailsScreen/${id}`} 
                              className="btn btn-info mx-2"
                            >Edit</NavLink>
                          </TableCell>
                          <TableCell>
                            <Button color="error" variant="contained" onClick={() => deleteUsuario(id)}>Delete</Button>
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

export default AdministratorPanel;
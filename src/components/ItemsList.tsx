import React, { useContext, useEffect, useState } from "react";
import { SaleContext, SaleContextData } from "../hooks/saleContext.ts";
import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { Product } from "../resources/info/FirebaseProducts.ts";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function ItemsList() {
    
  const {data: {items}, handleChange} = useContext<SaleContextData>(SaleContext);

  return(
        <div>
          <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Dessert (100g serving)</StyledTableCell>
            <StyledTableCell align="right">Items</StyledTableCell>
            <StyledTableCell align="right">Stock</StyledTableCell>
            <StyledTableCell align="right">Price(g)</StyledTableCell>
            <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <StyledTableRow key={item.name}>
              <StyledTableCell component="th" scope="row">
                {item.name}
              </StyledTableCell>
              <StyledTableCell align="right">{item.name}</StyledTableCell>
              <StyledTableCell align="right">0</StyledTableCell>
              <StyledTableCell align="right">{item.sale_price}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
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
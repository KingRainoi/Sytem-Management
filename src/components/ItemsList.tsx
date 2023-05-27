import React, { useContext, useEffect, useState } from "react";
import { SaleContext, SaleContextData } from "../hooks/saleContext.ts";
import { ListItem, ListItemButton, ListItemText, TextField } from "@mui/material";
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
                <StyledTableCell>Producto o Servicio</StyledTableCell>
                <StyledTableCell align="right">Quantity</StyledTableCell>
                <StyledTableCell align="right">Price</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <StyledTableRow key={item.id}>
                  <StyledTableCell component="th" scope="row">{item.name}</StyledTableCell>
                  <StyledTableCell align="right">
                    <TextField
                      id="filled-number"
                      label="Number"
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="filled"
                      value={item.quantity}
                      onChange={(e) => {
                        const newQuantity = Number(e.target.value);
                        handleChange(e, item.id);
                        const newTotal = items.reduce((sum, currentItem) => sum + parseFloat(currentItem.total), 0);
                        handleChange({ target: { value: newTotal } }, undefined); // Actualiza el valor total en el estado global
}}


                    />
                  </StyledTableCell>
                  <StyledTableCell align="right">${item.total}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
          </TableContainer>
        </div>
    );
}

export default ItemsList;
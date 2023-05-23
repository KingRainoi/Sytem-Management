import { ChangeEventHandler, createContext } from "react";
import * as path from 'path';
import {Sale} from '../resources/info/FirebaseSale.ts';

export const saleInitialState: Sale = {
  items:[],
  total: 0,
  date: new Date(),
}

export interface SaleContextData {
  handleChange: ChangeEventHandler<HTMLInputElement> | null,
  data: Sale,
}

const contextData: SaleContextData = {
  data: saleInitialState,
  handleChange: null,
}

export const SaleContext = createContext<SaleContextData>(contextData);
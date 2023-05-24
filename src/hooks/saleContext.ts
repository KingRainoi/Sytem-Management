import { ChangeEventHandler, createContext } from "react";
import * as path from 'path';
import {Sale} from '../resources/info/FirebaseSale.ts';

export const saleInitialState: Sale = {
  items:[],
  total: 0,
  date: new Date(),
}

export interface SaleContextData {
  handleChange: ChangeEventHandler<HTMLSelectElement> | undefined
  data: Sale,
}

const contextData: SaleContextData = {
  data: saleInitialState,
  handleChange: undefined,
}

export const SaleContext = createContext<SaleContextData>(contextData);
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase.ts";
import {Product} from './FirebaseProducts.ts';
import {Service} from './FirebaseServices.ts';

const salesCollectionRef = collection(db, "sales");

export interface Sale {
  items: (Product | Service)[];
  date: Date;
  total: number;
}

export const addSale = async (sale: Sale) => {
    try {
        await addDoc(salesCollectionRef, sale);
    }
    catch (error) {
        console.log(error);
        return error;
    }
}

export const getSales = async () => {
    try {
        const salesSnapshot = await getDocs(salesCollectionRef);
        const sales = salesSnapshot.docs.map((doc) => doc.data());
        return sales;
        // return salesSnapshot;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}

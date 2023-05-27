import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase.ts";
import {Product} from './FirebaseProducts.ts';
import {Service} from './FirebaseServices.ts';

const salesCollectionRef = collection(db, "sales");

export interface itemsModel {
    id:string,
    name:string,
    sale_price:number,
    quantity:number,
    total:number,
}

export interface Sale {
  items: itemsModel[];
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

export const getItemFromFirebase = async (itemId) => {
  try {
    const collections = ['products', 'services'];

    for (const collectionName of collections) {
      const collectionRef = collection(db, collectionName);
      const itemDoc = await getDoc(doc(collectionRef, itemId));

      if (itemDoc.exists()) {
        // El elemento fue encontrado en esta tabla, puedes retornar el documento
        return itemDoc;
      }
    }

    // El elemento no fue encontrado en ninguna tabla
    return null;
  } catch (error) {
    console.error('Error searching item in Firebase:', error);
    throw error;
  }
};

export const getSales = async () => {
    try {
        const salesSnapshot = await getDocs(salesCollectionRef);
        const sales = salesSnapshot.docs.map((doc) => doc.data());
        return sales;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}

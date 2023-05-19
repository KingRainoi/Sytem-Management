import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase.ts";

const productsCollectionRef = collection(db, "products");

export interface Product {
    name: string;
    sale_price: number;
    purchase_price: number;
    stock: number;
}

export const getProducts = async () => {
    const productsSnapshot = await getDocs(productsCollectionRef);
    //const products = productsSnapshot.docs.map((doc) => doc.data());
    //return products;
    return productsSnapshot;
}

export const addProduct = async (product: any) => {
    try {
        await addDoc(productsCollectionRef, product);
    }
    catch (error) {
        console.log(error);
        return error;
    }
    
}
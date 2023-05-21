import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase.ts";

const servicesCollectionRef = collection(db, "services");

export interface Service {
    name: string,
    sale_price: number,
    purchase_price: number
};

export const getServices = async () => {
    const servicesSnapshot = await getDocs(servicesCollectionRef);
    return servicesSnapshot;
}

export const addService = async (service: Service) => {
     try {
        await addDoc(servicesCollectionRef, service);
    }
    catch (error) {
        return error;
    }
}
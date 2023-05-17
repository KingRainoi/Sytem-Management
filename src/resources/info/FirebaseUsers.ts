import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase.ts";

const usersCollection = collection(db, 'users');

export const addUser = async (user) => {
    try {
        await addDoc(usersCollection, user);
        return true;
    } catch (error) {
        return false;
    }
};

export const getUsers = async () => {
    const result = await getDocs(usersCollection);
    return result;
}; 
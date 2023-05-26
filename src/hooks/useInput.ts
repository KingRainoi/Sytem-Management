import { useState } from "react";
import { itemsModel } from "../resources/info/FirebaseSale.ts";

const useInput = (initialState:any,item:itemsModel) => {
    
    const [newValue, setNewValue] = useState(initialState);
    const [oldValue, setOldValue] = useState(initialState);

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) =>{

    }

    return [
        newValue,
        handleNumberChange
    ]
}

export default useInput
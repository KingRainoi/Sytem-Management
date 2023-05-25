import { useState } from "react";
import { itemsModel } from "../resources/info/FirebaseSale.ts";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { Product } from "../resources/info/FirebaseProducts.ts";

const useDropdown = (
    initialState: any,
    items: QueryDocumentSnapshot<DocumentData>[],
    handleItemSelect: (item: QueryDocumentSnapshot<DocumentData>, setState: (state: any) => void) => void
) => {
    const [state, setState] = useState(initialState);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        try {
            console.log(items);
            const selectedProduct = items.find(item => item.id === e.target.value);
            console.log("Soy lo seleccionado"+selectedProduct);
            if (selectedProduct) {
                handleItemSelect(selectedProduct, setState);
            }    
        }
        catch (error) {
            console.log(error);
            console.log("Error in useDropdown.ts");   
        }
    }

    return [
        state,
        handleChange
    ];
}

export default useDropdown;
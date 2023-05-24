import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { useState } from "react";

const useDropdown = (initialState: any, products: QueryDocumentSnapshot<DocumentData>[]) => {

    const [state, setState] = useState(initialState);
    
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedProduct = products.find(product => product.id === e.target.value);
        const sale_price = selectedProduct ? Number(selectedProduct.data().sale_price) : 0;
        setState(state => ({ ...state, items: [...state.items, e.target.value], total: state.total + sale_price }));
    }

    return [
        state,
        handleChange
    ];
}



export default useDropdown;
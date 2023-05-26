import { useState } from "react";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

const useDropdown = (
    initialState: any,
    items: QueryDocumentSnapshot<DocumentData>[],
    handleItemSelect: (item: QueryDocumentSnapshot<DocumentData>, setState: (state: any) => void) => void
) => {
    const [state, setState] = useState(initialState);

    const handleChange = (e: React.ChangeEvent<HTMLElement>,id?:number) => {
        try {
            const target = e.target as HTMLInputElement | HTMLSelectElement;
            if (target instanceof HTMLInputElement) {
                const newQuantity = Number(target.value);
                setState(prevState=>({...prevState,items:prevState.items.map(item=>{
                    if(item.id===id){
                        return {...item,quantity:newQuantity};
                    }
                    return item;
                })}))
            } else if (target instanceof HTMLSelectElement) {
                 const selectedProduct = items.find(item => item.id === target.value);
                if (selectedProduct) {
                    handleItemSelect(selectedProduct, setState);
                }   
            }  
        }
        catch (error) { 
        }
    }

    return [
        state,
        handleChange
    ];
}

export default useDropdown;
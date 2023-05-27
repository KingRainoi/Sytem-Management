import { useState } from "react";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { itemsModel } from "../resources/info/FirebaseSale.ts";

const useDropdown = (
  initialState: any,
  items: QueryDocumentSnapshot<DocumentData>[],
  handleItemSelect: (item: QueryDocumentSnapshot<DocumentData>, setState: (state: any) => void) => void
) => {
  const [state, setState] = useState(initialState);
  const [total, setTotal] = useState(initialState.items.reduce((sum: number, item: itemsModel) => sum + item.total, 0));

  const handleChange = (e: React.ChangeEvent<HTMLElement>, id?: string) => {
    try {
      const target = e.target as HTMLInputElement | HTMLSelectElement;
      if (target instanceof HTMLInputElement) {
        const newQuantity = Number(target.value);
        setState((prevState) => ({
          ...prevState,
          items: prevState.items.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                quantity: newQuantity,
                total: newQuantity * item.sale_price,
              };
            }
            return item;
          }),
        }));
      } else if (target instanceof HTMLSelectElement) {
        const selectedProduct = items.find((item) => item.id === target.value);
        if (selectedProduct) {
          handleItemSelect(selectedProduct, setState);
        }
      }
      setTotal(state.items.reduce((sum: number, item: itemsModel) => sum + item.total, 0));
    } catch (error) {
    }
  };

  return [state, handleChange, total];
};

export default useDropdown;
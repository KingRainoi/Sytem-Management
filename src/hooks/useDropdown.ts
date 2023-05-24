import { useState } from "react";

const useDropdown = (initialState:any) => {

    const [state, setState] = useState(initialState);


    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setState(state => ({ ...state, [e.target.name]: e.target.value }));
    }

    return [
        state,
        handleChange
    ];
}

export default useDropdown;
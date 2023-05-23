import { Listbox } from '@headlessui/react';
import React, { useContext, useState } from 'react';
import { saleInitialState,SaleContextData,SaleContext } from '../hooks/saleContext.ts';
import {Sale} from '../resources/info/FirebaseSale.ts';

const departments = [
  { id: 1, name: 'Marketing', contact: 'Durward Reynolds' },
  { id: 2, name: 'HR', contact: 'Kenton Towne' },
  { id: 3, name: 'Sales', contact: 'Therese Wunsch' },
  { id: 4, name: 'Finance', contact: 'Benedict Kessler' },
  { id: 5, name: 'Customer service', contact: 'Katelyn Rohan' },
]

function ListBox({ selectedDepartment, onChange }) {
    
    const {data: {items}, handleChange} = useContext<SaleContextData>(SaleContext);
    const [selected, setSelected] = useState(departments[0]);
    
    return (
       <Listbox value={selectedDepartment} by="id" onChange={onChange}>
           <Listbox.Button>{selectedDepartment.name}</Listbox.Button>
           <Listbox.Options>
               {departments.map((department) => (
               <Listbox.Option key={department.id} value={department}>
                   {department.name}
               </Listbox.Option>
               ))}
           </Listbox.Options>
       </Listbox>
    );

}

export default ListBox;
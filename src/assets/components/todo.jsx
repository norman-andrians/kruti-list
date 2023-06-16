import React, { useEffect, useState } from "react";
import AddList from "./form/addList";
import Item from "./list";
import ModalDelete from "./modal";

function ToDo(prop) {
    const [list, setList] = useState(prop.list);

    const [wantDel, setWantDel] = useState(false); 

    const addSubmit = (item) => {
        setList([...list, item]);
    };

    const handleDelete = (index) => {
        const newList = [...list];
        newList.splice(index, 1);
        setList(newList);
    }

    const handleEdit = (val, index) => {
        const newList = [...list];
        newList[index] = val;
        setList(newList);
    }

    return (
        <div className="">
            <ModalDelete del={wantDel} />
            <AddList onSubmit={addSubmit} />
            <ul className="mt-5">
                {list.map((val, i) => (
                    <li key={i}>
                        <Item
                            name={val}
                            index={i}
                            onDelete={handleDelete}
                            onEdit={handleEdit}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ToDo;
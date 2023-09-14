import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import AddList from "./form/addList";
import Item from "./list";
import axios from "axios";
import { useLocation } from "react-router-dom";

function ToDo(prop) {
    const location = useLocation();
    const [list, setList] = useState(prop.list);

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

    const saveList = () => {
        const body = { lists: list };

        axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/list`, body, {
            withCredentials: true
        })
    }

    useEffect(() => {
        const token = Cookies.get("token");

        if (token) {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/list`, {
                withCredentials: true
            })
                .then(({data}) => {
                    setList(data.lists);
                    return data.lists;
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }, [location]);

    return (
        <div className="md:w-[540px] mx-auto">
            <AddList onSubmit={addSubmit} />
            <ul className="mt-5">
                {list.map((val, i) => (
                    <li key={i}>
                        <Item
                            name={val.name}
                            check={val.check}
                            index={i}
                            onDelete={handleDelete}
                            onEdit={handleEdit}
                        />
                    </li>
                ))}
            </ul>
            {list.length > 0 &&
                <button type="button" onClick={saveList} className="mt-2 rounded h-fit transition duration-300 text-white bg-blue-600 hover:bg-blue-500 px-8 py-2">Save</button>
            }
        </div>
    );
}

export default ToDo;
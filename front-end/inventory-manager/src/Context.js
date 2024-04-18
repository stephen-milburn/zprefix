import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const InventoryContext = createContext();

const InventoryProvider = ({ children }) => {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ itemName, setItemName ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ quantity, setQuantity ] = useState('');
    const [ inventory, setInventory ] = useState([]);
    const [ selectedItem, setSelectedItem ] = useState([]);
    const [ editName, setEditName ] = useState({});
    const [ rowToEdit, setRowToEdit ] = useState([]);

    const navigate = useNavigate();

    const handleLoginButton = (e) => {
        e.preventDefault();
        if (JSON.parse(localStorage.getItem('isLoggedIn'))) {
            localStorage.removeItem('username');
            localStorage.setItem('isLoggedIn', JSON.stringify(false));
            localStorage.setItem('authorized', JSON.stringify(false));
            alert(`Logged out. Redirecting to Login screen....`)
        }
        navigate('/login')
    }

    const handleAdd = (e) => {
        e.preventDefault();
        navigate('/inventory/add');
    }

    const handleYourInventory = (e) => {
        let user = JSON.parse(localStorage.getItem('username'))
        e.preventDefault();
        navigate(`/inventory/view/user/${user}`);
    }

    const handleAllInventory = (e) => {
        e.preventDefault();
        navigate('/inventory/view');
    }

    const handleEdit = (e) => {
        e.preventDefault();
        navigate('/inventory/edit');
    }

    const editItem = async (e) => {
        let user = JSON.parse(localStorage.getItem('username'))
        if (JSON.parse(localStorage.getItem('isLoggedIn'))) {
            e.preventDefault();
            await fetch(`http://localhost:8080/inventory/edit/${editName}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ item_name: itemName, description, quantity })
            })
                .then(res => {
                    if (res.ok) navigate(`/inventory/view/user/${user}`)
                    alert(`Edited ${itemName}. Redirecting to your inventory....`)
                })
        }
    }

    const removeItem = (itemName) => {
        let user = JSON.parse(localStorage.getItem('username'))
        fetch(`http://localhost:8080/inventory/delete/${itemName}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.ok) {
                    console.log('Item removed.')
                    navigate(`/inventory/view/user/${user}`);
                    alert(`Removed ${itemName}. Redirecting to your inventory....`)
                }
                else console.error(`Failed to remove item ${itemName}`)
            })
    }

    const first100Chars = (string) => {
        const MAX_LENGTH = 100;
        if (string.length <= MAX_LENGTH) return string;
        else return string.substring(0, MAX_LENGTH) + '...'
    }

    return (
        <>
            <InventoryContext.Provider value = {{username,
                                                 setUsername,
                                                 password,
                                                 setPassword,
                                                 firstName,
                                                 setFirstName,
                                                 lastName,
                                                 setLastName,
                                                 itemName,
                                                 setItemName,
                                                 description,
                                                 setDescription,
                                                 quantity,
                                                 setQuantity,
                                                 inventory,
                                                 selectedItem,
                                                 setSelectedItem,
                                                 setInventory,
                                                 editName,
                                                 setEditName,
                                                 handleLoginButton,
                                                 handleAdd,
                                                 handleEdit,
                                                 handleYourInventory,
                                                 handleAllInventory,
                                                 removeItem,
                                                 first100Chars,
                                                 editItem,
                                                 rowToEdit,
                                                 setRowToEdit                                                
                                                }} >
                { children }
            </InventoryContext.Provider>
        </>
    )
}

export { InventoryContext, InventoryProvider }
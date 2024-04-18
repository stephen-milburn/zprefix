import React, { useContext, useEffect } from 'react';
import { InventoryContext } from '../Context';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col } from 'react-bootstrap'

const DataRow = styled(Row)`
    display: flex;
    justify-content: center;
    align-items: center;
`

const DataCol = styled(Col)`
    display: flex;
    justify-content: center;
    border: 1px solid;
`

const Bold = styled.span`
    font-weight: bold;
`

const Button = styled.button`
    display: flex;
    justify-content: center;
    color: white;
    border: 1px solid black;
    background-color: black;
    margin-right: 2px;
    margin-bottom: 2px;
`

const UserInventory = () => {
    const { inventory, 
            setInventory, 
            setEditName,
            setSelectedItem,
            removeItem,
            first100Chars,
            setItemName,
            setDescription,
            setQuantity,
            editItem,
            rowToEdit,
            setRowToEdit } = useContext(InventoryContext);
    const navigate = useNavigate();

    const toggleEditMode = (rowId) => {
        setRowToEdit(prevRowId => prevRowId === rowId ? null : rowId)
    }

    useEffect(() => {
        if(JSON.parse(localStorage.getItem('isLoggedIn'))) {
            let user = JSON.parse(localStorage.getItem('username'))
            fetch(`http://localhost:8080/user/${user}/inventory/`)
                .then(res => res.json())
                .then(itemData => setInventory(itemData))
        }
    }, [inventory])

    return (
        <>
        { JSON.parse(localStorage.getItem('authorized')) ?
            <>
                <h1 style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>YOUR INVENTORY</h1>
                <DataRow className='titles' style={{marginTop: '2px'}}>
                    <Col xs={2} style={{display: 'flex', justifyContent: 'end' }}>
                        <Button onClick ={ () => navigate(`/inventory/add/`)}>
                            Add New Item
                        </Button>
                    </Col>
                    <DataCol xs={3}>
                        <Bold>ITEM NAME</Bold>
                    </DataCol>
                    <DataCol xs={4}>
                        <Bold>DESCRIPTION</Bold>
                    </DataCol>
                    <DataCol xs={2}>
                        <Bold>QUANTITY</Bold>
                    </DataCol>
                </DataRow>
                {
                    inventory.map((item, index) => {
                        const editMode = rowToEdit === index;
                        return (
                            <DataRow key={index}>
                                <Col xs={2} style={{display: 'flex', justifyContent: 'end' }}>
                                { editMode ?
                                    <>
                                        <Button onClick ={(e) => {
                                            editItem(e);
                                            toggleEditMode(index);
                                        }}>
                                            Submit
                                        </Button>
                                        <Button onClick ={() => {
                                            toggleEditMode(index);
                                        }}>
                                            Cancel
                                        </Button>
                                    </>
                                    :
                                    <>
                                        <Button onClick ={() => {
                                            setEditName(item.item_name);
                                            toggleEditMode(index);
                                        }}>
                                            Edit
                                        </Button>
                                        <Button onClick ={() => {
                                            removeItem(item.item_name);
                                        }}>
                                            Delete
                                        </Button>
                                    </>
                                }
                                </Col>
                                { editMode ?
                                <>
                                    <DataCol xs={3}>
                                        <input style={{width: '100%'}} type='text' placeholder={`${item.item_name}`} onInput={(e) => setItemName(e.target.value)} />
                                    </DataCol>
                                    <DataCol xs={4}>
                                        <input style={{width: '100%'}} type='text' placeholder={`${first100Chars(item.description)}`} onInput={(e) => setDescription(e.target.value)} />
                                    </DataCol>
                                    <DataCol xs={2}>
                                        <input style={{width: '100%'}} type='text' placeholder={`${item.quantity}`} onInput={(e) => setQuantity(e.target.value)} />
                                    </DataCol>
                                </>
                                :
                                <>
                                    <DataCol xs={3} onClick={() => {
                                        setSelectedItem(item);
                                        navigate(`/inventory/view/item/${item.item_name}`);
                                    }}>
                                        {item.item_name}
                                    </DataCol>
                                    <DataCol xs={4} onClick={() => {
                                        setSelectedItem(item);
                                        navigate(`/inventory/view/item/${item.item_name}`);
                                    }}>
                                        {first100Chars(item.description)}
                                    </DataCol>
                                    <DataCol xs={2} onClick={() => {
                                        setSelectedItem(item);
                                        navigate(`/inventory/view/item/${item.item_name}`);
                                    }}>
                                        {item.quantity}
                                    </DataCol>
                                </>
                                }
                            </DataRow>
                        )
                    })
                }
            </>
            :
            <h1 style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>You must sign in to view your inventory.</h1>
        }
        </>
    )
}

export default UserInventory;
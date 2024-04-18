import React, { useContext, useState, useEffect } from 'react';
import { InventoryContext } from '../Context';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Card } from 'react-bootstrap'

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

const ViewItem = () => {
    const { inventory, 
            setInventory, 
            setEditInventory,
            selectedItem,
            first100Chars } = useContext(InventoryContext);
    const navigate = useNavigate();

    const removeItem = (itemName) => {
        fetch(`http://localhost:8080/inventory/delete/${itemName}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.ok) console.log('Item removed.')
                else console.error(`Failed to remove item ${itemName}`)
            })
    } 

    useEffect(() => {
        if(JSON.parse(localStorage.getItem('isLoggedIn'))) {
            fetch(`http://localhost:8080/inventory/item/${selectedItem.item_name}`)
                .then(res => res.json())
                .then(itemData => setInventory(itemData))
        }
        else {
            fetch(`http://localhost:8080/inventory/`)
                .then(res => res.json())
                .then(itemData => setInventory(itemData))
        }
    }, [inventory])

    return (
        <>
            <h1 style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>ITEM BREAKDOWN</h1>
            <DataRow className='titles' style={{marginTop: '2px'}}>
                <Col xs={2}>
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
                inventory.map(item => {
                    return (
                        <DataRow key={item.id}>
                            <Col xs={2} style={{display: 'flex', justifyContent: 'end' }}>
                                <Button id={item.id} onClick ={ () => {
                                    setEditInventory(item);
                                    navigate(`/inventory/edit/${item.item_name}`)
                                }}>
                                    Edit
                                </Button>
                                <Button id={item.id} onClick ={ () => {
                                    removeItem(item.item_name);
                                }}>
                                    Delete
                                </Button>
                            </Col>
                            <DataCol xs={3}>
                                {item.item_name}
                            </DataCol>
                            <DataCol xs={4}>
                                {first100Chars(item.description)}
                            </DataCol>
                            <DataCol xs={2}>
                                {item.quantity}
                            </DataCol>
                        </DataRow>
                    )
                })
            }
        </>
    )
}

export default ViewItem;

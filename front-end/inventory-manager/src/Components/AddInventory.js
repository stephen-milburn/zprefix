import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { InventoryContext } from '../Context';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
    width: 420px;
    background: black;
    color: white;
    border-radius: 10px;
    padding: 30px 40px;
    margin: 0 auto;
`

const InputBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    height: 50px;
    background: black;
    margin: 30px 0;
`

const Input = styled.input`
    width: 75%;
    height: 10%;
    background: black;
    border: 2px solid rgba(255, 255, 255, 0.2);
    outline: white;
    border-radius: 10px;
    color: white;
    padding: 20px;
`

const SubmitButton = styled.button`
    width: 100%;
    height: 45px;
    background: #fff;
    border: none;
    outline: none;
    border-radius: 40px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    font-size: 16px;
    color: #333;
    font-weight: 700;
`

const AddInventory = () => {
    const { itemName,
            setItemName,
            description,
            setDescription,
            quantity,
            setQuantity } = useContext(InventoryContext);
    const navigate = useNavigate();

    const addItem = (e) => {
        if (JSON.parse(localStorage.getItem('isLoggedIn'))) {
            e.preventDefault();
            let user = JSON.parse(localStorage.getItem('username'))
            fetch(`http://localhost:8080/user/${user}/inventory/new`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ item_name: itemName, description, quantity })
            })
                .then(res => {
                    if (res.ok) navigate(`/inventory/view/user/${user}`)
                })
        }
    }

    return (
        <>
            <h1 style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>ADD NEW INVENTORY ITEM</h1>
            <div style={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Wrapper>
                    <form>
                        <InputBox>
                            Item Name:
                            <Input type='text' placeholder='Item Name' onInput={(e) => setItemName(e.target.value)} required />
                        </InputBox>
                        <InputBox>
                            Description:
                            <Input type='text' placeholder='Description' onInput={(e) => setDescription(e.target.value)} required />
                        </InputBox>
                        <InputBox>
                            Quantity
                            <Input type='number' placeholder='Quantity' onInput={(e) => setQuantity(e.target.value)} required />
                        </InputBox>
                        <SubmitButton type='submit' onClick={addItem}>Add Item</SubmitButton>
                    </form>
                </Wrapper>
            </div>
        </>
    )
}

export default AddInventory;
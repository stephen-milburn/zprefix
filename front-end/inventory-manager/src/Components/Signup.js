import React, { useContext } from 'react';
import styled from 'styled-components';
import { InventoryContext } from '../Context';
import { useNavigate, Link } from 'react-router-dom';

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

const Signup = () => {
    const { username, 
            setUsername, 
            password, 
            setPassword,
            firstName,
            setFirstName,
            lastName,
            setLastName } = useContext(InventoryContext);
    const navigate = useNavigate();

    const signup = (e) => {
        e.preventDefault();
        fetch('http://localhost:8080/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ first_name: firstName, last_name: lastName, username, password })
        })
            .then(res => {
                if (res.ok) {
                    localStorage.setItem('username', JSON.stringify(username))
                    localStorage.setItem('isLoggedIn', JSON.stringify(true))
                    navigate(`/inventory/view/user/${username}`)
                }
            })
    }

    return (
        <div style={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Wrapper>
                <form>
                    <InputBox>
                        First Name:
                        <Input type='text' placeholder='First Name' onInput={(e) => setFirstName(e.target.value)} required />
                    </InputBox>
                    <InputBox>
                        Last Name:
                        <Input type='text' placeholder='Last Name' onInput={(e) => setLastName(e.target.value)} required />
                    </InputBox>
                    <InputBox>
                        Username:
                        <Input type='text' placeholder='Username' pattern="^[a-zA-Z0-9_-]+$" onInput={(e) => setUsername(e.target.value)} required />
                    </InputBox>
                    <InputBox>
                        Password:
                        <Input type='password' placeholder='Password' onInput={(e) => setPassword(e.target.value)} required />
                    </InputBox>
                    <SubmitButton type='submit' onClick={signup}>Create Account</SubmitButton>
                </form>
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
                    <Link to='http://localhost:3000/login'>Log In</Link>
                </div>
            </Wrapper>
        </div>
    )
}

export default Signup;
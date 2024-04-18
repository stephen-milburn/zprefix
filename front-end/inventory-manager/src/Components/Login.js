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

const Login = () => {
    const { username, 
            setUsername, 
            password, 
            setPassword } = useContext(InventoryContext);
    const navigate = useNavigate();

    const login = (e) => {
        e.preventDefault();
        fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
            .then(res => {
                if (res.ok) {
                    localStorage.setItem('username', JSON.stringify(username))
                    localStorage.setItem('isLoggedIn', JSON.stringify(true))
                    localStorage.setItem('authorized', JSON.stringify(true))
                    navigate(`/inventory/view/user/${username}`)
                }
            })
    }

    return (
        <div style={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Wrapper>
                <form>
                    <InputBox>
                        Username:
                        <Input type='text' placeholder='Username' onInput={(e) => {
                            setUsername(e.target.value);
                        }} required />
                    </InputBox>
                    <InputBox>
                        Password:
                        <Input type='password' placeholder='Password' onInput={(e) => {
                            setPassword(e.target.value);
                        }} required />
                    </InputBox>
                    <SubmitButton type='submit' onClick={login}>Log In</SubmitButton>
                </form>
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
                    <Link to='http://localhost:3000/signup'>Create Account</Link>
                </div>
            </Wrapper>
        </div>
    )
}

export default Login;
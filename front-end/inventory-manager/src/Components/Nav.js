import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { InventoryContext } from '../Context';

const Nav = () => {
    const { handleLoginButton,
            handleYourInventory,
            handleAllInventory } = useContext(InventoryContext)

    return (
        <header>
            <link
            href="https://snipboard.io/3qgB6v.jpg"
            rel="icon"
            />
            <nav className="navbar navbar-dark bg-dark justify-content-between p-2">
            <a className="navbar-brand mb-0 h1" href="#">
                <img src='https://snipboard.io/3qgB6v.jpg' alt='MIM Logo' style={{width: '50px', height: '50px', padding: '5px'}}/>
                Manager Inventory Manager
            </a>
            <form
                style={{display: 'inline-block'}}
                id="logout"
                className="form-inline d-flex justify-content-end"
            >
            {
                JSON.parse(localStorage.getItem('isLoggedIn')) ?
                <>
                    <button className="position-relative btn btn-dark btn-sm" onClick={handleYourInventory} style={{marginRight:'20px'}}>
                        Your Inventory
                    </button>
                    <button className="position-relative btn btn-dark btn-sm" onClick={handleAllInventory} style={{marginRight:'20px'}}>
                        All Inventory
                    </button>
                    <button className="position-relative btn btn-dark btn-sm" onClick={handleLoginButton} style={{marginRight:'20px'}}>
                        Logout
                    </button>
                </>
                :
                <>
                    <button className="position-relative btn btn-dark btn-sm" onClick={handleAllInventory} style={{marginRight:'20px'}}>
                        All Inventory
                    </button>
                    <button className="position-relative btn btn-dark btn-sm" onClick={handleLoginButton} style={{marginRight:'20px'}}>
                        Login
                    </button>
                </>
            }
            </form>
            </nav>
        </header>
    );
}

export default Nav;
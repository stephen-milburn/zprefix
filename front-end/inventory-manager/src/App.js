import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { InventoryProvider } from './Context';
import Nav from './Components/Nav';
import Login from './Components/Login';
import Signup from './Components/Signup';
import ViewInventory from './Components/ViewInventory';
import ViewItem from './Components/ViewItem';
import UserInventory from './Components/UserInventory';
import AddInventory from './Components/AddInventory';

function App() {
  return (
    <Router>
      <InventoryProvider>
        <Nav />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/inventory/view' element={<ViewInventory />} />
          <Route path='/inventory/view/item/:itemName' element={<ViewItem />} />
          <Route path='/inventory/view/user/:username' element={<UserInventory />} />
          <Route path='/inventory/add' element={<AddInventory />} />
        </Routes>
      </InventoryProvider>
    </Router>
  );
}

export default App;

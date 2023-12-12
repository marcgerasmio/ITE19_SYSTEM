import { Routes, Route } from "react-router-dom";
import './App.css';


import Login from './components/login';
import Dealer from "./components/dealer";
import Customer from "./components/customer";
import DealerConfirm from "./components/confirmdealerbuy";
import DealerInventory from "./components/dealerinventory";
import CustomerConfirm from "./components/confirmcustomerbuy";
import Logout from "./components/logout";
import CustomerHistory from "./components/customerhistory";
import DealerSales from "./components/dealersales";


function App() {
  return (
   <>
   <Routes>
    <Route path="/" element = {<Login />}/>
    <Route path="/dealer" element = {<Dealer />}/>
    <Route path="/customer" element = {<Customer />}/>
    <Route path="/dealerconfirm" element = {<DealerConfirm />}/>
    <Route path="/dealerinventory" element = {<DealerInventory />}/>
    <Route path="/customerconfirm" element = {<CustomerConfirm />}/>
    <Route path="/customerhistory" element = {<CustomerHistory />}/>
    <Route path="/logout" element = {<Logout />}/>
    <Route path="/sales" element = {<DealerSales />}/>



    
   </Routes>
   </>
  );
}

export default App;

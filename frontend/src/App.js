import './App.css';
import Routes from './Routes/RouteChange'
import Navbar from '../src/Components/Navbar/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';

import 'react-toastify/dist/ReactToastify.css'

import { ToastContainer } from 'react-toastify'


function App() {
  return (
    <div className="App">
  <Navbar />


  <Routes/>

  <ToastContainer position="bottom-right"/>

  
    </div>
  );
}

export default App;

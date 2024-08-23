import './App.css';
import { Routes,Route} from 'react-router-dom';
import Register from './components/register_component/register';
import Login from './components/login_component/login';
import Razor from './components/razorpay/razor';
function App(){
  return(
    <>
    <Routes>
    <Route path='/' element={<Register/>}></Route>
    <Route path='/login' element={<Login/>}></Route>
    <Route path='/razor' element={<Razor/>}></Route>
    </Routes>
    {/* <Register/> */}
    {/* <Login/> */}
    </>
  );
}

export default App
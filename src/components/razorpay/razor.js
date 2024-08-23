import { useState } from 'react';
import axios from 'axios';
import { _razorapiurlapiurl } from '../api.url';
import { useNavigate } from 'react-router-dom';

function Razor() {
    const checkoutHandler = async({image,title,price, checkoutHandler})=>{
        const response = await axios.post("http://localhost:8001/payment/checkout",{
            name,amount
        })
        console.log({order});
    }
return(
<>
{
 ProductData.map((c,i)=>{
    return <Card keys={i} image={c.image} title={c.title} price={c.price}
    oncheckout = {checkoutHandler}/>
 })   
}

  </>
);
}

export default Razor;

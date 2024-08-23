
import './App.css';
import axios from 'axios';
import React from 'react';

function App(){
  const [responseId, setResponseId] = React.useState("");
  const [responseState, setResponseState] = React.useState([]);

  const loadScript = (src)=>{
    return new Promise((resolve)=>{
  const script = document.createElement("script");
  script.src = src;

 script.onload = () => {
  resolve(true);
}

script.onerror = () => {
  // Handle error if needed
  resolve(new Error('Failed to load script'));
}

  document.body.appendChild(script);
})
}

const createRazorpayOrder = (amount) =>{
  let data = JSON.stringify({
    amount: amount*100,
    currency: "INR"
  })

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://localhost:3001/",
    headers:{
      'Content-Type': 'application/json'
    },
    data:data
  }
  axios.request(config).then((response)=>{
    console.log(JSON.stringify(response.data))
    handleRazorpayScreen(response.data.amount)
  }).catch((error)=>{
    console.log(error);
  })
}

const handleRazorpayScreen = async(amount)=>{
  const res = await loadScript("https:/checkout.razorpay.com/v1/checkout.js")

  if(!res){
    alert("some error at razorpay screen loading")
    return;
  }

  const options = {
    key: 'rzp_test_AKQrFFfawGK0t5',
    amount: amount,
    currency: 'INR',
    name: "Ajit_integration",
    description: "payment to ajit ",
    image: "./a.png",
    handler: function (response){
      setResponseId(response.razorpay_payment_id)
    },
    prefill:{
      name: "Ajit_integration",
      email: "ajitchouhan200@gmail.com"
    },
    theme:{
      color: "#F4C430"
    }
  }
  const paymentObject = new window.Razorpay(options)
  paymentObject.open()
}

const paymentFetch = (e) => {
  e.preventDefault(); // Prevent the form from submitting in the default way

  const paymentId = e.target.paymentId.value;

  axios.get(`http://localhost:3001/payment/${paymentId}`).then((response) => {
      setResponseState(response.data);
      console.log(response.data);
  }).catch((error) => {
      console.log('error occurs', error);
  });
};
  return(
    <div className='App'>
      <button onClick={()=> createRazorpayOrder(100)}>Pay 100</button>
      {responseId && <p>{responseId}</p>}
      <h1>payment verification</h1>
      <form onSubmit={paymentFetch}>
        <input type="text" name="paymentId" />
        <button type='submit'>fetch payment</button>
        {responseState.length !==0 && (
          <ul>
            <li>Amount: {responseState.amount / 100}Rs.</li>
            <li>Currency: {responseState.currency}</li>
            <li>Status: {responseState.status}</li>
            <li>Method: {responseState.method}</li>
            </ul>
        )}
      </form>
    </div>
  );
}
export default App;
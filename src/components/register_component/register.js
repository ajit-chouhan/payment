import axios from 'axios';
import { useState } from 'react';
import { _userapiurl } from '../api.url';

function Register(){
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [output, setOutput] = useState();

    const handlesubmit=()=>{
        const userdetail= {'name':name, 'password':password, 'email':email};
        axios.post(_userapiurl+"save",userdetail).then((response)=>{
            setOutput("register successfully");
            setName("");
            setEmail("");
            setPassword("");
        }).catch((error)=>{
            console.log(error);
        });
    };
    return(
        <>
        <div class="container-xxl py-5">
            <div class="container">
                <div class="row g-5">
                    <div class="col-lg-12 wow fadeInUp" data-wow-delay="0.1s">
<h1 class="mb-4">Register Here!!!</h1>
<font color="blue">{output}</font>
<form>
 <div class="form-group">
    <label for="name">Name:</label>
    <input type="text" class="form-control" value={name} onChange={ e => setName(e.target.value) } />
  </div>
  <br/>
  <div class="form-group">
    <label for="email">Email address:</label>
    <input type="email" class="form-control" value={email} onChange={ e => setEmail(e.target.value) } />
  </div>
  <br/>
  <div class="form-group">
    <label for="pwd">Password:</label>
    <input type="password" class="form-control" value={password} onChange={ e => setPassword(e.target.value) } />
  </div>    <br/>
            <button type='button' class='btn btn-danger' onClick={handlesubmit}>Submit</button>
            </form>
            </div>
            </div>
            </div>
            </div>
            </>
    );
}
export default Register
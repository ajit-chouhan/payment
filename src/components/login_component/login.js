import { useState } from 'react';
import axios from 'axios';
import { _userapiurl } from '../api.url';
import { useNavigate } from 'react-router-dom';

function Login() {

  const navigate = useNavigate();
  const [ email , setEmail ] = useState();
  const [ password , setPassword ] = useState();
  const [ output , setOutput ] = useState();    

  const handleSubmit=()=>{
    const userdetail={"email":email,"password":password};

    axios.post(_userapiurl+"login",userdetail).then((response)=>{
      // console.log(response.data);
      var users = response.data.userdetail;
      localStorage.setItem("token",response.data.token);                
      localStorage.setItem("_id",users._id);
      localStorage.setItem("name",users.name);
      localStorage.setItem("email",users.email);
      localStorage.setItem("info",users.info);
      localStorage.setItem("role",users.role);
      users.role=="admin"?navigate("/Admin"):navigate("/User");
    }).catch((error)=>{
      setOutput("Invalid user or verify your account....");
      setEmail("");
      setPassword("");
    });

  };

  return (
    <>
            {/* About Start */}
            <div class="container-xxl py-5">
            <div class="container">
                <div class="row g-5 align-items-center">
<div class="col-lg-12 wow fadeInUp" data-wow-delay="0.1s">
<h1 class="mb-4">Login Here!!!</h1>
<font color="blue">{output}</font>
<form>
  <div class="form-group">
    <label for="email">Email address:</label>
    <input type="email" class="form-control" value={email} onChange={ e => setEmail(e.target.value) } />
  </div>
  <br/>
  <div class="form-group">
    <label for="pwd">Password:</label>
    <input type="password" class="form-control" value={password} onChange={ e => setPassword(e.target.value) } />
  </div>
  <br/>
  <button type="button" class="btn btn-success" onClick={handleSubmit}>Submit</button>
</form>  
</div>
                </div>
            </div>
        </div>
        {/* About End */}




  </>
);
}

export default Login;

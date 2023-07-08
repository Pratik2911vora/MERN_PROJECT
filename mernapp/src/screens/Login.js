import React, { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import Navbar from '../components/Navbar';


export default function Login() {
  const [credentials, setcredentials] = useState({ email: "", password: "" });
  let Navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(
      JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      })
    );
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("enter valid credentials");
    }
    if (json.success) {
      localStorage.setItem("userEmail",credentials.email);
      localStorage.setItem("authToken",json.authToken);
      console.log(localStorage.getItem("authToken"))
      Navigate("/");

    }
    
  };

  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  return (
    <div style={{backgroundImage: 'url("https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', height: '100vh', backgroundSize: 'cover' }}>
      <div>
        <Navbar />
      </div>
    <div>
      <div className="container">
        <form className='w-50 m-auto mt-5 border bg-light border-success rounded' onSubmit={handleSubmit}>
          <div className="mb-4 ">
            <label htmlFor="exampleInputEmail1" className="form-label justify-content-center" >
            <option value="Times New Roman">Email Id:-</option>
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              value={credentials.email}
              onChange={onChange}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>

          <div className="mb-3 ">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
          </div>

          <button type="submit" className="m-3 btn btn-success">
            Submit
          </button>
          <Link to="/CreateUser" className="m-3 btn btn-danger">
            I'm a new User
          </Link>
        </form>
      </div>
    </div>
    {/* <div className=" bg-white positon-bottom"  >
         <Footer/>
        
      </div> */}
    </div>
  );
}

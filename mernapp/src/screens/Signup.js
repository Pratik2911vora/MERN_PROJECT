import React ,{useState} from "react"
import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

export default function Signup() {
    const [credentials, setcredentials] = useState({name:"", email:"", password:"",Geolocation:""})

  
    const handleSubmit = async(e)=>{
        e.preventDefault();
        console.log(JSON.stringify({name:credentials.name, email:credentials.email, password:credentials.password, location:credentials.Geolocation}))
        const response =await fetch("http://localhost:5000/api/CreateUser",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({name:credentials.name, email:credentials.email, password:credentials.password, location:credentials.Geolocation})
        });
        const json = await response.json()
        console.log(json);

        if(!json.success){
            alert("enter valid credentials")
        }
    }

    const onChange=(event)=>{
        setcredentials({...credentials,[event.target.name]:event.target.value})
    }
  return (
    <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', backgroundSize: 'cover',height: '100vh' }}>
    <div>
    <Navbar />
    </div>
    <>

    <div className="container">
      <form className='w-50 m-auto mt-5 border bg-light border-success rounded' onSubmit={handleSubmit}>
        <div className="mb-3 align-center">
          <label htmlFor="name" className="form-label ">
            Name
          </label>
          <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Location
          </label>
          <input type="text" className="form-control" name='Geolocation' value={credentials.Geolocation} onChange={onChange}/>
        </div>
       
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email 
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange}
          />
        </div>
        

        <button type="submit" className="m-3 btn btn-success">
          Submit
        </button>
        <Link to="/Login" className='m-3 btn btn-danger'>Already a User</Link>
      </form>
      </div>
      
    </>
    <div className="bg-white ">
      <Footer/>
    </div>
    </div>
  )
}

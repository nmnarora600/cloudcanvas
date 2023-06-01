import React,{useState} from 'react'
import { useNavigate} from "react-router-dom";

const Signup = (props) => {
  const [credentials, setCredentials]=useState({name:"",email:"",password:""});
  const [cpwd, setCpwd]=useState("");
    let navigate=useNavigate();



    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
    const onCPwdChange=(e)=>{
        setCpwd(e.target.value)
    }

    const handleOnSubmit=async(e)=>{
        e.preventDefault();
        if(cpwd!==credentials.password){
          props.showAlert("Invalid Credentials", "danger")
        }
        else{
          const response = await fetch("/api/auth/createuser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
              
            },
            body:JSON.stringify({name:credentials.name, email:credentials.email, password:credentials.password})
          });
          const json=await response.json();
          console.log(json)
          if(json.success){
            //redirect and save authtoken
            localStorage.setItem('token',json.authToken)
            navigate("/")
            props.showAlert("Account Created Successfully", "success");
          }
          else{
           props.showAlert("Invalid Credentials","danger");
          }
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
               
    }
  return (
    <div style={{minHeight:'100vh'}}>
       <h2 className="text-center my-3"> Create an Account to use CloudCanvas</h2>
        <form onSubmit={handleOnSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Full Name
          </label>
          <input
            type="name"
            className="form-control"
            id="name"
            name="name"
            onChange={onChange}
            value={credentials.name}
            minLength={3}
            aria-describedby="emailHelp"
          />
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={onChange}
            value={credentials.email}
            aria-describedby="emailHelp"
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
            id="password"
            value={credentials.password}
            onChange={onChange}
            name="password"
            minLength={5}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            value={cpwd}
            onChange={onCPwdChange}
            name="cpassword"
            minLength={5}
          />
        </div>
        <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="terms" required/>
    <label className="terms" htmlFor="terms" >I agree to all Terms and Conditions</label>
  </div>
        <button type="submit"  className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  )
}

export default Signup

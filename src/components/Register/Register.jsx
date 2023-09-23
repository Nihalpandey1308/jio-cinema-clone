import { useNavigate} from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./Register.css";
import { useEffect } from "react";





const Register = ({isLoggedIn}) => {
    const [email,setEmail]= useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();
    const signIn = (e) =>{
        e.preventDefault();
        navigate('/login');
    }

    useEffect (()=>{
        if (isLoggedIn){
            navigate('/home');
        }
    },[])

    const register = async  (e) =>{
        e.preventDefault();
        const url =  "https://academics.newtonschool.co/api/v1/user/signup"
        const config = {
            headers : {
                "projectId": "j4cxsmn851u6"
            }
        }
        const body = {
            "name" : name ,
            "email" : email,
            "password" : password,
            "appType" : "ott",
       }
       const res = await axios.post(url,body,config)
       console.log(res.data);
       if (res.status == 201){
       alert ("your registration is successfull,please login");
        navigate ('/login');
     }else ( alert("Something went Wrong")
     )
      
      

    }
    return <div className="register">
        <form className="container">
            <h1 >Register</h1>
            <label>
                Name
            </label>
                <input type="name" value={name} onChange={(e)=>setName(e.target.value)}/>
            
            <label>
                Email
            </label>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            
            <label>
                Password
            </label>
                <input type="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            
            <button  className="btn" onClick={register}>Register</button>
           
            <p className="DHA">Already have an account </p>

            <button className="btn" onClick={signIn}>Sign In</button>
        </form>

    </div>
}
export default Register;
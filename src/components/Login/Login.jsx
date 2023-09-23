import { useNavigate} from "react-router-dom";
import { useState } from "react";
import './Login.css'
import axios from "axios";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";



const Login = ({setisLoggedIn}) => {
    const [email,setEmail]= useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const validatetoken = (token)=>{
        const temp = jwtDecode(token)
        const ms = Date.now() /1000
        return ms < temp.exp ;
    }
    useEffect (()=>{
        const token = localStorage.getItem('jio-cinema-token')
        
        if (token && validatetoken(token)){
            setisLoggedIn(true)
            navigate('/home');
        }
    },[])
    
    const signIn  =async (e) =>{
        e.preventDefault();
        const url =  "https://academics.newtonschool.co/api/v1/user/login"
        const config = {
            headers : {
                "projectId": "j4cxsmn851u6"
            }
        }
        const body = {
            "email" : email,
            "password" : password,
            "appType" : "ott",
       }
       const res = await axios.post(url,body,config)
       if (res.data.status == "success"){
        localStorage.setItem('jio-cinema-token', res.data.token)
        setisLoggedIn(true) 
        alert ("your login is successfull");
        navigate ('/home');
       }else( alert("incorrect credentials")
       )

    }
    const register = (e) =>{
        e.preventDefault();
        navigate('/register');
    }
    return <div className="login">
        <form className="container">
            <h1>Signin</h1>
            <label htmlFor="email"> 
                Email
            </label>
                <input id="email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            
            <label htmlFor="pass">
                Password
            </label>
                <input id="pass" type="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            
            <button className="btn" onClick={signIn}>Login</button>
            
            <p className="DHA">Don't have account</p>

            <button className="btn" onClick={register}>Sign Up</button>

        </form>
    </div>
}
export default Login;

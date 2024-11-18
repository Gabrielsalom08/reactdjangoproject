import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN,REFRESH_TOKEN } from "../constants";
import LoadingIndicator from "./LoadingIndicator";

function Form({route,method}){
    const [username, setUsername]= useState("")
    const [pass, setPass]= useState("")
    const [loading, setLoading]= useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) =>{
        setLoading(true);
        e.preventDefault();

        try {
            const res=await api.post(route,{username,pass})
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/")
            } else {
                navigate("/login")
            }
        } catch (error) {
            alert(error)
        }finally{
            setLoading(false)
        }
    }

    return <form onSubmit={handleSubmit} className="form-container">
        <h1>{method=== "login"?"login":"Register"}</h1>
        <input
            className="form-input"
            type="text"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            placeholder="Username"
        />
        <input
            className="form-input"
            type="text"
            value={pass}
            onChange={(e)=>setPass(e.target.value)}
            placeholder="PASSWORD"
        />
        {loading && <LoadingIndicator/>}
        <button className="form-button" type="submit">
        {method=== "login"?"login":"Register"}
        </button>
    </form>
    
}

export default Form
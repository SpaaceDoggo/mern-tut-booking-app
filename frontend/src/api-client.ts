import type { LoginForm } from "./pages/Login";
import type { RegisterFormData } from "./pages/Register";

const API_URL = import.meta.env.VITE_API_BASE_URL || '';
export const register = async (data:RegisterFormData) => {
    const req = await fetch(`${API_URL}/api/user/register`,{
        method: 'POST',
        credentials: "include",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const res = await req.json();
    console.log(res);
    if(!req.ok){
        throw new Error(res.message);
    }
};

export const validateCookie = async () => {
    const req = await fetch('http://localhost:1000/api/auth/validate-cookie', 
        {
            method: 'POST',
            credentials: 'include',
            headers:{
                'Application-Type': 'application/json'
            },
            
        }
    );

    if(!req.ok){
        throw new Error("Token invalid");
    }

    return req.json();
}

export const login = async (data: LoginForm) => {
    console.log(data);
    const req = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const res = await req.json();
    
    if(!req.ok){
        console.log(res);
        throw new Error(res.message);
    }

    return res.userId;

    
}

export const logout = async () => {
    const req = await fetch('http://localhost:1000/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Application-Type': "application/json"
        }
    });

    if(!req.ok){
        throw new Error("Logout error");    
    }
}
import { Input } from "../shared/input";
import { Button } from "../shared/button";
import { useState } from "react";
import { db } from "../utils/database-client";
import { useNavigate } from "react-router-dom";

export function Login() {
    const navigate = useNavigate()

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')

    const handleLogin = async () => {
        try {
            const resp = await db.login({ username, password })
        
            if (!resp.success) {
                alert(resp.message)
            } else {
                navigate('/home')
            }
        } catch (error) {
            alert(error)
        }

    }

    return (
        <div className="flex flex-col md:flex-row h-screen w-screen justify-center items-center p-10 space-x-10">
            <div className="flex-1 flex justify-center items-center p-10">
                <img src="../../../public/logo.png" alt="logo" width={300} height={140} />
            </div>
            <div className="flex-1 flex flex-col p-10 border rounded-xl">
                <div className="mb-4 space-y-2">
                    <h2 className="text-xl font-bold text-slate-800">Entrar</h2>
                    <h3 className="font-semibold text-slate-600">Preencha os campos abaixo com seu nome de usuário e senha para entrar.</h3>
                </div>

                <div className="space-y-2 mb-10">
                    <Input label="Usuario" placeholder="Digite seu usario..." type="text" onChange={(e) => setUsername(e.target.value)} value={username} />
                    <Input label="Senha" placeholder="*********" type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                </div>
                
                <Button onClick={handleLogin}>Entrar</Button>
            </div>
        </div>
    );
}
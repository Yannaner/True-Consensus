"use client";
import { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase';
import Header from '../../components/header';
import { useRouter } from 'next/navigation';
import { Router } from 'next/router';
export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            
            
            const idToken = await userCredential.user.getIdToken();
            
            localStorage.setItem('firebaseIdToken', idToken);
            localStorage.setItem('userId', userCredential.user.uid);
            localStorage.setItem('firebaseToken', idToken)
            console.log('ID Token:', idToken);
            console.log('User ID:', userCredential.user.uid);
    
        
            router.push('/main');
        } catch (error) {
            setError((error as Error).message);
        }
    };

    return (
        <div>
            <Header />
            <main className="pt-50 px-4">
                <div className="flex justify-center">
                    <form onSubmit={handleLogin} className='flex flex-col gap-4 p-8 pb-10 border rounded-lg shadow-lg bg-white/10 w-full max-w-md'>
                        <h1 className="text-2xl font-bold mb-4">Login</h1>
                        {error && <p className="text-red-500">{error}</p>}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm">Email</label>
                            <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} className="p-2 rounded border bg-white/20" required />
                        </div>
                        <div className="flex flex-col gap-2 pb-6">
                            <label className="text-sm">Password</label>
                            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} className="p-2 rounded border bg-white/20" required />
                        </div>
                        <button type="submit" className='rounded border p-2 cursor-pointer'>Submit</button>
                    </form>
                </div>
            </main>
        </div>
    );
}
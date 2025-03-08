"use client";
import { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase';
import Header from '../../components/header';
import { useRouter } from 'next/navigation';
import { registerWithBackend } from '../../utils/auth';
export default function Signup() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Firebase signup
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            
            
            const idToken = await userCredential.user.getIdToken();
            
            localStorage.setItem('firebaseIdToken', idToken);
            localStorage.setItem('userId', userCredential.user.uid);
            
            console.log('ID Token:', idToken);
            console.log('User ID:', userCredential.user.uid);

            //await registerWithBackend(idToken);

            console.log('User created successfully');
            router.push('/main');
        } catch (error) {
            setError((error as Error).message);
        }
    };

    return (
        <div>
            <Header />
            <main className="pt-25 p-4">
                <div className="flex justify-center items-center h-screen">
                    <form onSubmit={handleSignup} className='flex flex-col gap-4 p-8 pb-10 border rounded-lg shadow-lg bg-white/10 w-full max-w-md mx-4'>
                        <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
                        {error && <p className="text-red-500">{error}</p>}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm">First Name</label>
                            <input type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)} className="p-2 rounded border bg-white/20" required />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm">Last Name</label>
                            <input type='text' value={lastName} onChange={(e) => setLastName(e.target.value)} className="p-2 rounded border bg-white/20" required />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm">Email</label>
                            <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} className="p-2 rounded border bg-white/20" required />
                        </div>
                        <div className="flex flex-col gap-2">
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
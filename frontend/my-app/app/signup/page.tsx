import Header from '../../components/header';

export default function Signup() {
    return (
        <div>
            <Header />
            <main className="pt-25 p-4">
                <div className="flex justify-center items-center h-screen">
                    <form className='flex flex-col gap-4 p-8 pb-10 border rounded-lg shadow-lg bg-white/10 w-full max-w-md mx-4'>
                        <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm">First Name</label>
                            <input type='text' id='first' className="p-2 rounded border bg-white/20" required></input>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm">Last Name</label>
                            <input type='text' id='last' className="p-2 rounded border bg-white/20" required></input>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm">Email</label>
                            <input type='email' id='email' className="p-2 rounded border bg-white/20" required></input>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm">Password</label>
                            <input type='password' id='pass' className="p-2 rounded border bg-white/20" required></input>
                        </div>
                        <div className="flex flex-col gap-2 pb-5">
                            <label className="text-sm">Retype Password</label>
                            <input type='password' id='pass2' className="p-2 rounded border bg-white/20" required></input>
                        </div>
                        <button type="submit" className='rounded border p-2 cursor-pointer'>Submit</button>
                    </form>
                </div>
            </main>
        </div>
    )
}
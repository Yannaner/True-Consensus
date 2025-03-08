import Header from '../../components/header';

export default function Login() {
    return (
        <div>
            <Header />
            <main className="pt-50 px-4">
                <div className="flex justify-center">
                    <form className='flex flex-col gap-4 p-8 pb-10 border rounded-lg shadow-lg bg-white/10 w-full max-w-md'>
                        <h1 className="text-2xl font-bold mb-4">Login</h1>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm">Email</label>
                            <input type='email' id='email' className="p-2 rounded border bg-white/20" required></input>
                        </div>
                        <div className="flex flex-col gap-2 pb-6">
                            <label className="text-sm">Password</label>
                            <input type='password' id='pass' className="p-2 rounded border bg-white/20" required></input>
                        </div>
                        <button type="submit" className='rounded border p-2 cursor-pointer'>Submit</button>
                    </form>
                </div>
            </main>
        </div>
    )
}
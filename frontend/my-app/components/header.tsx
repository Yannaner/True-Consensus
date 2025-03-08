function Header() {
    return (
        <header className="fixed flex top-0 left-0 w-full z-10 p-6 text-white justify-between items-center">
            <a className="text-3xl" href='/main'><b>True Consensus</b></a>
            <div className="flex sm:gap-6">
                <a href='/login'>Login</a>
                <a href='/signup'>Sign Up</a>
            </div>
        </header>
    )
}

export default Header;
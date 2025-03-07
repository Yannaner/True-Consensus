function Header() {
    return(
    <div className="header">
        <header>
            <h1>True Consensus</h1>
            <button>Login</button>
            <button>Sign Up</button>
        </header>
    </div>
    )
}

export default function Main() {
    return (
        <div>
            <Header />
            <div className="flex content-center items-center">
                <p>Voting made better</p>
                <button>View Categories</button>
            </div>
        </div>
    );
}
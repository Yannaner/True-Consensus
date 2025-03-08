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
                <p>Voting made better and easier</p>
                <button>View Categories</button>
            </div>
        </div>
    );
}

// function Header() {
//     return (
//       <header className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
//         <h1 className="text-2xl font-bold">True Consensus</h1>
//         <div className="space-x-4">
//           <button className="px-4 py-2 bg-white text-blue-600 rounded-md shadow hover:bg-gray-100">
//             Login
//           </button>
//           <button className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-700">
//             Sign Up
//           </button>
//         </div>
//       </header>
//     );
//   }
  
//   export default function Main() {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
//         <Header />
//         <div className="text-center mt-10 p-6 bg-white rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold mb-4">Voting made better and easier</h2>
//           <button className="px-6 py-3 bg-green-500 text-white rounded-md shadow hover:bg-green-600">
//             View Categories
//           </button>
//         </div>
//       </div>
//     );
//   }
  
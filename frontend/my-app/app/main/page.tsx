"use client";
import { useRef, useEffect, useState } from 'react';
import Header from '../../components/header';
import Image from 'next/image';
import { motion } from "motion/react";
import { useRouter } from 'next/navigation';
import  axios from 'axios';
import { stripVTControlCharacters } from 'node:util';

export default function Main() {
    const router = useRouter();
    const categoriesRef = useRef<HTMLElement>(null);

    // Authentication check
    useEffect(() => {
        const token = localStorage.getItem('firebaseToken');
        console.log("main token" + token)
        if (!token) {
            router.push('/login');
        }
    }, [router]);
    const [votingData, setVotingData] = useState(null);

    const scrollToCategories = () => {
        categoriesRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const box = {
        width: 150,
        height: 100,
        borderRadius: 10,
        backgroundColor: "#9911ff",
    }
    
      useEffect(() => {
    const getVotingList = async () => {
      const url = "https://tcbackend.backendboosterbeast.com/voting-elements/voting_list/1";

      try {
        let response;
        axios.get(url).then(res => {
          response = res.data
          console.log(response)
          setVotingData(response)
        })
        .catch(error => {
          console.error(error);
        });
        let data = (response as any)
        console.log("Voting List:", votingData);
      } catch (error) {
        console.error("Error fetching voting list:", error);
      }
    };

    getVotingList();
  }, []);
  
    return (
        <div className="w-full">
            <Header />
            <section className="flex min-h-screen items-center justify-center flex-col">
                <p className="text-3xl sm:text-5xl pt-15 pb-8">Voting Made Better</p>
                <p className="text-xl sm:text-3xl pb-20 m-5">Your Voice, Your Choice — Powered by Accurate Algorithms</p>
                <div className='flex sm:gap-6'>
                    <motion.button 
                        style={box} 
                        onClick={scrollToCategories} 
                        whileHover={{ scale: 1.2 }}
                    >
                        View Categories
                    </motion.button>
                    <motion.button 
                        style={box} 
                        whileHover={{ scale: 1.2 }}
                    >
                        Latest Rankings
                    </motion.button>
                </div>
            </section>

            <section ref={categoriesRef} className="min-h-screen pt-50 p-5 sm:p-16 bg-purple-900/90">
                <div className="flex flex-wrap text-lg gap-8 sm:gap-16 justify-center items-center pt-30">
                    <div className="bg-orange-500/70 rounded-lg w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center hover:bg-orange-500-/60 transition-all">
                        Basketball
                    </div>
                    <div className="bg-blue-500/70 rounded-lg w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center hover:bg-blue-500-/60 transition-all">
                        CUNY
                    </div>
                    <div className="bg-red-500/70 rounded-lg w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center hover:bg-red-500/60 transition-all">
                        Foods
                    </div>
                    <div className="bg-green-500/70 rounded-lg w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center hover:bg-green-500/60 transition-all">
                        Energy Drinks
                    </div>
                </div>
            </section>
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
  
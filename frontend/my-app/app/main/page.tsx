"use client";
import { useRef, useEffect, useState } from 'react';
import Header from '../../components/header';
import Image from 'next/image';
import { motion } from "motion/react";
import { useRouter } from 'next/navigation';
import  axios from 'axios';
import { stripVTControlCharacters } from 'node:util';
import Category from '../../components/Category';

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
    const [rankingData, setRankingData] = useState(null);
    interface CategoryType {
        id: number;
        question: string;
        title: string;
        color: string;
    }
    
    const [categories, setCategories] = useState<CategoryType[]>([]);

    const scrollToCategories = () => {
        categoriesRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const box = {
        width: 150,
        height: 100,
        borderRadius: 10,
        backgroundColor: "#2A2A2A",
        color: 'white',
        border: '2px solid #4A4A4A',
        boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)',
        transition: 'all 0.3s ease',
        cursor: 'pointer'
    }
    
      useEffect(() => {
    const getVotingList = async () => {
      const url = "https://tcbackend.backendboosterbeast.com/voting_list/";

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

    useEffect(() => {
        const loadCategories = () => {
            // Load stored categories from localStorage
            const storedCategories = JSON.parse(localStorage.getItem('voteGroups') || '[]');
            
            // Combine with hardcoded categories
            const hardcodedCategories = [
                {
                    id: 1,
                    question: "What are the top 10 basketball players?",
                    title: "Basketball",
                    color: "orange"
                },
                {
                    id: 2,
                    question: "What are the top 10 CUNY schools?",
                    title: "CUNY",
                    color: "blue"
                },
                {
                    id: 3,
                    question: "What are the top 10 foods?",
                    title: "Food",
                    color: "red"
                },
                {
                    id: 4,
                    question: "What are the top 10 energy drinks?",
                    title: "Memes",
                    color: "green"
                }
            ];

            setCategories([...hardcodedCategories, ...storedCategories]);
        };

        loadCategories();
    }, []);
  
    return (
        <div className="w-full">
            <Header />
            <section className="flex min-h-screen items-center justify-center flex-col">
                <p className="text-4xl sm:text-6xl font-bold pb-8 text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.15)]">
                    Voting Made Better
                </p>
                <p className="text-xl sm:text-3xl pb-20 m-5 text-gray-200 font-light tracking-wide text-center max-w-3xl leading-relaxed">
                    Your Voice, Your Choice — Powered by Transparent Algorithms
                </p>
                <div className='flex sm:gap-6'>
                    <motion.button 
                        style={box} 
                        onClick={scrollToCategories} 
                        whileHover={{ scale: 1.2 }}
                    >
                        View Categories
                    </motion.button>
                </div>
            </section>

           <section 
                ref={categoriesRef} 
                className="min-h-screen pt-50 p-5 sm:p-16 bg-gradient-to-r from-[#6c011f] via-[#000000] to-[#02025d] backdrop-blur-sm"
            >
                <div className="flex justify-between items-center mb-8">
                    {/* <h2 className="text-3xl font-bold text-white">Voting Categories</h2> */}
                    <button 
                        onClick={() => router.push('/create-vote')}
                        className="bg-green-500/50 hover:bg-green-500/70 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300 backdrop-blur-sm border border-white/10 flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Create New Topic
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {categories.map((category) => (
                        <Category 
                            key={category.id}
                            id={category.id}
                            question={category.question}
                            title={category.title}
                            color={category.color || "blue"}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}

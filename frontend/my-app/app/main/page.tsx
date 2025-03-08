"use client";
import { useRef, useEffect } from 'react';
import Header from '../../components/header';
import Image from 'next/image';
import { motion } from "motion/react";
import { useRouter } from 'next/navigation';

export default function Main() {
    const router = useRouter();
    const categoriesRef = useRef<HTMLElement>(null);

    // Authentication check
    useEffect(() => {
        const token = localStorage.getItem('firebaseToken');
        if (!token) {
            router.push('/login');
        }
    }, [router]);

    const scrollToCategories = () => {
        categoriesRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const box = {
        width: 150,
        height: 100,
        borderRadius: 10,
        backgroundColor: "#9911ff",
    }

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
                        Sports
                    </div>
                    <div className="bg-blue-500/70 rounded-lg w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center hover:bg-blue-500-/60 transition-all">
                        Music
                    </div>
                    <div className="bg-red-500/70 rounded-lg w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center hover:bg-red-500/60 transition-all">
                        Movies
                    </div>
                    <div className="bg-green-500/70 rounded-lg w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center hover:bg-green-500/60 transition-all">
                        Shows
                    </div>
                </div>
            </section>
        </div>
    );
}
"use client";
import {useRef} from 'react';
import Header from '../../components/header';

export default function Main() {
    const categoriesRef = useRef<HTMLElement>(null);

    const scrollToCategories = () => {
        categoriesRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="w-full">
            <Header />
            <section className="flex min-h-screen items-center justify-center flex-col">
                <p className="text-3xl sm:text-5xl pt-15 pb-8">Voting Made Better</p>
                <p className="text-xl sm:text-3xl pb-20 m-5"> Your Voice, Your Choice — Powered by Accurate Algorithms</p>
                <div className='flex sm:gap-6'>
                <button 
                    onClick={scrollToCategories}
                    className="text-xl drop-shadow-md border border-solid border-white rounded-full hover:bg-gray-100/30 px-4 py-2">
                    View Categories
                </button>
                <button 
                    className="text-xl drop-shadow-md border border-solid border-white rounded-full hover:bg-gray-100/30 px-4 py-2">
                    Latest Rankings
                </button>
                </div>
            </section>

            <section ref={categoriesRef} className="min-h-screen pt-50 p-5 sm:p-16 bg-purple-900/90">
                <div className="flex flex-wrap text-lg gap-8 sm:gap-16 justify-center items-center pt-30">
                    <div className="bg-white/50 rounded-lg border border-solid w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center hover:bg-white/60 transition-all">
                        Sports
                    </div>
                    <div className="bg-white/50 rounded-lg border border-solid w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center hover:bg-white/60 transition-all">
                        Music
                    </div>
                    <div className="bg-white/50 rounded-lg border border-solid w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center hover:bg-white/60 transition-all">
                        Movies
                    </div>
                    <div className="bg-white/50 rounded-lg border border-solid w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center hover:bg-white/60 transition-all">
                        Shows
                    </div>
                </div>
            </section>
        </div>
    );
}
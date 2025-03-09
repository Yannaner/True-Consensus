"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/header';
import axios from 'axios';

export default function CreateVote() {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '']); // Minimum 2 options
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>('');

    const handleOptionChange = (index: number, value: string) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const addOption = () => {
        setOptions([...options, '']);
    };

    const removeOption = (index: number) => {
        if (options.length > 2) {
            const newOptions = options.filter((_, i) => i !== index);
            setOptions(newOptions);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const newId = Date.now();
            
            // Create the vote group object
            const newVoteGroup = {
                id: newId,
                voting_id: newId, // Add this to match backend format
                question: question,
                title: title,
                voting_amt: 0,
                options: options.filter(opt => opt.trim() !== '')
            };

            // Save vote group to localStorage
            const existingGroups = JSON.parse(localStorage.getItem('voteGroups') || '[]');
            existingGroups.push(newVoteGroup);
            localStorage.setItem('voteGroups', JSON.stringify(existingGroups));

            // Save voting elements to localStorage
            const existingElements = JSON.parse(localStorage.getItem('votingElements') || '[]');
            const newElements = newVoteGroup.options.map((option, index) => ({
                id: newId + index,
                voting_id: newId,
                item: option
            }));
            existingElements.push(...newElements);
            localStorage.setItem('votingElements', JSON.stringify(existingElements));

            await router.push('/main');
        } catch (error) {
            console.error('Error creating vote group:', error);
            alert('Failed to create vote group. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-[#6c011f] via-[#000000] to-[#02025d]">
            <Header />
            <div className="pt-24 px-4 max-w-2xl mx-auto">
                <form onSubmit={handleSubmit} className="space-y-6 bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-xl border border-white/20">
                    <h1 className="text-3xl font-bold text-white mb-8">Create New Vote Group</h1>
                    
                    <div className="space-y-2">
                        <label className="block text-white">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-2 rounded bg-white/20 border border-white/30 text-white"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-white">Question</label>
                        <input
                            type="text"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            className="w-full p-2 rounded bg-white/20 border border-white/30 text-white"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-white">Options</label>
                        {options.map((option, index) => (
                            <div key={index} className="flex gap-2">
                                <input
                                    type="text"
                                    value={option}
                                    onChange={(e) => handleOptionChange(index, e.target.value)}
                                    className="flex-1 p-2 rounded bg-white/20 border border-white/30 text-white"
                                    required
                                />
                                {options.length > 2 && (
                                    <button
                                        type="button"
                                        onClick={() => removeOption(index)}
                                        className="px-3 py-2 bg-red-500/50 hover:bg-red-500/70 rounded text-white"
                                    >
                                        ×
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addOption}
                            className="mt-2 px-4 py-2 bg-green-500/50 hover:bg-green-500/70 rounded text-white font-bold flex items-center gap-2" // Updated styling
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                            </svg>
                            Add Option
                        </button>
                    </div>

                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="w-1/2 px-4 py-2 bg-red-500/50 hover:bg-red-500/70 rounded text-white transition-all duration-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="w-1/2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded text-white transition-all duration-300"
                        >
                            Create Vote Group
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

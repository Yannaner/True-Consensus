"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface CategoryProps {
    id: number;
    question: string;
    title: string;
    color: string;
}

interface RankingItem {
    id: number;
    item: string;
}

export default function Category({ id, question, title, color }: CategoryProps) {
    const router = useRouter();
    const [topRankings, setTopRankings] = useState<string[]>([]);

    useEffect(() => {
        const fetchRankings = async () => {
            try {
                // First get the calculated consensus
                const consensusResponse = await axios.get(`https://tcbackend.backendboosterbeast.com/consensus-vote/${id}`);
                const consensusRank = consensusResponse.data.formattedConsensus.split(', ').splice(0,5);

                // Then get the items list to map IDs to names
                const itemsResponse = await axios.get(`https://tcbackend.backendboosterbeast.com/voting-elements/voting_list/${id}`);
                const itemsMap = new Map(itemsResponse.data.map((item: RankingItem) => [item.id, item.item]));

                setTopRankings(consensusRank);
            } catch (error) {
                console.error('Error fetching rankings:', error);
            }
        };

        fetchRankings();
    }, [id]);

    const handleClick = () => {
        router.push(`/vote?id=${id}&question=${encodeURIComponent(question)}&title=${encodeURIComponent(title)}`);
    };

    return (
        <div className={`bg-${color}-500/70 rounded-lg w-80 h-auto min-h-[320px] border border-white flex flex-col items-center p-6 hover:bg-${color}-500/60 transition-all`}>
            {/* Title Section */}
            <div className="w-full text-center mb-6 pb-4 border-b border-white/30">
                <h2 className="text-2xl font-bold tracking-wide">{title}</h2>
                <p className="text-sm text-white/80 mt-1">Current Rankings</p>
            </div>
            
            {/* Rankings Section */}
            <div className="flex-grow w-full">
                {topRankings.length > 0 ? (
                    <div className="space-y-2">
                        {topRankings.map((item, index) => (
                            <div 
                                key={index} 
                                className="flex items-center gap-3 p-2 bg-white/10 rounded-lg transition-all hover:bg-white/20"
                            >
                                <span className="flex items-center justify-center w-8 h-8 bg-white/20 rounded-full font-bold">
                                    {index + 1}
                                </span>
                                <span className="flex-grow">{item}</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white mb-2"></div>
                            <p className="text-sm text-white/80">Loading Rankings...</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Action Button */}
            <button 
                onClick={handleClick}
                className="mt-6 w-full px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-white/90 transition-all transform hover:scale-105 active:scale-95"
            >
                Cast Your Vote
            </button>
        </div>
    );
}
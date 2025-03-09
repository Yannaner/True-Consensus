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
        <div className={`bg-${color}-500/70 rounded-lg w-32 h-40 sm:w-80 sm:h-90 border border-white flex flex-col items-center justify-between p-4 hover:bg-${color}-500/60 transition-all`}>
            <h2 className="text-xl font-bold">{title} Rankings</h2>
            
            <div className="flex flex-col items-center gap-2">
                {topRankings.length > 0 ? (
                    topRankings.map((item, index) => (
                        <div key={index} className="text-center">
                            {index + 1}. {item}
                        </div>
                    ))
                ) : (
                    <div className="text-center text-sm">Loading rankings...</div>
                )}
            </div>

            <button 
                className="mt-auto px-4 py-2 bg-white/20 rounded-full hover:bg-white/30 transition-all cursor-pointer"
                onClick={handleClick}
            >
                Vote Here
            </button>
        </div>
    );
}
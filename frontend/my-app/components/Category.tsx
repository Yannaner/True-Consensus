"use client";
import { useRouter } from 'next/navigation';

interface CategoryProps {
    id: number;
    question: string;
    title: string;
    color: string;
}

export default function Category({ id, question, title, color }: CategoryProps) {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/vote?id=${id}&question=${encodeURIComponent(question)}&title=${encodeURIComponent(title)}`);
    };

    return (
        <div 
            onClick={handleClick}
            className={`bg-${color}-500/70 rounded-lg w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center hover:bg-${color}-500/60 transition-all cursor-pointer`}
        >
            {title}
        </div>
    );
}
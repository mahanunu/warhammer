"use client";
import { useEffect, useState } from "react";

interface CharacterAttributes {
    id: number;
    name: string;
    desc: string;
    division: string;
    role: string;
    rank: string;
    abilities: string[];
}

type CharacterData = CharacterAttributes[];

export default function Home() {
    const [data, setData] = useState<CharacterData>([]);

    useEffect(() => {
        fetch("http://localhost:1337/api/characters?populate=image")
            .then((res) => res.json())
            .then((result) => setData(result.data))
            .catch((err) => console.error("Error fetching data:", err));
    }, []);

    if (data.length === 0) return <p>Loading...</p>;

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                {data.map((character) => (
                    <div key={character.id} className="flex flex-col gap-4">
                        <h1>{character.name}</h1>
                        <p>{character.desc}</p>
                        <p><strong>Division:</strong> {character.division}</p>
                        <p><strong>Role:</strong> {character.role}</p>
                        <p><strong>Rang:</strong> {character.rank}</p>
                        <p><strong>Capacités:</strong></p>
                        <ul>
                            {character.abilities.map((ability, index) => (
                                <li key={index}>{ability}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </main>
        </div>
    );
}

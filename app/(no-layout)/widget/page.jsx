'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Widget from '@components/Widget';

function widget() {
    const searchParams = useSearchParams();

    const [data, setData] = useState();
    const [elo, setElo] = useState('100');
    const [level, setLevel] = useState('1');

    const backgroundParam = searchParams.get('background-color');
    const colorParam = searchParams.get('font-color');
    const borderRadiusParam = searchParams.get('border-radius');
    const nicknameParam = searchParams.get('nickname');


    function getFaceitData() {
        const headers = {
            'Authorization': 'Bearer 5dbe323f-3fb4-4bd6-8b9f-b5688d63ebee'
        };
        fetch("https://open.faceit.com/data/v4/players?nickname=" + nicknameParam + "&game=cs2", { headers, method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                if (data.games) {
                    setElo(data.games.cs2.faceit_elo);
                    setLevel(data.games.cs2.skill_level);
                }
            })
    }

    useEffect(() => {
        getFaceitData()
        const timeout = setInterval(() => {
            getFaceitData()
            console.log("Updated data.")
        }, 20000);
        console.log("USER: " + nicknameParam)
    }, []);

    return (
        <Widget src={`https://cdn-frontend.faceit.com/web/960/src/app/assets/images-compress/skill-icons/skill_level_${level}_svg.svg`} elo={elo} className="" style={{ borderRadius: borderRadiusParam + "px", backgroundColor: "#" + backgroundParam }} textColor={{ color: "#" + colorParam }} />
    )
}

export default widget
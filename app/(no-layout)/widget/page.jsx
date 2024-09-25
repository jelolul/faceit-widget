'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Widget from '@components/Widget';

function widget() {
    const searchParams = useSearchParams();

    const [data, setData] = useState();
    const [elo, setElo] = useState('100');
    const [level, setLevel] = useState('1');
    const [region, setRegion] = useState();

    const [playerStats, setPlayerStats] = useState();
    const [playerRankingData, setPlayerRankingData] = useState();
    const [playerRanking, setPlayerRanking] = useState("");
    const [avgKD, setAvgKD] = useState('1.00');

    const backgroundParam = searchParams.get('background-color');
    const colorParam = searchParams.get('text-color');
    const borderRadiusParam = searchParams.get('border-radius');
    const nicknameParam = searchParams.get('nickname');
    const displayKDParam = searchParams.get('show-kd');
    const displayRankingParam = searchParams.get('show-ranking');

    const headers = {
        'Authorization': 'Bearer 5dbe323f-3fb4-4bd6-8b9f-b5688d63ebee'
    }

    function getStatsData(player_id) {
        fetch("https://open.faceit.com/data/v4/players/" + player_id + "/stats/cs2", { headers, method: 'GET' })
            .then((res) => res.json())
            .then((playerStats) => {
                setPlayerStats(playerStats)
                if (playerStats.lifetime) {
                    setAvgKD(playerStats.lifetime["Average K/D Ratio"])
                }
            })
    }

    function getPlayerRanking(player_id, region) {
        fetch("https://open.faceit.com/data/v4/rankings/games/cs2/regions/" + region + "/players/" + player_id, { headers, method: 'GET' })
            .then((res) => res.json())
            .then((playerRankingData) => {
                setPlayerRankingData(playerRankingData)
                if (playerRankingData.position) {
                    setPlayerRanking(playerRankingData.position)
                }
            })
    }

    function getFaceitData() {
        fetch("https://open.faceit.com/data/v4/players?nickname=" + nicknameParam + "&game=cs2", { headers, method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                if (data.games) {
                    setRegion(data.games.cs2.region)
                    setElo(data.games.cs2.faceit_elo);
                    setLevel(data.games.cs2.skill_level);
                    getStatsData(data.player_id)
                    getPlayerRanking(data.player_id, data.games.cs2.region)
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
        console.log(colorParam)
    }, []);

    return (
        <Widget src={`https://cdn-frontend.faceit.com/web/960/src/app/assets/images-compress/skill-icons/skill_level_${level}_svg.svg`} elo={elo} avgKd={avgKD} displayKD={displayKDParam} playerRanking={playerRanking} displayRanking={displayRankingParam} region={region} className="" style={{ borderRadius: borderRadiusParam + "px", backgroundColor: "#" + backgroundParam }} textColor={`#${colorParam}`} />
    )
}

export default widget
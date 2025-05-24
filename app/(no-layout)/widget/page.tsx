"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Widget from "@components/Widget";

export default function WidgetPage() {
	const searchParams = useSearchParams();

	const [data, setData] = useState();
	const [avatar, setAvatar] = useState();
	const [elo, setElo] = useState("----");
	const [nickname, setNickname] = useState("----");
	const [level, setLevel] = useState("0");
	const [region, setRegion] = useState();

	const [playerStats, setPlayerStats] = useState();
	const [playerLastTwentyStats, setPlayerLastTwentyStats] = useState();
	const [playerRankingData, setPlayerRankingData] = useState();
	const [playerRanking, setPlayerRanking] = useState("----");
	const [avgKD, setAvgKD] = useState("-.--");

	const backgroundParam = searchParams.get("background-color");
	const colorParam = searchParams.get("text-color");
	const borderRadiusParam = searchParams.get("border-radius");
	const nicknameParam = searchParams.get("nickname") || "";
	const displayKDParam = searchParams.get("show-kd");
	const displayRankingParam = searchParams.get("show-ranking");
	const displayLastTwentyMatchesParam = searchParams.get("show-last-20");

	const headers = {
		Authorization: "Bearer 5dbe323f-3fb4-4bd6-8b9f-b5688d63ebee",
	};

	function getStatsData(player_id: any) {
		fetch(
			"https://open.faceit.com/data/v4/players/" +
				player_id +
				"/stats/cs2",
			{ headers, method: "GET" }
		)
			.then((res) => res.json())
			.then((playerStats) => {
				setPlayerStats(playerStats);
				if (playerStats.lifetime) {
					setAvgKD(playerStats.lifetime["Average K/D Ratio"]);
				}
			});
	}

	function getLastTwentyStatsData(player_id: any) {
		fetch(
			"https://open.faceit.com/data/v4/players/" +
				player_id +
				"/games/cs2/stats",
			{ headers, method: "GET" }
		)
			.then((res) => res.json())
			.then((playerLastTwentyStats) => {
				setPlayerLastTwentyStats(playerLastTwentyStats);
			});
	}

	function getPlayerRanking(player_id: any, region: any) {
		fetch(
			"https://open.faceit.com/data/v4/rankings/games/cs2/regions/" +
				region +
				"/players/" +
				player_id,
			{ headers, method: "GET" }
		)
			.then((res) => res.json())
			.then((playerRankingData) => {
				setPlayerRankingData(playerRankingData);
				if (playerRankingData.position) {
					setPlayerRanking(playerRankingData.position);
				}
			});
	}

	function getFaceitData() {
		fetch(
			"https://open.faceit.com/data/v4/players?nickname=" +
				nicknameParam +
				"&game=cs2",
			{ headers, method: "GET" }
		)
			.then((res) => res.json())
			.then((data) => {
				setData(data);
				if (data.games) {
					setRegion(data.games.cs2.region);
					setElo(data.games.cs2.faceit_elo);
					setLevel(data.games.cs2.skill_level);
					getStatsData(data.player_id);
					getPlayerRanking(data.player_id, data.games.cs2.region);
					getLastTwentyStatsData(data.player_id);
					setNickname(data.nickname);
					setAvatar(data.avatar);
				}
			});
	}

	useEffect(() => {
		getFaceitData();
		const timeout = setInterval(() => {
			getFaceitData();
			console.log("Updated data.");
		}, 20000);
	}, []);

	return (
		<Widget
			data={data}
			avatar={avatar}
			nickname={nickname}
			level={level}
			elo={elo}
			avgKd={avgKD}
			displayKD={displayKDParam}
			playerRanking={playerRanking}
			displayRanking={displayRankingParam}
			lastTwentyStats={playerLastTwentyStats}
			displayLastTwentyMatches={displayLastTwentyMatchesParam}
			className=""
			borderRadius={borderRadiusParam + "px"}
			backgroundColor={"#" + backgroundParam}
			textColor={`#${colorParam}`}
		/>
	);
}

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Widget from "@components/Widget";
import Button from "@components/Button";
import ColorPicker from "@components/ColorPicker";
import Status from "@components/Status";
import clsx from "clsx";

import {
	Listbox,
	ListboxButton,
	ListboxOption,
	ListboxOptions,
	Field,
	Label,
} from "@headlessui/react";
import Tooltip from "@components/Tooltip";
import ColorPickerAlt from "@components/ColorPickerAlt";

interface DropdownOptions {
	id: number;
	name: string;
}

const gameOptions: DropdownOptions[] = [{ id: 1, name: "CS2" }];

const displayKDOptions: DropdownOptions[] = [
	{ id: 1, name: "hide" },
	{ id: 2, name: "show" },
];

const displayRankingOptions: DropdownOptions[] = [
	{ id: 1, name: "hide" },
	{ id: 2, name: "show" },
];

const displayLastTwentyStatsOptions: DropdownOptions[] = [
	{ id: 1, name: "hide" },
	{ id: 2, name: "show" },
];

function WidgetEditor() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();

	const [data, setData] = useState();
	const [elo, setElo] = useState("----");
	const [level, setLevel] = useState("0");
	const [region, setRegion] = useState();

	const [playerStats, setPlayerStats] = useState();
	const [playerLastTwentyStats, setPlayerLastTwentyStats] = useState();
	const [playerRankingData, setPlayerRankingData] = useState();
	const [playerRanking, setPlayerRanking] = useState("----");
	const [avgKD, setAvgKD] = useState("-.--");

	const [nickname, setNickname] = useState("");
	const [border_radius, setBorderRadius] = useState("24");
	const [backgroundColor, setBackgroundColor] = useState("1f1f22");
	const [textColor, setTextColor] = useState("ffffff");

	var [games, setGame] = useState<DropdownOptions>(gameOptions[0]);

	var [displayKD, setDisplayKD] = useState<DropdownOptions>(
		displayKDOptions[0]
	);

	var [displayRanking, setDisplayRanking] = useState<DropdownOptions>(
		displayRankingOptions[0]
	);

	var [displayLastTwenty, setDisplayLastTwenty] = useState<DropdownOptions>(
		displayLastTwentyStatsOptions[0]
	);

	const nicknameParam = searchParams.get("nickname");
	const backgroundParam = searchParams.get("background-color");
	const colorParam = searchParams.get("text-color");
	const borderRadiusParam = searchParams.get("border-radius");
	const displayKDParam = searchParams.get("show-kd");
	const displayRankingParam = searchParams.get("show-ranking");
	const displayLastTwentyMatchesParam = searchParams.get("show-last-20");

	useEffect(() => {
		const updateStates = () => {
			// if (gameParam) {
			// 	setGame(gameOptions[gameParam === "true" ? 1 : 0]);
			// }

			if (nicknameParam) {
				setNickname(nicknameParam);
			}

			if (backgroundParam) {
				setBackgroundColor(backgroundParam);
			}

			if (colorParam) {
				setTextColor(colorParam);
			}

			if (borderRadiusParam) {
				setBorderRadius(borderRadiusParam);
			}

			if (displayKDParam) {
				setDisplayKD(
					displayKDOptions[displayKDParam === "true" ? 1 : 0]
				);
			}

			if (displayRankingParam) {
				setDisplayRanking(
					displayRankingOptions[
						displayRankingParam === "true" ? 1 : 0
					]
				);
			}

			if (displayLastTwentyMatchesParam) {
				setDisplayLastTwenty(
					displayLastTwentyStatsOptions[
						displayLastTwentyMatchesParam === "true" ? 1 : 0
					]
				);
			}
		};

		const timeout = setTimeout(() => {
			updateStates();
		}, 0);
	}, []);

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
				nickname +
				"&game=cs2",
			{ headers, method: "GET" }
		)
			.then((res) => res.json())
			.then((data) => {
				setData(data);
				if (data.games) {
					setElo(data.games.cs2.faceit_elo);
					setLevel(data.games.cs2.skill_level);
					getStatsData(data.player_id);
					getPlayerRanking(data.player_id, data.games.cs2.region);
					getLastTwentyStatsData(data.player_id);
				}
			});
	}

	useEffect(() => {
		getFaceitData();
		const timeout = setInterval(() => {
			getFaceitData();
			console.log("Updated data.");
		}, 150000);
	}, [nickname]);

	function update_widget(term: any, param: any) {
		const params = new URLSearchParams(searchParams.toString());
		if (term) {
			params.set(param, term);
		} else {
			params.delete(param);
		}

		router.replace(`${pathname}?${params.toString()}`);
	}

	return (
		<section className="content">
			<div className="widget-editor-content">
				<div className="editor">
					<div className="widget-editor">
						<div className="sections">
							<div className="section-label">General</div>
							<div className="section">
								<div className="setting">
									<div className="truncate setting-label">
										FACEIT Nickname
										{/* <span className="tooltip-text">Case-Sensitive</span> */}
									</div>
									<div className="flex">
										<input
											type="text"
											id="faceit-nickname"
											placeholder="FrozenBag"
											onBlur={(e) => {
												setNickname(
													searchParams.get(
														"nickname"
													) || "FrozenBag"
												);
											}}
											onKeyDown={(e) => {
												if (e.key === "Enter") {
													setNickname(
														searchParams.get(
															"nickname"
														) || "FrozenBag"
													);
												}
											}}
											onChange={(e) =>
												update_widget(
													e.target.value,
													"nickname"
												)
											}
											value={`${nickname}`}
										/>
										{/* <Button className="!h-[35px] !leading-[12px] !w-10 !ml-1 !rounded-[4px] !px-0 !text-[16px]" onClick={e => { setNickname(searchParams.get('nickname')); }} text="S" /> */}
									</div>
								</div>
								<div className="w-full">
									<div className="truncate setting-label">
										Game
									</div>
									<Tooltip
										text="
										Currently only CS2 is supported."
									>
										<Listbox
											value={games}
											onChange={(e) => {
												update_widget(
													e.name === "true"
														? true
														: false,
													"game"
												);
												setGame(
													gameOptions[
														e.name === "true"
															? 1
															: 0
													]
												);
											}}
										>
											<ListboxButton
												disabled
												className={clsx(
													"text-[16px] flex text-left dropdown-button capitalize w-full disabled:!opacity-50"
												)}
											>
												<div className="w-full pl-[3px]">
													{games.name}
												</div>
												<div
													className="size-[20px]"
													style={{
														backgroundImage: `url(${"assets/icons/arrow-down.svg"})`,
														backgroundSize:
															"contain",
														backgroundPosition:
															"center",
														backgroundRepeat:
															"no-repeat",
													}}
												></div>
											</ListboxButton>
											<ListboxOptions
												className={clsx(
													"w-[var(--button-width)] mt-[5px] [--anchor-gap:var(--spacing-1)] focus:outline-none",
													"transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0 flex flex-col gap-[2px] overflow-hidden z-10 dropdown-menu"
												)}
												anchor="bottom"
											>
												{gameOptions.map(
													(gameOptions) => (
														<ListboxOption
															key={gameOptions.id}
															value={gameOptions}
															className="select-none text-[16px] px-[12px] py-[6px] capitalize text-left content-center dropdown-option"
															data-focus
														>
															{gameOptions.name}
														</ListboxOption>
													)
												)}
											</ListboxOptions>
										</Listbox>
									</Tooltip>
								</div>
							</div>
							<div className="section-label">Appearance</div>
							<div className="section">
								<div className="w-full">
									<div className="truncate setting-label">
										Background Color
										<Button
											onClick={(e: any) => {
												update_widget(
													"1f1f22",
													"background-color"
												);
												setBackgroundColor("1f1f22");
											}}
											className="defaults-button"
										/>
									</div>
									<div className="container flex">
										{/* <ColorPicker
												onBlur={(e: any) => {
													update_widget(
														e.target.value.replace(
															"#",
															""
														),
														"background-color"
													);
												}}
												onInput={(e: any) => {
													setBackgroundColor(
														e.target.value.replace(
															"#",
															""
														)
													);
												}}
												className="w-full"
												name="widget-background-color"
												id="background-color"
												value={`#${backgroundColor}`}
											/> */}
										<ColorPickerAlt
											default_value="#1f1f22"
											value={`#${backgroundColor}`}
										/>
									</div>
								</div>
								<div className="w-full">
									<div className="truncate setting-label">
										Text Color
									</div>
									<div className="container flex">
										<ColorPicker
											onBlur={(e: any) => {
												update_widget(
													e.target.value.replace(
														"#",
														""
													),
													"text-color"
												);
											}}
											onInput={(e: any) => {
												setTextColor(
													e.target.value.replace(
														"#",
														""
													)
												);
											}}
											className="w-full"
											name="widget-text-color"
											id="text-color"
											value={`#${textColor}`}
										/>
										<Button
											onClick={(e: any) => {
												update_widget(
													"ffffff",
													"text-color"
												);
												setTextColor("ffffff");
											}}
											className="defaults-button"
										/>
									</div>
								</div>
								<div className="setting">
									<div className="truncate setting-label">
										Border Radius
									</div>
									<div className="container flex">
										<div className="pxUnit">
											<input
												type="number"
												onInput={(e) => {
													update_widget(
														e.currentTarget.value,
														"border-radius"
													);
													setBorderRadius(
														e.currentTarget.value
													);
												}}
												className="w-full"
												name="widget-border-radius"
												id="border-radius"
												min="0"
												max="24"
												value={`${border_radius}`}
											/>
										</div>
										<Button
											onClick={(e: any) => {
												update_widget(
													"24",
													"border-radius"
												);
												setBorderRadius("24");
											}}
											className="defaults-button"
										/>
									</div>
								</div>
							</div>
							<div className="section-label">Display</div>
							<div className="section">
								<div className="setting">
									<div className="truncate setting-label gap-2 flex">
										Average KDR
									</div>
									<div className="container flex">
										<Listbox
											value={displayKD}
											onChange={(e) => {
												update_widget(
													e.name === "show"
														? true
														: false,
													"show-kd"
												);
												setDisplayKD(
													displayKDOptions[
														e.name === "show"
															? 1
															: 0
													]
												);
											}}
										>
											<ListboxButton
												className={clsx(
													"text-[16px] flex text-left dropdown-button capitalize w-full"
												)}
											>
												<div className="w-full pl-[3px]">
													{displayKD.name}
												</div>
												<div
													className="size-[20px]"
													style={{
														backgroundImage: `url(${"assets/icons/arrow-down.svg"})`,
														backgroundSize:
															"contain",
														backgroundPosition:
															"center",
														backgroundRepeat:
															"no-repeat",
													}}
												></div>
											</ListboxButton>
											<ListboxOptions
												className={clsx(
													"w-[var(--button-width)] mt-[5px] [--anchor-gap:var(--spacing-1)] focus:outline-none",
													"transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0 flex flex-col gap-[2px] overflow-hidden z-10 dropdown-menu"
												)}
												anchor="bottom"
											>
												{displayKDOptions.map(
													(displayKDOptions) => (
														<ListboxOption
															key={
																displayKDOptions.id
															}
															value={
																displayKDOptions
															}
															className="select-none text-[16px] px-[12px] py-[6px] capitalize text-left content-center dropdown-option"
															data-focus
														>
															{
																displayKDOptions.name
															}
														</ListboxOption>
													)
												)}
											</ListboxOptions>
										</Listbox>

										<Button
											onClick={(e: any) => {
												update_widget(
													"false",
													"show-kd"
												);
												setDisplayKD(
													displayKDOptions[0]
												);
											}}
											className="defaults-button"
										/>
									</div>
								</div>
								<div className="setting">
									<div className="truncate setting-label gap-2 flex">
										World Ranking
									</div>
									<div className="container flex">
										<Listbox
											value={displayRanking}
											onChange={(e) => {
												update_widget(
													e.name === "show"
														? true
														: false,
													"show-ranking"
												);
												setDisplayRanking(
													displayRankingOptions[
														e.name === "show"
															? 1
															: 0
													]
												);
											}}
										>
											<ListboxButton
												className={clsx(
													"text-[16px] flex text-left dropdown-button capitalize w-full"
												)}
											>
												<div className="w-full pl-[3px]">
													{displayRanking.name}
												</div>
												<div
													className="size-[20px]"
													style={{
														backgroundImage: `url(${"assets/icons/arrow-down.svg"})`,
														backgroundSize:
															"contain",
														backgroundPosition:
															"center",
														backgroundRepeat:
															"no-repeat",
													}}
												></div>
											</ListboxButton>
											<ListboxOptions
												className={clsx(
													"w-[var(--button-width)] mt-[5px] [--anchor-gap:var(--spacing-1)] focus:outline-none",
													"transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0 flex flex-col gap-[2px] overflow-hidden z-10 dropdown-menu"
												)}
												anchor="bottom"
											>
												{displayRankingOptions.map(
													(displayRankingOptions) => (
														<ListboxOption
															key={
																displayRankingOptions.id
															}
															value={
																displayRankingOptions
															}
															className="select-none text-[16px] px-[12px] py-[6px] capitalize text-left content-center dropdown-option"
															data-focus
														>
															{
																displayRankingOptions.name
															}
														</ListboxOption>
													)
												)}
											</ListboxOptions>
										</Listbox>

										<Button
											onClick={(e: any) => {
												update_widget(
													"false",
													"show-ranking"
												);
												setDisplayRanking(
													displayRankingOptions[0]
												);
											}}
											className="defaults-button"
										/>
									</div>
								</div>
								<div className="setting">
									<div className="truncate setting-label gap-1 flex">
										<span
											id="status"
											className="!bg-primary !py-[2px] !m-0 w-max h-min !rounded-sm text-shadow-xl"
										>
											NEW
										</span>
										Last 20 Matches Stats
									</div>
									<div className="container flex">
										<Listbox
											value={displayLastTwenty}
											onChange={(e) => {
												update_widget(
													e.name === "show"
														? true
														: false,
													"show-last-20"
												);
												setDisplayLastTwenty(
													displayLastTwentyStatsOptions[
														e.name === "show"
															? 1
															: 0
													]
												);
											}}
										>
											<ListboxButton
												className={clsx(
													"text-[16px] flex text-left dropdown-button capitalize w-full"
												)}
											>
												<div className="w-full pl-[3px]">
													{displayLastTwenty.name}
												</div>
												<div
													className="size-[20px]"
													style={{
														backgroundImage: `url(${"assets/icons/arrow-down.svg"})`,
														backgroundSize:
															"contain",
														backgroundPosition:
															"center",
														backgroundRepeat:
															"no-repeat",
													}}
												></div>
											</ListboxButton>
											<ListboxOptions
												className={clsx(
													"w-[var(--button-width)] mt-[5px] [--anchor-gap:var(--spacing-1)] focus:outline-none",
													"transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0 flex flex-col gap-[2px] overflow-hidden z-10 dropdown-menu"
												)}
												anchor="bottom"
											>
												{displayLastTwentyStatsOptions.map(
													(
														displayLastTwentyStatsOptions
													) => (
														<ListboxOption
															key={
																displayLastTwentyStatsOptions.id
															}
															value={
																displayLastTwentyStatsOptions
															}
															className="select-none text-[16px] px-[12px] py-[6px] capitalize text-left content-center dropdown-option"
															data-focus
														>
															{
																displayLastTwentyStatsOptions.name
															}
														</ListboxOption>
													)
												)}
											</ListboxOptions>
										</Listbox>

										<Button
											onClick={(e: any) => {
												update_widget(
													"false",
													"show-last-20"
												);
												setDisplayLastTwenty(
													displayLastTwentyStatsOptions[0]
												);
											}}
											className="defaults-button"
										/>
									</div>
								</div>
							</div>
						</div>
						<Status
							id="status-thingy"
							text="Copied link!"
							className="hidden"
						/>
						<Button
							className="!text-[20px] !w-full self-center !max-w-full !shadow-none"
							text="Generate Link"
							onClick={(e: any) => {
								if (document.getElementById("status-thingy")) {
									document
										.getElementById("status-thingy")!
										.classList.remove("hidden");
								}
								navigator.clipboard.writeText(
									window.location.origin +
										"/widget?" +
										searchParams
								);
							}}
						/>
					</div>

					<div className="widget-preview">
						<Image
							className="size-max blur-[0.5rem] grayscale-[0%] pointer-events-none -z-10"
							style={{
								scale: "250%",
							}}
							src="/assets/images/nuke_default_s2.jpg"
							alt="de_nuke in CS2"
							fill={true}
							objectFit="cover"
							objectPosition="center"
						/>
						<Widget
							level={level}
							elo={elo}
							avgKd={avgKD}
							displayKD={displayKDParam}
							playerRanking={playerRanking}
							displayRanking={displayRankingParam}
							displayLastTwentyMatches={
								displayLastTwentyMatchesParam
							}
							lastTwentyStats={playerLastTwentyStats}
							className="widget-2x-zoom"
							borderRadius={borderRadiusParam + "px"}
							backgroundColor={"#" + backgroundParam}
							textColor={`#${colorParam}`}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}

export default WidgetEditor;

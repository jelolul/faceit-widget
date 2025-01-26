import Image from "next/image";

export default function Widget(props: any) {
	const shouldDisplayKD = props.displayKD === "true";
	const shouldDisplayRanking = props.displayRanking === "true";

	const shouldDisplayLastTwentyMatches =
		props.displayLastTwentyMatches === "true";

	const textColor =
		String(props.textColor).replace("#", "") === "null"
			? "#ffffff"
			: props.textColor;

	const backgroundColor =
		String(props.backgroundColor).replace("#", "") === "null"
			? "#1f1f22"
			: props.backgroundColor;

	const borderRadius =
		String(props.borderRadius).replace("px", "") === "null"
			? "24"
			: props.borderRadius;

	function calculateAverages(items: any) {
		const totals: any = {};
		const counts: any = {};

		items.forEach((item: any) => {
			const stats = item.stats;

			for (const key in stats) {
				const value = parseFloat(stats[key]);

				if (!isNaN(value)) {
					totals[key] = (totals[key] || 0) + value;
					counts[key] = (counts[key] || 0) + 1;
				}
			}

			// Count wins/losses dynamically
			const result = stats.Result;
			counts[result] = (counts[result] || 0) + 1; // Increment count based on result
		});

		// Calculate averages
		const averages: any = {};
		for (const key in totals) {
			averages[key] = totals[key] / counts[key];
		}

		// Calculate win rate
		averages.winRate = (counts["1"] || 0) / items.length; // Assuming "1" indicates a win

		return averages;
	}
	const lastTwentyAverages =
		props.lastTwentyStats === undefined
			? props.lastTwentyStats
			: calculateAverages(props.lastTwentyStats.items);

	return (
		<div className={props.className + ` wrapper`}>
			<div
				id="widget"
				style={{
					backgroundColor: backgroundColor,
					borderRadius: borderRadius,
				}}
			>
				<div id="wrap">
					<Image
						id="level-pic"
						width={32}
						height={32}
						src={
							"assets/icons/skill_level/skill_level_" +
							props.level +
							".svg"
						}
						alt=""
					/>
					<p style={{ color: textColor }} id="elo">
						{props.elo}
					</p>
				</div>

				{/* Conditionally render the separator and stats div */}
				{shouldDisplayKD && (
					<>
						<div
							className={`separator border-l-[1px]`}
							style={{ borderLeftColor: textColor }}
						></div>
						<div id="stats">
							<div style={{ color: textColor }}>
								{props.avgKd || "-.--"}
							</div>
							<div style={{ color: textColor }}>KDR</div>
						</div>
					</>
				)}
				{shouldDisplayRanking && (
					<>
						<div
							className={`separator border-l-[1px]`}
							style={{ borderLeftColor: textColor }}
						></div>
						<div id="stats" className="!gap-[8px]">
							<div
								className={`flex flex-col place-items-center gap-0`}
							>
								<div
									className={`mdi--globe`}
									style={{
										backgroundImage: `url(
										"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='${encodeURIComponent(
											textColor
										)}' d='M17.9 17.39c-.26-.8-1.01-1.39-1.9-1.39h-1v-3a1 1 0 0 0-1-1H8v-2h2a1 1 0 0 0 1-1V7h2a2 2 0 0 0 2-2v-.41a7.984 7.984 0 0 1 2.9 12.8M11 19.93c-3.95-.49-7-3.85-7-7.93c0-.62.08-1.22.21-1.79L9 15v1a2 2 0 0 0 2 2m1-16A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2'/%3E%3C/svg%3E"
										)`,
									}}
								></div>
								{/* <div className="text-[12px]"><small>WORLD</small></div> */}
							</div>
							{/* <</div>div>{props.region}</div> */}
							{/* <div>Ranking</div> */}
							<div style={{ color: textColor }}>
								#{props.playerRanking}
							</div>
						</div>
					</>
				)}
			</div>
			{shouldDisplayLastTwentyMatches && (
				<>
					<div
						id="stats"
						className="!gap-[2px] flex flex-col !w-full !max-w-[300px] !items-start px-3 py-1 pt-0"
						style={{
							backgroundColor: backgroundColor,
							borderRadius: borderRadius.replace("px", "") / 2,
						}}
					>
						<div
							className={`flex flex-col place-items-center self-center gap-0`}
						>
							<div
								className={`text-[14px]`}
								style={{ color: textColor, opacity: 0.7 }}
							>
								<small>LAST 20 MATCHES</small>
							</div>
						</div>
						{/* <div>Ranking</div> */}
						<div className="flex gap-2 !self-center tracking-[0.02em]">
							<div className="">
								<div
									style={{
										color: textColor,
										fontSize: "14px",
									}}
									className="w-full text-center mb-[-3px]"
								>
									{lastTwentyAverages === undefined
										? "--"
										: (
												lastTwentyAverages["winRate"] *
												100
										  ).toFixed()}
									%
								</div>
								<div
									style={{
										color: textColor,
										fontSize: "10px",
									}}
								>
									{/* {props.playerLastTwentyStats} */}
									Win rate
								</div>
							</div>
							<div
								className={`separator self-center !h-[24px] border-l-[1px]`}
								style={{ borderLeftColor: textColor }}
							></div>
							<div className="">
								<div
									style={{
										color: textColor,
										fontSize: "14px",
									}}
									className="w-full text-center mb-[-3px]"
								>
									{lastTwentyAverages === undefined
										? "--"
										: lastTwentyAverages["Kills"].toFixed(
												1
										  )}
									{"/"}
									{lastTwentyAverages === undefined
										? "--"
										: lastTwentyAverages[
												"Headshots %"
										  ].toFixed()}
									%
								</div>
								<div
									style={{
										color: textColor,
										fontSize: "10px",
									}}
								>
									Avg. Kills / HS
								</div>
							</div>
							<div
								className={`separator self-center !h-[24px] border-l-[1px]`}
								style={{ borderLeftColor: textColor }}
							></div>
							<div className="">
								<div
									style={{
										color: textColor,
										fontSize: "14px",
									}}
									className="w-full text-center mb-[-3px]"
								>
									{lastTwentyAverages === undefined
										? "-.--"
										: lastTwentyAverages[
												"K/D Ratio"
										  ].toFixed(2)}
									{"/"}
									{lastTwentyAverages === undefined
										? "-.--"
										: lastTwentyAverages[
												"K/R Ratio"
										  ].toFixed(2)}
								</div>
								<div
									style={{
										color: textColor,
										fontSize: "10px",
									}}
								>
									Avg. K/D / K/R
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
}

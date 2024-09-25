import Image from "next/image";

const Widget = (props: any) => {
	const shouldDisplayKD = props.displayKD === "true";
	const shouldDisplayRanking = props.displayRanking === "true";

	return (
		<div id="widget" style={props.style}>
			<div id="wrap">
				<Image
					id="level-pic"
					width={32}
					height={32}
					src={props.src}
					alt=""
				/>
				<p style={props.textColor} id="elo">
					{props.elo}
				</p>
			</div>

			{/* Conditionally render the separator and stats div */}
			{shouldDisplayKD && (
				<>
					<div className="separator"></div>
					<div id="stats">
						<div>{props.avgKd}</div>
						<div>KDR</div>
					</div>
				</>
			)}
			{shouldDisplayRanking && (
				<>
					<div className="separator"></div>
					<div id="stats" className="!gap-[8px]">
						<div className="flex flex-col place-items-center gap-0">
							<div className="mdi--globe"></div>
							{/* <div className="text-[12px]"><small>WORLD</small></div> */}
						</div>
						{/* <</div>div>{props.region}</div> */}
						{/* <div>Ranking</div> */}
						<div>#{props.playerRanking}</div>
					</div>
				</>
			)}
		</div>
	);
};

export default Widget;

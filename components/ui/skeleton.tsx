import Image from "next/image";

export default function Skeleton() {
	return (
		<div className="wrapper">
			<div
				id="widget"
				style={{
					backgroundColor: "#1f1f22",
					borderRadius: "24px",
				}}
			>
				<div id="wrap">
					<div className="animate-pulse bg-white/10 ml-[3px] w-[24px] h-[24px] rounded-full" />
					<div className="animate-pulse bg-white/10 w-[40px] h-[20px] rounded-sm" />
				</div>

				<div className={`separator border-l-[1px]`}></div>
				<div id="stats">
					<div className="animate-pulse bg-white/10 w-[64px] h-[20px] rounded-sm" />
				</div>

				<div className={`separator border-l-[1px]`}></div>
				<div id="stats" className="!gap-[8px]">
					<div className={`flex flex-col place-items-center gap-0`}>
						<div
							className={`mdi--globe animate-pulse`}
							style={{
								backgroundImage: `url(
										"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='${encodeURIComponent(
											"#ffffff"
										)}' d='M17.9 17.39c-.26-.8-1.01-1.39-1.9-1.39h-1v-3a1 1 0 0 0-1-1H8v-2h2a1 1 0 0 0 1-1V7h2a2 2 0 0 0 2-2v-.41a7.984 7.984 0 0 1 2.9 12.8M11 19.93c-3.95-.49-7-3.85-7-7.93c0-.62.08-1.22.21-1.79L9 15v1a2 2 0 0 0 2 2m1-16A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2'/%3E%3C/svg%3E"
										)`,
							}}
						></div>
						{/* <div className="text-[12px]"><small>WORLD</small></div> */}
					</div>
					{/* <</div>div>{props.region}</div> */}
					{/* <div>Ranking</div> */}
					<div className="animate-pulse bg-white/10 w-[50px] h-[20px] rounded-sm" />
				</div>
			</div>
		</div>
	);
}

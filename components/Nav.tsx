"use client";

import Link from "next/link";
import Image from "next/image";
import NavButton from "@components/NavButton";
import { useEffect, useState } from "react";
import { Squeeze as Hamburger } from "hamburger-react";

const Nav = () => {
	const [isOpen, setIsOpen] = useState(false);

	function getMenuClasses() {
		let menuClasses = [];
		if (isOpen) {
			menuClasses = [
				"flex",
				"absolute",
				"top-[64px]",
				"bg-gray-200",
				"left-0",
				"outline-1",
				"outline",
				"outline-gray-300",
				"shadow-md",
				"shadow-black/50",
			];
		} else {
			menuClasses = ["hidden", "sm:flex"];
		}

		return menuClasses.join(" ");
	}

	return (
		<nav className="sticky flex w-full min-h-[64px] h-[64px] z-20 bg-gray-200 border-b-gray-300 border-b box-content shadow-nav">
			<div className="sm:hidden flex items-center">
				<button
					onClick={() => {
						setIsOpen(!isOpen);
					}}
					className="w-16 h-full flex items-center justify-center !fill-[#eee]"
				>
					<Hamburger
						toggled={isOpen}
						size={24}
						duration={0.2}
						label="Menu"
					/>
				</button>
			</div>
			<Link href="/" className="flex gap-2 flex-center">
				<Image
					src="/assets/icons/faceit-logo.svg"
					alt="FACEIT Logo"
					width={30}
					height={30}
					className="object-center object-contain px-[16px] w-16"
				/>
			</Link>
			<nav
				className={`${getMenuClasses()} sm:shadow-none w-full h-max sm:outline-none sm:bg-transparent sm:static flex-col sm:flex-row sm:min-h-[64px] sm:h-[64px] z-20 box-content`}
			>
				<NavButton href="/" text="Home" />
				<NavButton
					href="/widget-editor"
					text={
						<span>
							Widget Editor
							{/* <span id="status" className="absolute">
								BETA
							</span> */}
						</span>
					}
				/>
				{/* <NavButton href="/news" text="News" /> */}
				<Link
					href="https://github.com/jelolul/faceit-widget/"
					className="flex flex-center github-logo sm:w-16 sm:!ml-auto px-8 py-4 sm:p-0 w-full gap-2 uppercase text-[14px] font-bold items-center hover:bg-gray-300/50 sm:hover:bg-transparent"
				>
					<Image
						src="/assets/icons/github-mark-white.svg"
						alt="GitHub Logo"
						width={32}
						height={32}
						className="object-contain sm:px-[16px] w-[16px] sm:w-14"
					/>
					GitHub
				</Link>
			</nav>
		</nav>
	);
};

export default Nav;

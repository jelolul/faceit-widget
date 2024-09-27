import Link from "next/link";
import { usePathname } from "next/navigation";

const NavButton = (props: any) => {
	const pathname = usePathname();

	return (
		<div
			className={`${
				props.className || ""
			} mt-[2px] flex relative uppercase text-[14px] hover:bg-gray-300/50 sm:hover:bg-transparent font-bold hover:text-color-primary ${
				pathname == props.href
					? "text-color-primary sm:bg-transparent"
					: "text-color-secondary sm:bg-transparent"
			}`}
		>
			<div className="flex h-full w-full sm:w-max self-center">
				<Link
					className="px-8 py-4 sm:px-5 w-full sm:w-max sm:pt-5 text-nowrap"
					href={props.href}
				>
					{props.text}
				</Link>
			</div>
			<div
				className={`sm:block hidden absolute bottom-[0%] left-[50%] translate-x-[-50%] h-[2px] w-[50%] rounded-t-[24px] ${
					pathname == props.href ? "bg-primary" : "bg-transparent"
				}`}
			></div>
		</div>
	);
};

export default NavButton;

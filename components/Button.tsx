import Link from "next/link";

const Button = (props: any) => {
	return (
		<a
			href={props.href}
			onClick={props.onClick}
			className={`select-none text-[28px] text-shadow-xl shadow-[0px_0px_30px_0px_rgba(255,85,0,0.24)] rounded-[8px] uppercase bg-primary leading-[32px] font-bold text-center w-max h-[56px] px-[24px] py-[12px] hover:bg-[#ff6c20] hover:cursor-pointer hover:shadow-[0px_0px_30px_0px_rgba(255,85,0,0.5)] ${props.className}`}
		>
			{props.text}
		</a>
	);
};

export default Button;

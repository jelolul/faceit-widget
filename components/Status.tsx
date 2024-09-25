import React from "react";

const Status = (props: any) => {
	return (
		<div
			id={props.id}
			className={`w-full bg-[#65ff6d1f] rounded-[4px] p-[8px] text-color-[#5bff632a] border border-[#65ff6c] ${props.className}`}
		>
			<div className="text-color-green">{props.text}</div>
		</div>
	);
};

export default Status;

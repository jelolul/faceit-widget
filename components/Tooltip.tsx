import React, { useState } from "react";
import "@styles/globals.css";

const Tooltip = ({ text, children }: any) => {
	const [showTooltip, setShowTooltip] = useState(false);

	return (
		<div
			className="tooltip-container"
			onMouseEnter={() => setShowTooltip(true)}
			onMouseLeave={() => setShowTooltip(false)}
		>
			{children}
			<div className={`tooltip ${showTooltip ? "open" : ""}`}>
				{text}
				<div className="arrow" />
			</div>
		</div>
	);
};

export default Tooltip;

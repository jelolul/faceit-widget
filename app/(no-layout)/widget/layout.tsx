import "@styles/globals.css";
import { Suspense } from "react";

export const metadata = {
	metadataBase: new URL("https://faceit-widget.vercel.app"),
	title: "FACEIT Widget",
	description:
		"Displays your FACEIT level and ELO on supported games in a customizable widget.",
	icons: {
		icon: "/assets/icons/favicon.svg",
	},
	openGraph: {
		url: "https://faceit-widget.vercel.app/",
		title: "FACEIT Widget",
		description:
			"Displays your FACEIT level and ELO on supported games in a customizable widget.",
		type: "website",
		siteName: "FACEIT Widget",
		images: [
			{
				url: "/assets/images/faceit-widget-social.png",
				secureUrl: "/assets/images/faceit-widget-social.png",
				width: 1200,
				height: 630,
				alt: 'FACEIT Logo, next to it text that says "FACEIT Widget"',
			},
		],
	},
};

const WidgetLayout = ({ children }: any) => {
	return (
		<html>
			<body>
				<Suspense>{children}</Suspense>
			</body>
		</html>
	);
};

export default WidgetLayout;

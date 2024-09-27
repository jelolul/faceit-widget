import { Html, Head, Main, NextScript } from "next/document";
import { Suspense } from "react";
import Loading from "../(main)/loading";

export default function Document() {
	return (
		<Html lang="en">
			<body>
				<script>0</script>
				<Suspense fallback={<Loading />}>
					<Main />
				</Suspense>
				<NextScript />
			</body>
		</Html>
	);
}

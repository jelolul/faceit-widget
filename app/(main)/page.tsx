import Button from "@components/Button";
import Image from "@node_modules/next/image";

const Home = () => {
	return (
		<section className="section-thing before:blur-[0px] box-content w-full flex h-full flex-center justify-center items-center flex-col *:mx-16">
			{/* <h1 className="sm:text-6xl text-4xl font-bold text-center text-shadow shadow-black">
        FACEIT Widget
      </h1> */}
			<Image
				className="pointer-events-none -z-10 !w-max !h-max !static !mb-[-32px]"
				src="/assets/icons/faceit-widget-logo.svg"
				alt="FACEIT Widget Logo"
				fill={true}
				objectPosition="center"
			/>
			<p className="sm:pt-5 pt-3 px-16 sm:text-lg text-sm text-center text-shadow shadow-black">
				Displays your FACEIT level and ELO on supported games in a
				customizable widget.
			</p>
			<Button
				className="sm:mt-8 mt-4 sm:scale-100 scale-[80%]"
				href="widget-editor"
				text="Build a Widget"
			/>
		</section>
	);
};

export default Home;

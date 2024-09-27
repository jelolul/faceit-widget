import Link from "next/link";
import { ArrowLeftIcon, LinkIcon } from "@heroicons/react/24/solid";
import { FaXTwitter, FaTwitch } from "react-icons/fa6";
import { getArticleData } from "@/lib/articles";
import Markdown from "react-markdown";
import Loading from "../../loading";
import { Suspense } from "react";
import rehypeRaw from "rehype-raw";
import { Metadata, ResolvingMetadata } from "next";

// export async function generateMetadata(
// 	{ params }: { params: { slug: string } },
// 	parent: ResolvingMetadata
// ): Promise<Metadata> {
// 	const articleData = await getArticleData(params.slug);
// 	// read route params
// 	// const id = articleData.id;

// 	// fetch data
// 	// const product = await fetch(`https://.../${id}`).then((res) => res.json());

// 	// optionally access and extend (rather than replace) parent metadata
// 	// const previousImages = (await parent).openGraph?.images || [];

// 	return {
// 		title: `${articleData.title}`,
// 		description: `${articleData.description}`,
// 		openGraph: {
// 			title: `${articleData.title}`,
// 			description: `${articleData.description}`,
// 			images: ["assets/images/social.png"],
// 			siteName: "Overwatch Widget",
// 			url: `/news/${articleData.id}`,
// 		},
// 	};
// }

const Article = async ({ params }: { params: { slug: string } }) => {
	const articleData = await getArticleData(params.slug);

	return (
		<Suspense fallback={<Loading />}>
			<div className="overflow-y-auto mt-3 size-full pb-[40px] select-text">
				<section className="m-[0_auto_50px] px-[15px] max-w-[840px] mt-2 gap-3 box-border">
					<div className="flex justify-between mb-[15px] border-b border-b-1 pb-[15px] border-gray-300">
						<Link
							href={"/news"}
							className="flex flex-row gap-1 place-items-center rounded-[2px] uppercase font-bold text-center content-center hover:z-[1] active:z-[1] primary-alt-button p-[10px]"
						>
							<ArrowLeftIcon width={20} />
							<p>Back</p>
						</Link>
					</div>
					<div className="text-sm text-nowrap text-primary w-full font-bold uppercase text-center">
						{articleData.category}
					</div>
					<p className="text-center text-sm py-[2px] text-[#b6b6b6] rounded-[4px]">
						{articleData.date.toString()}
					</p>
					<div className="text-center text-2xl font-bold uppercase">
						{articleData.title}
					</div>
					<div className="text-center pt-[5px] pb-[10px]">
						{articleData.description}
					</div>
					<div className="justify-center text-1xl font-bold uppercase pb-[15px] flex border-b-1 border-b border-gray-300 gap-[10px]">
						by {articleData.author}
						<div className="flex flex-col items-center">
							<div className="flex">
								<Link
									target="_blank"
									rel="noopener noreferrer"
									href={`https://x.com/${articleData.author}`}
									className="flex flex-row gap-1 place-items-center rounded-[3px] bg-white hover:bg-neutral-300 ml-[4px] px-[5px] py-[5px] w-max"
								>
									<FaXTwitter size={"16px"} color="black" />
								</Link>
								<Link
									target="_blank"
									rel="noopener noreferrer"
									href={`https://twitch.tv/${articleData.author}`}
									className="flex flex-row gap-1 place-items-center rounded-[3px] bg-[#9146ff] hover:bg-[#a970ff] ml-[4px] px-[5px] py-[5px] w-max"
								>
									<FaTwitch size={"16px"} color="white" />
								</Link>
							</div>
						</div>
					</div>
					<Markdown
						rehypePlugins={[rehypeRaw]}
						className="article whitespace-pre-wrap"
					>
						{articleData.contentHtml}
					</Markdown>
					{/* <div id="separator"></div> */}
				</section>
			</div>
		</Suspense>
	);
};

export default Article;

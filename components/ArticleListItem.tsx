import Link from "next/link";
import type { ArticleItem } from "@/types";

interface Props {
	articles: ArticleItem[];
}

const ArticleItemList = ({ articles }: Props) => {
	return (
		<div className="flex flex-col gap-5  text-left">
			<div className="gap-[20px] lg:w-[50%] w-[100%] self-center flex flex-col">
				{articles.map((article, id) => (
					<Link
						href={`/news/${article.id}`}
						key={id}
						className="bg-gray-200 outline-1 outline outline-gray-300 hover:outline-[#454545] text-white hover:bg-[#313131] p-[20px] hover:scale-[1.01] rounded-sm transition-background duration-75"
					>
						<div className="text-sm text-nowrap text-primary w-min font-bold uppercase">
							{article.category}
						</div>
						<div className="text-sm w-max py-[2px] text-[#a0a0a0] rounded-[4px]">
							{article.date}
						</div>
						<div className="font-medium text-2xl">
							{article.title}
						</div>
						<div className="text-lg opacity-[0.9]">
							{article.description}
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default ArticleItemList;

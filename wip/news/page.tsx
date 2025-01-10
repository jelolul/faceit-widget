"use client";
import React, { useEffect, useState } from "react";
import ArticleItemList from "@/components/ArticleListItem";
import Loading from "../../app/(main)/loading";

export default function ReleaseNotes() {
	const [articles, setArticles] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchArticles = async () => {
		setLoading(true);
		setError(null);
		try {
			const res = await fetch("/api/news");
			if (!res.ok) {
				throw new Error(`HTTP error! Status: ${res.status}`);
			}
			const data = await res.json();
			setArticles(data);
		} catch (error: any) {
			console.error("Error fetching articles: ", error);
			setError("Failed to load articles. Please try again later.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchArticles();
		const intervalId = setInterval(() => {
			fetchArticles();
		}, 60000);

		return () => clearInterval(intervalId);
	}, []);

	if (loading) {
		return <Loading />;
	}

	if (error) {
		return <p className="m-auto">{error}</p>;
	}

	// Filter out future articles
	const publishedArticles = articles.filter((article) => !article.isFuture);

	return (
		<div className="size-full lg:mt-10  mt-20 text-2xl">
			<section className="mx-auto w-11/12 flex flex-col gap-12 my-[0.5em]">
				<header className="font-bold text-[2em] text-white text-center">
					News
				</header>
				<span className="border-b-1 border-gray-300 border-b w-[50%] h-[1px] self-center"></span>
				<section className="flex flex-col gap-4 self-center w-full text-center">
					{publishedArticles.length > 0 ? (
						<ArticleItemList articles={publishedArticles} />
					) : (
						<p>No articles available!</p>
					)}
				</section>
			</section>
		</div>
	);
}

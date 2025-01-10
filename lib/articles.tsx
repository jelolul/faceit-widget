import fs from "fs";
import path from "path";
import Markdown from "react-markdown";
import moment from "moment-timezone";
import { remark } from "remark";
import html from "remark-html";

import type { ArticleItem } from "@/types";
import Article from "@wip/news/[slug]/page";

const articlesDirectory = path.join(process.cwd(), "articles");

// Function to recursively read files from a directory
const readFilesRecursively = (directory: string): string[] => {
	let results: string[] = [];
	const list = fs.readdirSync(directory);

	list.forEach((file) => {
		const fullPath = path.join(directory, file);
		const stat = fs.statSync(fullPath);

		if (stat && stat.isDirectory()) {
			// Recursively read subdirectories
			results = results.concat(readFilesRecursively(fullPath));
		} else if (path.extname(file) === ".md") {
			// Collect Markdown files
			results.push(fullPath);
		}
	});

	return results;
};

const getSortedArticles = (): ArticleItem[] => {
	const filePaths = readFilesRecursively(articlesDirectory);

	if (filePaths.length === 0) {
		return [];
	}

	const allArticlesData: ArticleItem[] = filePaths
		.map((fullPath) => {
			const relativePath = path.relative(articlesDirectory, fullPath);
			const slug = relativePath.replace(/\.md$/, "").replace(/\\/g, "/");

			try {
				const fileContents = fs.readFileSync(fullPath, "utf8");

				const lines = fileContents.split("\n");
				let metadata: Record<string, any> = {};
				let content = "";

				if (lines[0].startsWith("---")) {
					let inMetadata = true;
					lines.shift();
					while (inMetadata && lines.length > 0) {
						const line = lines.shift();
						if (line?.startsWith("---")) {
							inMetadata = false;
						} else if (line) {
							const [key, ...value] = line.split(":");
							metadata[key.trim()] = value.join(":").trim();
						}
					}
				}

				content = lines.join("\n");

				const format = "MM/DD/YYYY h:mm:ssA";
				const publicationDate = moment(metadata.date, format);
				const now = moment();

				// Skip the article if its publication date is in the future
				if (publicationDate.isAfter(now)) {
					return null;
				}

				return {
					id: slug,
					title: metadata.title || "Untitled",
					author: metadata.author || "Unknown",
					description: metadata.description || "No description",
					date: metadata.date || "Unknown date",
					category: metadata.category || "Uncategorized",
				};
			} catch (error) {
				console.error(`Error reading file ${fullPath}:`, error);
				return null;
			}
		})
		.filter((article): article is ArticleItem => article !== null);

	return allArticlesData.sort((a, b) => {
		const format = "MM/DD/YYYY h:mm:ssA";
		const dateTimeOne = moment(a.date, format);
		const dateTimeTwo = moment(b.date, format);

		if (dateTimeOne.isBefore(dateTimeTwo)) return 1;
		if (dateTimeOne.isAfter(dateTimeTwo)) return -1;
		if (a.id < b.id) return -1;
		if (a.id > b.id) return 1;

		return 0;
	});
};

export const getCategorizedArticles = (): Record<string, ArticleItem[]> => {
	const sortedArticles = getSortedArticles();
	const categorizedArticles: Record<string, ArticleItem[]> = {};

	sortedArticles.forEach((article) => {
		if (!categorizedArticles[article.category]) {
			categorizedArticles[article.category] = [];
		}
		categorizedArticles[article.category].push(article);
	});

	return categorizedArticles;
};

export const sortedArticles = () => {
	return getSortedArticles();
};

export const getArticleData = async (slug: string) => {
	const filePaths = readFilesRecursively(articlesDirectory);
	const fullPath = filePaths.find((filePath) => {
		const relativePath = path.relative(articlesDirectory, filePath);
		const fileSlug = relativePath.replace(/\.md$/, "").replace(/\\/g, "/");
		return fileSlug === slug;
	});

	if (!fullPath) {
		throw new Error(`Article with slug ${slug} not found`);
	}

	try {
		const fileContents = fs.readFileSync(fullPath, "utf-8");

		const lines = fileContents.split("\n");
		let metadata: Record<string, any> = {};
		let content = "";

		if (lines[0].startsWith("---")) {
			let inMetadata = true;
			lines.shift();
			while (inMetadata && lines.length > 0) {
				const line = lines.shift();
				if (line?.startsWith("---")) {
					inMetadata = false;
				} else if (line) {
					const [key, ...value] = line.split(":");
					metadata[key.trim()] = value.join(":").trim();
				}
			}
		}

		content = lines.join("\n");

		const format = "MM/DD/YYYY h:mm A z";
		const publicationDate = moment.tz(
			metadata.date || "Unknown date",
			format,
			"Europe/London"
		);
		const now = moment();

		// Return an error or handle the redirect if the publication date is in the future
		if (publicationDate.isAfter(now)) {
			throw new Error(`Article with slug ${slug} is not yet published`);
		}
		return {
			id: slug,
			contentHtml: content,
			title: metadata.title || "Untitled",
			author: metadata.author || "Unknown",
			description: metadata.description || "No description",
			category: metadata.category || "Uncategorized",
			date: publicationDate.format("MMMM Do YYYY | h:mm A z"),
		};
	} catch (error) {
		console.error(`Error reading or processing file ${fullPath}:`, error);
		throw new Error(`Error processing article with slug ${slug}`);
	}
};

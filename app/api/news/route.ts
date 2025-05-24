// app/api/news/route.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import moment from "moment";
export const runtime = 'edge';

// Define the path to the directory containing Markdown files
const postsDirectory = path.join(process.cwd(), "articles");

export async function GET() {
	try {
		// Read all file names from the posts directory
		const fileNames = fs.readdirSync(postsDirectory);

		// Define the date format for sorting
		const dateFormat = "MM/DD/YYYY h:mm:ssA";

		// Process each file
		const allPostsData = fileNames.map((fileName) => {
			// Extract the slug (ID) by removing the file extension
			const id = fileName.replace(/\.md$/, "");

			// Read the file content
			const fullPath = path.join(postsDirectory, fileName);
			const fileContents = fs.readFileSync(fullPath, "utf8");

			// Parse the Markdown file content using gray-matter
			const { content, data: metadata } = matter(fileContents);

			// Parse and format publication date
			const publicationDate = moment(metadata.date, dateFormat);

			// Format the metadata and content
			return {
				id,
				title: metadata.title || "Untitled",
				author: metadata.author || "Unknown",
				contentHtml: content, // Markdown content as HTML
				description: metadata.description || "No description",
				category: metadata.category || "Uncategorized",
				date: publicationDate.format("MMMM Do YYYY | h:mm A z"), // Format date
			};
		});

		// Sort posts by date and ID
		const sortedPostsData = allPostsData.sort((a, b) => {
			const dateTimeOne = moment(a.date, "MMMM Do YYYY | h:mm A z");
			const dateTimeTwo = moment(b.date, "MMMM Do YYYY | h:mm A z");

			if (dateTimeOne.isBefore(dateTimeTwo)) return 1;
			if (dateTimeOne.isAfter(dateTimeTwo)) return -1;
			if (a.id < b.id) return -1;
			if (a.id > b.id) return 1;

			return 0;
		});

		// Return the sorted posts data as JSON
		return new Response(JSON.stringify(sortedPostsData), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		console.error("Error fetching posts:", error);
		return new Response("Internal Server Error", { status: 500 });
	}
}

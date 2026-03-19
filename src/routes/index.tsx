import { createFileRoute, Link } from "@tanstack/react-router";
import { marked } from "marked";
import z from "zod";
import { readMd } from "#/utils";

export const Route = createFileRoute("/")({
	loaderDeps: ({ search }) => search,
	loader: async ({ deps: { slug = "post1" } }) => {
		const basePath = "src/data";

		const html = await readMd({
			data: { filePath: [basePath, `${slug}.md`] },
		}).then(marked);

		return { html };
	},
	validateSearch: z.object({
		slug: z.string().optional(),
	}),
	component: App,
});

function App() {
	const { html } = Route.useLoaderData();

	return (
		<main className="page-wrap px-4 pb-8 pt-14">
			<div className="space-x-4">
				<Link to="/" search={{ slug: "post1" }}>
					Post 1
				</Link>
			</div>

			<div
				className="prose border rounded-2xl bg-cyan-800 prose-p:text-white prose-headings:text-white"
				dangerouslySetInnerHTML={{ __html: html }}
			/>
		</main>
	);
}

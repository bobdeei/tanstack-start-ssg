import fs from "node:fs/promises";
import path from "node:path";
import { createServerFn } from "@tanstack/react-start";

export const readMd = createServerFn()
	.inputValidator((data: { filePath: string[] }) => data)
	.handler(async ({ data: { filePath } }) => {
		return fs.readFile(path.join(path.resolve(), ...filePath), "utf-8");
	});

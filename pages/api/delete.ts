// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import * as fs from "fs/promises";
import * as path from "path";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string[]>
) {
  if (req.method === "POST") {
    console.log(process.cwd());
    const filepath = path.join(process.cwd(), "data", "fotos.json");
    const filepathDelete = path.join(process.cwd(), "data", "delete.json");
    const showData: string[] = JSON.parse(await fs.readFile(filepath, "utf8"));
    const dataDelete: string[] = JSON.parse(
      await fs.readFile(filepathDelete, "utf8")
    );
    const newDeletedPix = dataDelete.concat(req.body);

    fs.writeFile(filepathDelete, JSON.stringify(newDeletedPix));

    const shuffledPix = showData
      .filter((data: string) => !newDeletedPix.includes(data))
      .sort(() => 0.5 - Math.random());

    res.status(200).json(shuffledPix);
  }
}

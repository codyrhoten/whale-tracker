// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const apiKey = process.env.ALCHEMY_KEY;
  const owner = "vitalik.eth";
  const pageSize = 100;

  if (!apiKey) {
    res.status(200).json({ error: "No API key provided" });
  }

  if (!owner) {
    res.status(200).json({ error: "No owner provided" });
  }

  try {
    const response = await axios.get(
      `https://eth-mainnet.g.alchemy.com/nft/v2/${apiKey}/getContractsForOwner?owner=${owner}&pageSize=${pageSize}&withMetadata=true`
    );
    const { data } = response;
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json(e as Error);
  }
}

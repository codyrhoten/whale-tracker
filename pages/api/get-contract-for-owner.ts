// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type Data = {
  name?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const apiKey = process.env.ALCHEMY_KEY;
  const { address } = req.body;

  try {
    const response = await axios.get(
      `https://eth-mainnet.g.alchemy.com/nft/v2/${apiKey}/getContractsForOwner?owner=${address}&pageSize=100&withMetadata=true`
    );
    const { data } = response;
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json(e as Error);
  }
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

type Data = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const options = { method: 'GET', headers: { accept: 'application/json' } };
    const apiKey = process.env.ALCHEMY_KEY;

    try {
        const response = await axios.get(`https://eth-mainnet.g.alchemy.com/nft/v2/${apiKey}/getContractsForOwner?owner=vitalik.eth&pageSize=100&withMetadata=true`, options)
        const { data } = response;
        res.status(200).json(data)
    } catch (err) {
        console.log(err);
        // @ts-ignore
        res.status(500).json(err)
    }
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

type ContractData = {
    address: string;
    contractDeployer: string;
    deployedBlockNumber: number;
    name: string;
    symbol: string;
    totalBalance: number;
};

type Data = {
    contracts: ContractData[];
    owner: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const options = { method: 'GET', headers: { accept: 'application/json' } };
    const apiKey = process.env.ALCHEMY_KEY;
    const walletAddress = "vitalik.eth"

    try {
        const response = await axios.get(`https://eth-mainnet.g.alchemy.com/nft/v2/${apiKey}/getContractsForOwner?owner=${walletAddress}&pageSize=100&withMetadata=true`, options)
        const { data } = response;
        res.status(200).json({ contracts: data.contracts, owner: walletAddress });
    } catch (err) {
        console.log(err);
        // @ts-ignore
        res.status(500).json(err);
    }
}

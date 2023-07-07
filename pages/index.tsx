import { useEffect, useState } from "react"
import ContractDataTable from "@/components/ContractDataTable";

type ContractData = {
    owner: string;
    contracts: {
        address: string;
        contractDeployer: string;
        deployedBlockNumber: number;
        name: string;
        symbol: string;
        totalBalance: number;
    }[];
};

export default function Home() {
    const [contractData, setContractData] = useState<ContractData>({ owner: "", contracts: [] });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/get-contract-for-owner");
                const data = await response.json();
                console.log('contract data', data);
                setContractData(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData(); // Call the async function to initiate the fetch request

        // Cleanup function (optional)
        return () => {
            // Perform any necessary cleanup here (e.g., cancel any pending requests)
        };
    }, []);

    return (
        <>
            <ContractDataTable contractData={contractData} />
        </>
    )
}

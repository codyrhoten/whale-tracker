import { useState, ChangeEvent } from "react";
import ContractDataTable from "@/components/ContractDataTable";
import WalletInputForm from "@/components/WalletInputForm";

type ContractData = {
    address: string;
    contractDeployer: string;
    deployedBlockNumber: number;
    name: string;
    symbol: string;
    totalBalance: number;
};

export default function Home() {
    const [contractData, setContractData] = useState<ContractData[]>([]);
    const [error, setError] = useState("");

    const handleSetContractData = (data: any) => {
        setContractData(data);
    };

    return (
        <>
            <WalletInputForm
                setContractData={handleSetContractData}
                error={error}
                setError={setError}
            />
            {
                Object.values(contractData).length > 0 &&
                <ContractDataTable contractAddresses={contractData} />
            }
        </>
    );
}

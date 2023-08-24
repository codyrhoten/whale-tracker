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
    const [address, setAddress] = useState("");
    const [error, setError] = useState("");

    const handleSetContractData = (data: any) => {
        setContractData(data);
    };

    const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value);
        setError("");
    };

    return (
        <>
            <WalletInputForm
                address={address}
                setContractData={handleSetContractData}
                handleAddressChange={handleAddressChange}
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

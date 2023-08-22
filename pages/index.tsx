import { useRef, useState, ChangeEvent } from "react";
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
    const address = useRef("");
    const [error, setError] = useState("");

    const handleSetContractData = (data: any) => {
        setContractData(data);
    };

    // CHANGE THIS TO SIMPLY UPDATE THE ADDRESS STATE TO THE VALUE WITHIN THE INPUT FIELD
    // CURRENTLY IT UPDATES WHEN THE SWITCH IS CLICKED ONLY BY THE LAST TYPED KEY BEFORE IT WAS CLICKED
    const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
        address.current = e.target.value;
    };

    return (
        <>
            <WalletInputForm
                address={address}
                setContractData={handleSetContractData}
                onAddressChange={handleAddressChange}
                error={error}
                setError={setError}
            />
            {
                Object.values(contractData).length > 0 &&
                <ContractDataTable contractAddresses={contractData} />
            }
            {
                error !== "" &&
                Object.values(contractData).length === 0 &&
                <p style={{ textAlign: "center", marginTop: "2rem" }}>This address doesn't own a contract.</p>
            }
        </>
    );
}

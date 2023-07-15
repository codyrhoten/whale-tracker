import { useEffect, useState } from "react";
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
        console.log(data);

        setContractData(data);
    };
    // const [tableData, setTableData] = useState({});

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch("/api/get-contract-for-owner", {
    //                 method: "POST",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 },
    //                 body: JSON.stringify({ address: "vitalik.eth" }),
    //             });
    //             const data = await response.json();
    //             console.log("contract data", data);
    //             setContractData(data.contracts);
    //         } catch (error) {
    //             console.error("Error fetching data:", error);
    //         }
    //     };

    //     fetchData(); // Call the async function to initiate the fetch request

    //     // Cleanup function (optional)
    //     return () => {
    //         // Perform any necessary cleanup here (e.g., cancel any pending requests)
    //     };
    // }, []);

    return (
        <>
            <WalletInputForm setContractData={handleSetContractData} address={address} error={error} setAddress={setAddress} setError={setError} />
            {Object.values(contractData).length && (
                <ContractDataTable contractAddresses={contractData} />
            )}
        </>
    );
}

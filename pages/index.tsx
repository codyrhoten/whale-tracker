import { useEffect } from "react"
import WalletInputForm from "@/components/WalletInputForm";

export default function Home() {
    const handleSubmit = (address: string) => {
        // Handle the submitted Ethereum address here
        console.log("Submitted address:", address);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/get-contract-for-owner");
                const data = await response.json();
                // Process the retrieved data here
                console.log(data);
            } catch (error) {
                // Handle any errors that occurred during the fetch request
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
            <WalletInputForm onSubmit={handleSubmit} />
        </>
    )
}

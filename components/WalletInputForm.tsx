import { ChangeEvent, FormEvent, useState } from "react";
import { useWalletContext } from "@/contexts/WalletContext";
import { createStyles, TextInput, Button, Container, Switch } from "@mantine/core";
import { ethers } from "ethers";
import axios from "axios";

type ContractData = {
    address: string;
    contractDeployer: string;
    deployedBlockNumber: number;
    name: string;
    symbol: string;
    totalBalance: number;
};

const useStyles = createStyles((theme) => ({
    input: {
        marginTop: theme.spacing.md,
        marginBottom: "1.5rem",
    },
    error: {
        color: theme.colors.red[7],
    },
}));

export default function WalletInputForm({
    setContractData,
    error,
    setError
}: {
    error: string;
    setError: (error: string) => void;
    setContractData: (contractData: ContractData[]) => void;
}) {
    const walletContext = useWalletContext();
    const [address, setAddress] = useState("");
    const [checked, setChecked] = useState(false);
    const alchemyApiKey = process.env.NEXT_PUBLIC_ALCHEMY_KEY;
    const provider = new ethers.providers.AlchemyProvider("mainnet", alchemyApiKey);

    const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value);
        setError("");

        if (checked) {
            setChecked(false);
        }
    };

    const isValidENSAddress = async (address: string) => {
        try {
            const resolvedAddress = await provider.resolveName(address);
            if (!resolvedAddress) return false;
            return ethers.utils.isAddress(resolvedAddress);
        } catch (error) {
            console.error("Error validating ENS address:", error);
            return false;
        }
    };

    const validateWalletAddress = async (address: string): Promise<boolean> => {
        let isValidAddress = false;

        if (address.startsWith("0x")) {
            const isValid = ethers.utils.isAddress(address);

            if (isValid) isValidAddress = true;
        }

        if (!address.startsWith("0x")) {
            const isValid = await isValidENSAddress(address);

            if (isValid) isValidAddress = true;
        }

        return isValidAddress;
    };

    const handleSwitchChange = () => {
        if (checked) {
            setAddress(walletContext?.connectedWalletAddress || "");
        } else {
            setAddress("");
        }

        setChecked(!checked);
        setError("");
    };


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const isValid = await validateWalletAddress(address);

        if (!isValid) {
            setError("Invalid Ethereum address");
            setContractData([]);
            return;
        }

        if (!address) {
            setError("Please enter an Ethereum address");
            setContractData([]);
            return;
        }

        try {
            const response = await axios.post(
                "/api/get-contract-for-owner",
                { address },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
            const { data } = response;
            console.log("data", data)

            if (data.error) {
                setError(data.error);
                setContractData([])
            } else {
                setContractData(data.contracts);
                setError("");
            }
        } catch (err) {
            setError("An error occurred.");
            setContractData([]);
        }
    };

    const { classes } = useStyles();

    return (
        <Container>
            <form onSubmit={handleSubmit}>
                {
                    walletContext?.connectedWalletAddress &&
                    <Switch
                        label="Auto-fill with your connected wallet address"
                        radius="lg"
                        checked={checked}
                        onChange={handleSwitchChange}
                    />
                }
                <div style={{ minHeight: "1rem", maxHeight: "1rem", marginTop: "0.25rem", }}>
                    {error && <div className={classes.error}>{error}</div>}
                </div>
                <TextInput
                    value={checked ? walletContext?.connectedWalletAddress : address}
                    onChange={handleAddressChange}
                    placeholder="Enter Ethereum address"
                    className={classes.input}
                />
                <Button type="submit" variant="outline" fullWidth>
                    Submit
                </Button>
            </form>
        </Container>
    );
}
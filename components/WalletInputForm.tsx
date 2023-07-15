import { useState, ChangeEvent, FormEvent } from "react";
import { createStyles, TextInput, Button, Container } from "@mantine/core";
import { ethers, providers } from "ethers";
import { useForm } from "@mantine/form";
import axios from "axios";

const useStyles = createStyles((theme) => ({
    input: {
        marginTop: theme.spacing.md,
        marginBottom: "1.5rem",
    },
    error: {
        color: theme.colors.red[7],
    },
}));

export default function WalletInputForm({ setContractData, address, error, setAddress, setError }: {
    address: string;
    setAddress: (address: string) => void;
    error: string;
    setError: (error: string) => void;
    setContractData: (error: string) => void;
}) {

    console.log('address', address);

    const alchemyApiKey = process.env.NEXT_PUBLIC_ALCHEMY_KEY;
    const provider = new ethers.providers.AlchemyProvider("mainnet", alchemyApiKey);

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

    const form = useForm({
        initialValues: {
            address: "",
        },
        validate: {
            address: async (value) => {
                const isValid = await validateWalletAddress(value);
                if (!isValid) {
                    return "Invalid Ethereum address";
                }
            },
        },
    });

    const { errors, reset, isValid, setValues } = form;

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        console.log('handleSubmit');

        /* if (!address) {
            setError("Please enter an Ethereum address");
            return;
        }

        if (!isValid()) {
            setError(errors.address?.toString() || "Invalid Ethereum address.");
            return;
        } */

        console.log('1');

        try {
            const response = await fetch("/api/get-contract-for-owner", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ address }),
            });
            const data = await response.json();
            console.log('data', data)

            if (data.error) {
                setError(data.error);
            } else {
                setContractData(data.contracts);
                reset();
                setError("");
            }
        } catch (err) {
            setError("An error occurred.");
        }
    };

    const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value);
        setError("");
        setValues({ address: e.target.value });
    };

    const { classes } = useStyles();

    return (
        <Container>
            <form onSubmit={handleSubmit}>
                {error && <div className={classes.error}>{error}</div>}
                <TextInput
                    value={address}
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

import { useState, FormEvent } from "react";
import { createStyles, Input, Button } from "@mantine/core";
import { ethers } from "ethers";

const useStyles = createStyles((theme) => ({
    formContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
    form: {
        width: '50%',
        maxWidth: '500px',
    },
    input: {
        marginTop: theme.spacing.md,
        marginBottom: "1.5rem",
    },
}));

interface FormProps {
    onSubmit: (address: string) => void;
}

export default function WalletInputForm({ onSubmit }: FormProps) {
    const [address, setAddress] = useState("");
    const [error, setError] = useState<string | null>(null);
    const { classes } = useStyles();

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        if (!ethers.isAddress(address)) {
            setError("Invalid Ethereum address");
            return;
        }

        onSubmit(address);
        setAddress("");
        setError(null);
    };

    return (
        <div className={classes.formContainer}>
            <form onSubmit={handleSubmit} className={classes.form}>
                <Input
                    value={address}
                    onChange={(event) => setAddress(event.currentTarget.value)}
                    placeholder="Enter Ethereum address"
                    error={error}
                    required
                    className={classes.input}
                />
                <Button
                    type="submit"
                    variant="outline"
                    fullWidth
                >
                    Submit
                </Button>
            </form>
        </div>
    );
};
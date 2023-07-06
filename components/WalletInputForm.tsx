import { ChangeEvent } from "react";
import { createStyles, TextInput, Button } from "@mantine/core";
import { ethers } from "ethers";
import { useForm } from "@mantine/form";

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
    error: {
        color: theme.colors.red[7],
    }
}));

interface FormProps {
    onSubmit: (address: string) => void;
}

export default function WalletInputForm({ onSubmit }: FormProps) {
    const form = useForm({
        initialValues: {
            address: "",
        },
        validate: {
            address: (value) => ethers.isAddress(value) ? null : "Invalid Ethereum address",
        },
    });

    const { values, errors, setValues, reset, isValid } = form;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const handleSubmit = () => {
        if (isValid()) {
            onSubmit(values.address);
            reset();
        }
    };

    const { classes } = useStyles();

    return (
        <div className={classes.formContainer}>
            <form onSubmit={form.onSubmit(handleSubmit)} className={classes.form}>
                {errors.address && (
                    <div className={classes.error}>{errors.address}</div>
                )}
                <TextInput
                    name="address"
                    value={values.address}
                    onChange={handleChange}
                    placeholder="Enter Ethereum address"
                    error={Boolean(errors.address)}
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
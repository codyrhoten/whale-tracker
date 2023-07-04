import { /* useMantineTheme, */ createStyles, Text, Table, Badge } from "@mantine/core";

type ContractData = {
    address: string;
    contractDeployer: string;
    deployedBlockNumber: number;
    name: string;
    symbol: string;
    totalBalance: number;
};

type ContractDataTableProps = {
    contractAddresses: ContractData[];
};

const useStyles = createStyles((theme) => ({
    table: {
        padding: "3rem",
        textAlign: "center"
    },

    tableHeading: {
        textAlign: "center"
    },
}));

export default function ContractDataTable({ contractAddresses }: ContractDataTableProps) {
    // const theme = useMantineTheme();
    const { classes } = useStyles();

    return (
        <div className={classes.table}>
            <h2
            /* size="xl" style={{ color: theme.colors.dark }} */
            >
                Contracts and Tokens
            </h2>
            <Table>
                <thead>
                    <tr>
                        <th style={{textAlign: "center"}}>Contract Address</th>
                        <th style={{textAlign: "center"}}>Contract Deployer</th>
                        <th style={{textAlign: "center"}}>Deployed Block Number</th>
                        <th style={{textAlign: "center"}}>Name</th>
                        <th style={{textAlign: "center"}}>Symbol</th>
                        <th style={{textAlign: "center"}}>Total Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {contractAddresses.map((contractData, i) => (
                        <tr key={i}>
                            <td>{contractData.address}</td>
                            <td>{contractData.contractDeployer}</td>
                            <td>{contractData.deployedBlockNumber}</td>
                            <td>{contractData.name}</td>
                            <td>
                                <Badge /* color={theme.colors.primary} */>
                                    {contractData.symbol}
                                </Badge>
                            </td>
                            <td>{contractData.totalBalance}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};
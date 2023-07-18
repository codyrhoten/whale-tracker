import { createStyles, Table, Badge, Tooltip, Container } from "@mantine/core";

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
    tableHeading: {
        textAlign: "center",
        marginBottom: "2rem",
    },
    container: {
        marginBottom: "5rem",
    },
}));

function shortenAddress(address: string): string {
    let start = address.substring(0, 6);
    let end = address.substring(address.length - 4);
    return start + "..." + end;
}

export default function ContractDataTable({
    contractAddresses,
}: ContractDataTableProps) {
    const { classes } = useStyles();

    return (
        <Container className={classes.container}>
            <h2 className={classes.tableHeading}>Owned Contracts</h2>
            <Table striped highlightOnHover withBorder withColumnBorders>
                <thead>
                    <tr>
                        <th>Contract</th>
                        <th>Deployer</th>
                        <th>Block</th>
                        <th>Name</th>
                        <th>Symbol</th>
                    </tr>
                </thead>
                <tbody>
                    {contractAddresses.map((contractData, i) => (
                        <tr key={i}>
                            <td>
                                <Tooltip label={contractData.address}>
                                    <span>{shortenAddress(contractData.address)}</span>
                                </Tooltip>
                            </td>
                            <td>
                                <Tooltip label={contractData.contractDeployer}>
                                    <span>{shortenAddress(contractData.contractDeployer)}</span>
                                </Tooltip>
                            </td>
                            <td>{contractData.deployedBlockNumber}</td>
                            <td>{contractData.name}</td>
                            <td>
                                <Badge /* color={theme.colors.primary} */>
                                    {contractData.symbol}
                                </Badge>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}

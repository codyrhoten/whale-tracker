import { /* useMantineTheme, */ createStyles, Table, Badge, Tooltip, Container } from "@mantine/core";

type ContractData = {
    owner: string;
    contracts: {
        address: string;
        contractDeployer: string;
        deployedBlockNumber: number;
        name: string;
        symbol: string;
        totalBalance: number;
    }[];
};

type ContractDataTableProps = {
    contractData: ContractData;
};

const useStyles = createStyles((theme) => ({
    tableHeading: {
        textAlign: "center",
        marginBottom: "2rem"
    },
}));

function shortenAddress(address: string): string {
    let start = address.substring(0, 6);
    let end = address.substring(address.length - 4);
    return start + "..." + end;
};

export default function ContractDataTable({ contractData }: ContractDataTableProps) {
    // const theme = useMantineTheme();
    const { classes } = useStyles();

    return (
        <Container>
            <h2
                /* size="xl" style={{ color: theme.colors.dark }} */
                className={classes.tableHeading}
            >
                Deployed Contracts by<br />{contractData.owner}
            </h2>
            <Table>
                <thead>
                    <tr>
                        <th style={{ textAlign: "center" }}>Contract Address</th>
                        <th style={{ textAlign: "center" }}>Contract Deployer</th>
                        <th style={{ textAlign: "center" }}>Deployed Block Number</th>
                        <th style={{ textAlign: "center" }}>Name</th>
                        <th style={{ textAlign: "center" }}>Symbol</th>
                        <th style={{ textAlign: "center" }}>Total Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {contractData.contracts.map((data, i) => (
                        <tr key={i}>
                            <td>
                                <Tooltip label={data.address}>
                                    <span>{shortenAddress(data.address)}</span>
                                </Tooltip>
                            </td>
                            <td>
                                <Tooltip label={data.contractDeployer}>
                                    <span>{shortenAddress(data.contractDeployer)}</span>
                                </Tooltip>
                            </td>
                            <td>{data.deployedBlockNumber}</td>
                            <td>{data.name}</td>
                            <td>
                                <Badge /* color={theme.colors.primary} */>
                                    {data.symbol}
                                </Badge>
                            </td>
                            <td>{data.totalBalance}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};
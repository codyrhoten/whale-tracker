import { /* useMantineTheme, */ Text, Table, Badge } from '@mantine/core';

type ContractData = {
    address: string;
    contractDeployer: string;
    deployedBlockNumber: number;
    name: string;
    symbol: string;
    tokenId: string;
    tokenType: string;
    totalBalance: number;
};

type ContractDataTableProps = {
    contractAddresses: ContractData[];
};

export default function ContractDataTable({ contractAddresses }: ContractDataTableProps) {
    // const theme = useMantineTheme();

    return (
        <div>
            <Text /* size="xl" style={{ color: theme.colors.dark }} */>
                Contract Data Table
            </Text>
            <Table>
                <thead>
                    <tr>
                        <th>Contract Address</th>
                        <th>Contract Deployer</th>
                        <th>Deployed Block Number</th>
                        <th>Name</th>
                        <th>Symbol</th>
                        <th>Token ID</th>
                        <th>Token Type</th>
                        <th>Total Balance</th>
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
                            <td>{contractData.tokenId}</td>
                            <td>{contractData.tokenType}</td>
                            <td>{contractData.totalBalance}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};
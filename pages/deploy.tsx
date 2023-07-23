import { useRouter } from 'next/router';
import { Card, Button } from '@mantine/core';

export default function Deploy() {
    const router = useRouter();

    const handleCardClick = (contractType: string) => {
        router.push(`/deploy/${contractType}`);
    };

    return (
        <>
            <Card>
                <h2>Contract Type 1</h2>
                {/* Additional details about Contract Type 1 */}
                <Button onClick={() => handleCardClick('contractType1')}>Customize</Button>
            </Card>

            <Card>
                <h2>Contract Type 2</h2>
                {/* Additional details about Contract Type 2 */}
                <Button onClick={() => handleCardClick('contractType2')}>Customize</Button>
            </Card>

            <Card>
                <h2>Contract Type 3</h2>
                {/* Additional details about Contract Type 3 */}
                <Button onClick={() => handleCardClick('contractType3')}>Customize</Button>
            </Card>
        </>
    );
};
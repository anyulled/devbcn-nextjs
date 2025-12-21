
interface WorkshopProps {
    params: Promise<{
        year: number;
    }>;
}

export default async function Workshops({ params }: WorkshopProps) {
    const { year } = await params;

    return (
        <div>
            <h1>Workshops {year}</h1>
        </div>
    );
}
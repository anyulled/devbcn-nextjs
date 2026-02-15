interface WorkshopDetailProps {
  params: Promise<{
    workshopId: string;
  }>;
}

export default async function WorkshopDetail({ params }: WorkshopDetailProps) {
  const { workshopId } = await params;

  return (
    <div>
      <h1>Workshop Detail: {workshopId}</h1>
    </div>
  );
}

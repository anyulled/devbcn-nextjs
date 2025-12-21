interface WorkshopDetailProps {
  params: Promise<{
    workshop_id: string;
  }>;
}

export default async function WorkshopDetail({ params }: WorkshopDetailProps) {
  const { workshop_id } = await params;

  return (
    <div>
      <h1>Workshop Detail: {workshop_id}</h1>
    </div>
  );
}

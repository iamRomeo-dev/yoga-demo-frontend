import { PageContainer } from "@/components/layout";
import { ClassTypeById } from "./ClassTypeById";

type PageProps = {
  params: Promise<{ classId: string }>;
};

export default async function Page(props: PageProps) {
  const params = await props.params;

  return (
    <PageContainer>
      <ClassTypeById classId={params.classId} />
    </PageContainer>
  );
}

import BlogDetail from "@/components/commercial/BlogDetail";
import { CommonComponentData } from "@/lib/api/commonEndPoints";

export default async function BlogDetailPage({ params }: any) {
  const { slug } = await params;
  const blogsDetail = await CommonComponentData.getBlogsDetail(slug);

  return (
    <>
      <BlogDetail blogsDetail={blogsDetail} slugPath={"commercial"} />
    </>
  );
}

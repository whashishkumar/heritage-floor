import BlogDetail from "@/components/commercial/BlogDetail";
import { CommonComponentData } from "@/lib/api/endpoints";

export default async function BlogDetailPage({ params }: any) {
  const { slug } = params;

  const blogsDetail = await CommonComponentData.getBlogsDetail(slug);

  // console.log(params, "slug");

  return (
    <>
      <BlogDetail blogsDetail={blogsDetail} slugPath={"commercial"} />
    </>
  );
}

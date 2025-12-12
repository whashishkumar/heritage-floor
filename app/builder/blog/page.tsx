import BlogPage from '@/components/commercial/BlogPage';
import { CommonComponentData } from '@/lib/api/commonEndPoints';
export default async function Blogs() {
  const blogs = await CommonComponentData.getOurBlogs(1);
  const featuredBlogs = await CommonComponentData.getFeaturedBlogs();

  return (
    <>
      <BlogPage blogs={blogs} featuredBlogs={featuredBlogs} slugPath={'builder'} />
    </>
  );
}

"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MobileBlogFilter from "@/components/commercial/BlogFilterMobile";
import SearchBarBlog from "@/components/commercial/BlogSearch";
import FeaturedBlogArticle from "@/components/commercial/FeaturedBlogCard";
import NoResults from "@/components/commercial/NoArticleFound";
import { CommonComponentData } from "@/lib/api/commonEndPoints";
import BlogCard from "./BlogCard";
import DesktopBlogFilter from "./BlogFilterDesktop";

const BlogPage = ({ blogs, featuredBlogs, slugPath }: any) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { categories, data }: any = blogs || {};
  const [blogData, setBlogData]: any = useState(null);
  const [categoryData, setCategoryData]: any = useState(null);
  const [featuredBlogsData, setfeaturedBlogsData]: any = useState(null);
  const _params = useParams();
  const router = useRouter();
  const [page, setPage] = useState(1);

  // const categories = [
  //   "All",
  //   "Design Trends",
  //   "Installation Tips",
  //   "Product Guides",
  //   "Industry News",
  //   "Case Studies",
  // ];

  // const filteredPosts = blogData?.filter((post: any) => {
  //   const matchesCategory =
  //     selectedCategory === "All" || post.category.slug === selectedCategory;
  //   const matchesSearch =
  //     post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
  //   return matchesCategory && matchesSearch;
  // });

  // const featuredPost =
  //   filteredPosts.find((post: any) => post.featured) || filteredPosts[0];
  // const regularPosts = filteredPosts.filter(
  //   (post: any) => post.id !== featuredPost?.id
  // );

  const fetchBlogs = async () => {
    const blogs = await CommonComponentData.getOurBlogs(page);
    setBlogData(blogs?.data);
  };

  const fetchCategoryBaseBlogs = async (slug: any) => {
    const blogs = await CommonComponentData.getCategoryBaseBlog(slug);
    setBlogData(blogs?.data);
  };

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  useEffect(() => {
    setBlogData(data);
    setCategoryData(categories);
    setfeaturedBlogsData(featuredBlogs?.data);
  }, [categories, data, featuredBlogs]);

  const handleReadMore = (slug: string) => {
    router.push(`/${slugPath}/blog/${slug}`);
  };

  const handleReadMoreCard = (slug?: string) => {
    router.push(`/${slugPath}/blog/${slug}`);
  };

  const LoadMooreBlogs = async () => {
    setPage(page + 1);
    fetchBlogs();
  };

  const CategoryBaseArticles = (category: any) => {
    const { slug } = category;
    // setSelectedCategory(slug);
    fetchCategoryBaseBlogs(slug);
  };

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div
          className="relative bg-menu text-white  poppins-font h-[25rem] overflow-hidden  bg-cover bg-center bg-no-repeat flex items-center justify-center"
          style={{
            backgroundImage: "url('/images/commercial/services/serviceBackground.png')",
          }}
        >
          <div className="absolute inset-0 bg-black/80"></div>

          <div className="relative wrapper mx-auto px-4 sm:px-6 lg:px-8 ">
            <div className="text-center space-y-4">
              <div className="inline-block">
                <span className="text-lg tracking-[1.4px] font-semibold uppercase. text-primaryOne ">
                  Heritage Floor & Home
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                Insights & Inspiration
              </h1>
              <p className="text-lg sm:text-xl text-offWhite max-w-3xl mx-auto ">
                Expert insights, design trends, and success stories from the world of premium
                flooring
              </p>
            </div>

            {/* Search Bar */}
            <SearchBarBlog searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>
        </div>

        {/* Category Filter */}
        <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm poppins-font ">
          <div className="wrapper mx-auto  ">
            <MobileBlogFilter
              categories={categoryData}
              selectedCategory={selectedCategory}
              isFilterOpen={isFilterOpen}
              setIsFilterOpen={setIsFilterOpen}
              setSelectedCategory={setSelectedCategory}
              CategoryBaseArticles={CategoryBaseArticles}
            />

            <DesktopBlogFilter
              categories={categoryData}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              CategoryBaseArticles={CategoryBaseArticles}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="wrapper mx-auto sm:py-16">
          {/* Featured Post */}
          {featuredBlogsData && (
            <div className="mb-16 poppins-font">
              <FeaturedBlogArticle
                featuredPost={featuredBlogsData?.[0]}
                handleReadMore={handleReadMore}
              />
            </div>
          )}

          {/* Blog Grid */}
          {blogData?.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 poppins-font">
              {blogData?.map((post: any, index: any) => (
                <div
                  className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                  key={index}
                >
                  <BlogCard post={post} index={index} handleReadMoreCard={handleReadMoreCard} />
                </div>
              ))}
            </div>
          ) : (
            <NoResults />
          )}

          {blogData?.length > 0 && (
            <div className="mt-16 text-center">
              <button
                className="px-8 py-4 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-all hover:scale-105 shadow-lg"
                onClick={LoadMooreBlogs}
              >
                Load More Articles
              </button>
            </div>
          )}
        </div>
      </div>
      {/* <GetInTouch/> */}
    </>
  );
};

export default BlogPage;

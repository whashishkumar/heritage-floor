"use client";
import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";
import SectionHeader from "../common/SectionHeader";
import ButtonCommon from "../ui/Button";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function FeaturedBlogs({ blogs, pagePath }: any) {
  const { heading, subheading, description, data }: any = blogs || {};
  const featuredItems = data?.filter((item: any) => item?.featured) || [];
  const router = useRouter();
  const params = useParams();
  const mainBlog = featuredItems[0];
  const sideBlogs = featuredItems.slice(1, 3);

  const handleReadBlogPost = (blog: any) => {
    const { slug } = blog;
    router.push(`/${pagePath}/blog/${slug}`);
  };

  const handleRealAllBlogs = () => {
    router.push(`/${pagePath}/blog/`);
  };

  return (
    <div className="w-full h-full mb-[5rem]">
      <div className="wrapper mx-auto">
        <div className="w-full flex flex-col items-center justify-center relative">
          <div className="flex w-full md:gap-[2rem] gap-[2rem] flex-col md:flex-col items-center md:items-end lg:justify-end lg:flex-row ">
            <SectionHeader
              heading={heading}
              subHeading={subheading}
              description={description}
              mainCss="flex flex-col items-center justify-center "
              descriptionCss="leading-[1.5] mt-[0.5rem] w-[68%] text-center align-middle sm:w-[65%] w-full"
            />

            {/* Explore Button */}
            <div>
              <ButtonCommon
                buttonName="Explore More "
                image="/icon/arrowRightUp.png"
                // link=""
                onClick={handleRealAllBlogs}
              />
            </div>
          </div>

          {/* Blog Layout */}
          <div className="flex gap-8 mt-[4.938rem] flex-col lg:flex-row items-center lg:items-start">
            {/* Main Featured Blog */}
            {mainBlog && (
              <div className="relative group w-full lg:w-[65%]">
                <div className="relative overflow-hidden h-[20rem] sm:h-[26rem] lg:h-[36.625rem] w-full rounded-[0.5rem]">
                  <Image
                    src={mainBlog.image}
                    alt={mainBlog.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div>
                  <div className="flex mt-[1.688rem] gap-2">
                    {/* <div className="bg-primaryTwo flex items-center justify-center text-[#FAFCFF] leading-[1.1538] align-middle font-normal tracking-[0.5px] h-[1.5rem]  rounded-[2.5rem] uppercase text-xs">
                      <span>{mainBlog.category}</span>
                    </div> */}
                    <div className="bg-primaryTwo inline-flex items-center justify-center text-[#FAFCFF] leading-[1.1538] align-middle font-normal tracking-[0.5px] h-[1.5rem] rounded-[2.5rem] uppercase text-xs px-3">
                      <span>{mainBlog.category}</span>
                    </div>

                    <span className="bg-white text-black text-xs font-normal align-middle tracking-[0.5px] px-3 py-1 rounded uppercase">
                      {mainBlog.date}
                    </span>
                  </div>
                  <h3 className="font-normal text-2xl text-black align-middle mt-[1.313rem] leading-[1.4167]">
                    {mainBlog.title}
                  </h3>
                  <p className="text-base font-normal leading-[1.6250] text-[#000000]/70 align-middle w-full sm:w-[85%] mt-[1.188rem]">
                    {mainBlog.excerpt}
                  </p>

                  <button
                    onClick={() => handleReadBlogPost(mainBlog)}
                    className="bg-primaryTwo text-white flex items-center justify-center rounded-lg transition-colors h-[3.625rem] w-[3.625rem] cursor-pointer mt-[2.5rem]"
                  >
                    <FiArrowUpRight className="text-xl" />
                  </button>
                </div>
              </div>
            )}

            {/* Right Column */}
            <div className="flex flex-col gap-8 w-full lg:w-[35%]">
              {sideBlogs.map((blog: any, i: any) => (
                <div key={i} className="relative group">
                  <div className="rounded-lg overflow-hidden">
                    <div className="relative overflow-hidden h-[17rem] sm:h-[19rem] lg:h-[17.375rem]">
                      {blog?.image && (
                        <Image
                          src={blog.image}
                          alt={blog.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-start justify-between">
                    <div className="flex mt-[1.688rem] gap-2">
                      {/* <div className="bg-primaryTwo flex items-center justify-center text-[#FAFCFF] leading-[1.1538] align-middle font-normal tracking-[0.5px] h-[1.5rem] w-[3.75rem] rounded-[2.5rem] uppercase text-xs">
                        <span>{blog.category}</span>
                      </div> */}
                      <div className="bg-primaryTwo inline-flex items-center justify-center text-[#FAFCFF] leading-[1.1538] align-middle font-normal tracking-[0.5px] h-[1.5rem] rounded-[2.5rem] uppercase text-xs px-3">
                        <span>{blog.category}</span>
                      </div>
                      <span className="bg-white text-black text-xs font-normal align-middle tracking-[0.5px] px-3 py-1 rounded uppercase">
                        {blog.date}
                      </span>
                    </div>

                    <div className="flex justify-between items-end gap-4">
                      <h3 className="font-normal text-2xl text-black align-middle leading-[1.4167] mt-[1.313rem]">
                        {blog.title}
                      </h3>

                      <button
                        className="bg-primaryTwo text-white flex items-center justify-center rounded-lg transition-colors h-[3.625rem] min-w-[3.625rem] cursor-pointer mt-[2.5rem]"
                        onClick={() => handleReadBlogPost(blog)}
                      >
                        <FiArrowUpRight className="text-xl" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

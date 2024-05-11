import { useQuery } from "@tanstack/react-query";
import useAxiosBase from "../Hooks/useAxiosBase";
import Skeleton from "react-loading-skeleton";
// import { useState } from "react";

const FeaturedBlogs = () => {
    const axiosBase = useAxiosBase();
    // const [topPosts, setTopPosts] = useState([]);
    const { data, isError, isLoading, error } = useQuery({
        queryKey: 'featuredBlogs',
        queryFn: async () => {
            return await axiosBase.get("/allBlogs");
        }
    })

    if (isLoading) {
        return <Skeleton count={10} />;
    }

    if (isError) {
        console.log(error);
        return <h1 className="text-4xl">Error</h1>;
    }

    const blogs = data.data;

    // Calculate word count and sort the blogs
    const sortedBlogs = blogs
        .map(blog => {
            const wordCount = blog.longDescription.split(/\s+/).length;
            return { ...blog, wordCount };
        })
        .sort((a, b) => b.wordCount - a.wordCount)
        .slice(0, 10);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold mb-4 text-center my-3">Top 10 Blogs</h1>
            <div className="overflow-x-auto">
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Serial Number</th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Blog Title</th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Blog Owner</th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Blog Owner Profile Picture</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {sortedBlogs.map((blog, index) => (
                            <tr key={blog._id} className={`${
                                index % 2 ? "bg-gray-100" : ""
                            } hover:shadow-xl transition-colors duration-200`}>
                                <td className="px-6 py-4 whitespace-no-wrap">{index + 1}</td>
                                <td className="px-6 py-4 whitespace-no-wrap">{blog.title}</td>
                                <td className="px-6 py-4 whitespace-no-wrap">{blog.uploaderName}</td>
                                <td className="px-6 py-4 whitespace-no-wrap"><img src={blog.uploaderImg} alt={blog.uploaderName} className="h-12 w-12 rounded-full" /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FeaturedBlogs;

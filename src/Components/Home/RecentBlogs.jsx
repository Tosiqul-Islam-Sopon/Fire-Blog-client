import { useQuery } from "@tanstack/react-query";
import useAxiosBase from "../Hooks/useAxiosBase";
import Skeleton from "react-loading-skeleton";
import BlogCard from "./BlogCard";

const RecentBlogs = () => {
    const axiosBase = useAxiosBase();
    const { data, isError, isLoading, error } = useQuery({
        queryKey: ['latestBlogs'],
        queryFn: async() => {
            return await axiosBase.get("/latestBlogs")
        }
    });
    if (isLoading) {
        return <>
            <Skeleton count={10} />
        </>
    }
    if (isError) {
        console.log(error);
        return <>
            <h1 className="text-4xl">Error</h1>
        </>
    }
    const blogs = data.data;
    return (
        <div className=" mt-10">
            <div className="w-3/4 mx-auto text-center">
                <h1 className="text-4xl font-bold mb-4">Latest Blogs</h1>
                <p>Stay up to date with our latest blog posts. Explore a wide range of topics, from technology and travel to food and fashion. Whether you are looking for inspiration, information, or entertainment, our blog has something for everyone.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-5">
                {
                    blogs.map(blog => <BlogCard
                        key={blog._id}
                        blog={blog}>
                    </BlogCard>)
                }
            </div>
        </div>
    );
};

export default RecentBlogs;
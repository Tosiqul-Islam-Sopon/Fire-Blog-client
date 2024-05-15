import { useQuery } from "@tanstack/react-query";
import useAxiosBase from "../Hooks/useAxiosBase";
import BlogCard from "./BlogCard";
import BlogCardSkeleton from "./BlogCardSkeleton";
import { motion } from 'framer-motion';

const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
        opacity: 1, 
        scale: 1,
        transition: {
            delayChildren: 0.3,
            staggerChildren: 0.2
        }
    }
};

const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0, 
        opacity: 1
    }
};

const RecentBlogs = () => {
    const axiosBase = useAxiosBase();
    const { data: blogs = [], isError, isLoading } = useQuery({
        queryKey: ['latestBlogs'],
        queryFn: async () => {
            const response = await axiosBase.get("/latestBlogs");
            return response.data;
        }
    });

    if (isLoading) {
        return (
            <div className="mt-10">
                <div className="lg:w-3/4 p-3 lg:p-0 mx-auto text-center">
                    <h1 className="text-4xl font-bold mb-4">Latest Blogs</h1>
                    <p>Stay up to date with our latest blog posts. Explore a wide range of topics, from technology and travel to food and fashion. Whether you are looking for inspiration, information, or entertainment, our blog has something for everyone.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-3 mt-5">
                    {[...Array(6)].map((_, index) => (
                        <BlogCardSkeleton key={index} />
                    ))}
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="mt-10 text-center">
                <h1 className="text-4xl">Error</h1>
            </div>
        );
    }

    // const blogs = data.data;
    return (
        <div className="mt-10">
            <div className="lg:w-3/4 p-3 lg:p-0 mx-auto text-center">
                <h1 className="text-4xl font-bold mb-4">Latest Blogs</h1>
                <p>Stay up to date with our latest blog posts. Explore a wide range of topics, from technology and travel to food and fashion. Whether you are looking for inspiration, information, or entertainment, our blog has something for everyone.</p>
            </div>
            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-3 mt-5"
                variants={container}
                initial="hidden"
                animate="visible"
            >
                {blogs.map(blog => (
                    <motion.div key={blog._id} variants={item}>
                        <BlogCard blog={blog} />
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default RecentBlogs;

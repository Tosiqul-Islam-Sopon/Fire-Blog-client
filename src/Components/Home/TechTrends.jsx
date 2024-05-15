import useAxiosBase from "../Hooks/useAxiosBase";
import { motion } from 'framer-motion';
import { useQuery } from "@tanstack/react-query";
import BlogCardSkeleton from "./BlogCardSkeleton";

const TechTrends = () => {
    const axiosBase = useAxiosBase();


    const { data, isLoading, isError } = useQuery({
        queryKey: ['techTrends'],
        queryFn: async () => {
            return await axiosBase.get("/techTrends");
        }
    });

    if (isLoading) {
        return (
            <div className="mt-10">
                <div className="lg:w-3/4 p-3 lg:p-0 mx-auto text-center">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-6">
                        Tech Trends
                    </h2>
                    <p className="text-gray-600 mb-8">
                        Stay updated with the latest tech trends that are shaping the future of technology.
                    </p>
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
        return <h1 className="text-4xl">Error</h1>;
    }

    const techTrends = data.data;

    return (
        <section className="py-12 bg-gray-100">
            <div className="container mx-auto px-4">
                <div className="max-w-md mx-auto text-center">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-6">
                        Tech Trends
                    </h2>
                    <p className="text-gray-600 mb-8">
                        Stay updated with the latest tech trends that are shaping the future of technology.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {techTrends.map((trend) => (
                        <motion.div
                            whileHover={{ scale: 1.2 }}
                            onHoverStart={() => { }}
                            onHoverEnd={() => { }}
                            key={trend._id}
                            className="bg-white p-6 rounded-lg shadow-md transition duration-500 ease-in-out transform hover:-translate-y-2 hover:shadow-xl"
                        >
                            <img
                                src={trend.image}
                                alt={trend.title}
                                className="w-full h-40 object-cover rounded-md mb-4"
                            />
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                {trend.title}
                            </h3>
                            <p className="text-gray-600 text-justify">{trend.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TechTrends;

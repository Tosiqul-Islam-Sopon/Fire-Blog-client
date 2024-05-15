import useAxiosBase from "../Hooks/useAxiosBase";
import BlogCard from "../Home/BlogCard";
import { useEffect, useState } from "react";

const AllBlogs = () => {
    const axiosBase = useAxiosBase();
    const [searchText, setSearchText] = useState('');
    const [category, setCategory] = useState('');
    const [blogs, setBlogs] = useState([]);


    useEffect(() => {
        axiosBase.get(`/allBlogs?title=${searchText}&category=${category}`)
            .then(data => setBlogs(data.data));
    }, [searchText, category, axiosBase]);



    return (
        <div>
            <div className="max-w-3xl mx-auto mb-8 text-center">
                <h1 className="text-3xl font-bold mb-2">All Blogs</h1>
                <p className="text-gray-600">Browse all blogs added by our users.</p>
            </div>

            <div className="max-w-3xl mx-auto mb-8">
                <div className="flex flex-col lg:flex-row gap-3 lg:gap-0 items-center space-x-4 mb-4">
                    <input
                        onChange={(e) => {
                            e.preventDefault();
                            setSearchText(e.target.value);
                        }}
                        type="text"
                        value={searchText}
                        placeholder="Search blogs by title"
                        className="w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                    <select
                        onChange={(e) => {
                            e.preventDefault();
                            setCategory(e.target.value);
                        }}
                        className="w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        id="category"
                        name="category"
                        value={category}
                    >
                        <option value="">All Category</option>
                        <option value="Technology">Technology</option>
                        <option value="Travel">Travel</option>
                        <option value="Food">Food</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Health">Health</option>
                        <option value="Self-Improvement">Self-Improvement</option>
                    </select>
                </div>
            </div>
            {
                blogs.length ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-3 mt-10">
                    {
                        blogs.map(blog => <BlogCard
                            key={blog._id}
                            blog={blog}></BlogCard>)

                    }
                </div>
                    :
                    <>
                        <div className="w-fit mx-auto">
                            <h1 className="text-xl text-red-600 font-semibold">No Blogs Found</h1>
                        </div>
                    </>
            }
        </div>
    );
};

export default AllBlogs;
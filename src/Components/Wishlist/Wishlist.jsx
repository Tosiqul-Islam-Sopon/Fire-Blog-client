import useAxiosBase from "../Hooks/useAxiosBase";
import BlogCard from "../Home/BlogCard";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import BlogCardSkeleton from "../Home/BlogCardSkeleton";

const Wishlist = () => {
    const { user, loading } = useContext(AuthContext);

    const axiosBase = useAxiosBase();
    const queryClient = useQueryClient();

    const { data: wishlists, isError, isLoading } = useQuery({
        queryKey: ['latestBlogs', user?.email],
        queryFn: async () => {
            const response = await axiosBase.get(`/wishlists/${user?.email}`);
            return response.data;
        },
        enabled: !!user?.email,
        initialData: () => queryClient.getQueryData(['latestBlogs', user?.email]) || [],
        onSuccess: (data) => {
            queryClient.setQueryData(['latestBlogs', user?.email], data);
        },
    });

    if (isLoading || loading) {
        return (
            <div className="mt-10">
                <div className="lg:w-3/4 p-3 lg:p-0 mx-auto text-center">
                    <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
                    <p className="text-gray-600">Explore and manage your wishlist. Save your favorite blogs to read later.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-3 mt-5">
                    {[...Array(3)].map((_, index) => (
                        <BlogCardSkeleton key={index} />
                    ))}
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div>
                <h1 className="text-4xl">Error</h1>
            </div>
        );
    }

    const handleRemoveWishlist = (id) => {
        axiosBase.delete(`/wishlist/${id}`)
            .then(res => {
                if (res.data.deletedCount) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Blog Successfully Removed",
                        text: "Blog successfully removed from wishlist",
                        showConfirmButton: false,
                        timer: 2500
                    });
                    queryClient.setQueryData(['latestBlogs', user?.email], oldData => 
                        oldData.filter(blog => blog._id !== id)
                    );
                }
            })
            .catch(error => {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: `Blog Remove failed`,
                    text: `${error?.message}`,
                    showConfirmButton: true,
                });
            });
    };

    return (
        <div>
            <div className="max-w-3xl mx-auto my-8 text-center">
                <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
                <p className="text-gray-600">Explore and manage your wishlist. Save your favorite blogs to read later.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-3 mt-5">
                {
                    wishlists.map(blog => <BlogCard
                        key={blog._id}
                        blog={blog}
                        handleRemoveWishlist={handleRemoveWishlist} />)
                }
            </div>
        </div>
    );
};

export default Wishlist;

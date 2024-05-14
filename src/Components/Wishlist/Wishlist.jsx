import useAxiosBase from "../Hooks/useAxiosBase";
import BlogCard from "../Home/BlogCard";
import Swal from "sweetalert2";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";

const Wishlist = () => {
    const { user } = useContext(AuthContext);

    const [wishlists, setWishlists] = useState([]);

    const axiosBase = useAxiosBase();

    const { data, isError, isLoading, error } = useQuery({
        queryKey: ['latestBlogs'],
        queryFn: async () => {
            return await axiosBase.get(`/wishlists/${user?.email}`)
        },
        enabled: !!user?.email,
    });

    useEffect(() => {
        if (data) {
            setWishlists(data.data);
        }
    }, [data]);

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
                }
            })
            .catch(error => {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: `Blog Remove failed`,
                    text: `${error?.message}`,
                    showConfirmButton: true,
                    // timer: 1500
                });
            });
        const remaining = wishlists.filter(blog => blog._id !== id);
        setWishlists(remaining);
    }

    return (
        <div>
            <div className="max-w-3xl mx-auto my-8 text-center">
                <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
                <p className="text-gray-600">Explore and manage your wishlist. Save your favorite blogs to read later.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-5">
                {
                    wishlists.map(blog => <BlogCard
                        key={blog._id}
                        blog={blog}
                        handleRemoveWishlist={handleRemoveWishlist}></BlogCard>)
                }
            </div>
        </div>
    );
};

export default Wishlist;
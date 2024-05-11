import useAxiosBase from "../Hooks/useAxiosBase";
import BlogCard from "../Home/BlogCard";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import { useState } from "react";

const Wishlist = () => {
    const loadedWishlists = useLoaderData();
    const [wishlists, setWishlists] = useState(loadedWishlists);
    const axiosBase = useAxiosBase();

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
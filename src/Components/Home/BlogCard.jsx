import PropTypes from 'prop-types';
import { useContext } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { MdCategory } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';
import useAxiosBase from '../Hooks/useAxiosBase';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';

const BlogCard = ({ blog, handleRemoveWishlist }) => {
    const axiosBase = useAxiosBase();
    const { _id, title, img, shortDescription, category, longDescription, uploadDateTime, uploaderName, uploaderEmail, uploaderImg } = blog;
    const location = useLocation();
    const { user } = useContext(AuthContext);

    const wishlistUserName = user?.displayName;
    const wishlistUserEmail = user?.email;
    const wishlistUserImg = user?.photoURL;

    const handleAddWishlist = () => {

        if (!user){
            Swal.fire({
                position: "center",
                icon: "error",
                title: `Please Login to add Wishlist`,
                showConfirmButton: true,
            });
            return;
        }

        const wishlist = {
            blogId: _id, title, img, shortDescription, category, longDescription, uploadDateTime, uploaderName, uploaderEmail, uploaderImg, wishlistUserName, wishlistUserEmail, wishlistUserImg
        }
        axiosBase.post("/addWishlist", wishlist)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Blog Added to Wishlist",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch(() => {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: `Add to wishlist failed`,
                    text: `This blog is alreay in your wishlist.`,
                    showConfirmButton: true,
                    // timer: 1500
                });
            })
    }
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            onHoverStart={() => { }}
            onHoverEnd={() => { }}
            key={_id}
            className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-gray-200 flex flex-col transition duration-500 ease-in-out transform hover:-translate-y-2 min-h-[500px]"
        >
            <img
                src={img}
                alt={title}
                className="w-full h-56 object-cover object-center"
            />
            <div className="p-4 flex-1 flex flex-col justify-between">
                <div className='space-y-3'>
                    <h2 className="text-xl font-bold text-gray-800 text-justify">{title}</h2>
                    <p className="text-sm text-gray-600">{shortDescription}</p>
                    <p className="text-gray-500 uppercase font-semibold flex items-center gap-2">
                        <MdCategory /> {category}
                    </p>
                </div>
                <div className="mt-4 flex justify-between items-center">
                    <Link
                        to={location.pathname.includes("/wishlist") ? `/blog/${blog.blogId}` : `/blog/${_id}`}
                        className="flex items-center"
                    >
                        <motion.button
                            whileHover={{ scale: 1.2, transition: { duration: 1 } }}
                            whileTap={{ scale: 0.9 }}
                            className='btn bg-[#101820] text-white hover:bg-red-600'
                        >
                            Details
                            <FiArrowRight className="ml-1" />
                        </motion.button>
                    </Link>
                    {location.pathname.includes("/wishlist") ? (
                        <motion.button
                            whileHover={{ scale: 1.2, transition: { duration: 1 } }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleRemoveWishlist(_id)}
                            className="text-red-500 hover:text-red-600 border-2 p-3 rounded-xl hover:border-none hover:font-bold"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a1 1 0 0 1-1-1V7a1 1 0 1 1 2 0v10a1 1 0 0 1-1 1zM15 5a2 2 0 0 1-2-2V2H7v1a2 2 0 0 1-4 0V2a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2z" clipRule="evenodd" />
                            </svg>
                            Remove Wishlist
                        </motion.button>
                    ) : (
                        <motion.button
                            whileHover={{ scale: 1.2, transition: { duration: 1 } }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handleAddWishlist}
                            className="text-red-500 hover:text-red-600 border-2 p-3 rounded-xl hover:border-none hover:font-bold"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a1 1 0 0 1-1-1V7a1 1 0 1 1 2 0v10a1 1 0 0 1-1 1zM15 5a2 2 0 0 1-2-2V2H7v1a2 2 0 0 1-4 0V2a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2z" clipRule="evenodd" />
                            </svg>
                            Wishlist
                        </motion.button>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

BlogCard.propTypes = {
    blog: PropTypes.object,
    handleRemoveWishlist: PropTypes.func
};

export default BlogCard;
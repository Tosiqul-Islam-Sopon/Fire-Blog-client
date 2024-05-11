import PropTypes from 'prop-types';
import { FiArrowRight } from 'react-icons/fi';
import { MdCategory } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';

const BlogCard = ({ blog }) => {
    const { _id, title, img, shortDescription, category } = blog;
    const location = useLocation();
    console.log(location);
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-gray-200 flex flex-col">
            <img src={img} alt={title} className="w-full h-56 object-cover object-center" />
            <div className="p-4 flex-1 flex flex-col justify-between">
                <div className='space-y-3'>
                    <h2 className="text-xl font-bold text-gray-800 text-justify">{title}</h2>
                    <p className="text-sm text-gray-600">{shortDescription}</p>
                    <p className=" text-gray-500 uppercase font-semibold flex items-center gap-2"><MdCategory /> {category}</p>
                </div>
                <div className="mt-4 flex justify-between items-center">
                    <Link to={`/blog/${_id}`} className="flex items-center">
                        <button className='btn bg-[#101820] text-white  hover:bg-red-600'>
                            Details
                            <FiArrowRight className="ml-1" />
                        </button>
                    </Link>
                    <button className="text-red-500 hover:text-red-600 border-2 p-3 rounded-xl hover:border-none hover:font-bold">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a1 1 0 0 1-1-1V7a1 1 0 1 1 2 0v10a1 1 0 0 1-1 1zM15 5a2 2 0 0 1-2-2V2H7v1a2 2 0 0 1-4 0V2a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2z" clipRule="evenodd" />
                        </svg>
                        Wishlist
                    </button>
                </div>
            </div>
        </div>
    );
};

BlogCard.propTypes = {
    blog: PropTypes.object
};

export default BlogCard;
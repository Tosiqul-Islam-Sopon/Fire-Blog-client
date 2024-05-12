import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="">
                    <div className="max-w-md mx-auto text-center">
                        <p className="text-xl font-bold"><span className="text-[#FF0000]">Fire</span>Blog</p>
                        <p className="mt-2 md:mt-0 md:ml-6">Stay updated with our latest news and articles.</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex gap-3 mt-4 ">
                            <a href="#" className="text-gray-400 hover:text-gray-300 mr-4">About</a>
                            <a href="#" className="text-gray-400 hover:text-gray-300 mr-4">Contact</a>
                            <a href="#" className="text-gray-400 hover:text-gray-300">Privacy Policy</a>
                        </div>
                        <div className="flex gap-5">
                            <a href="#" className="text-gray-400 text-xl"><FaFacebook></FaFacebook></a>
                            <a href="#" className="text-gray-400 text-xl"><FaInstagram></FaInstagram></a>
                            <a href="#" className="text-gray-400 text-xl"><FaTwitter /></a>
                        </div>
                    </div>
                    <div className="mt-8 text-center text-gray-400">
                        <p>&copy; {new Date().getFullYear()} FireBlog. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

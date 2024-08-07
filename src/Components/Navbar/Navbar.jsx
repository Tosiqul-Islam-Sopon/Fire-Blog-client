import { useContext, useState } from 'react';
import { BsFire } from 'react-icons/bs';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);

    const handleLogOut = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Log Out Successful",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(error => {
                Swal.fire({
                    title: "OPPS!!!",
                    text: `${error.message}`,
                    icon: "error"
                });
            });
    };

    const links = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/addblog">Add Blog</NavLink></li>
        <li><NavLink to="/allblogs">All Blogs</NavLink></li>
        <li><NavLink to="/featureBlogs">Featured Blogs</NavLink></li>
        <li><NavLink to="/wishlist">Wishlist</NavLink></li>
    </>;

    const linksSm = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/addblog">Add Blog</NavLink></li>
        <li><NavLink to="/allblogs">All Blogs</NavLink></li>
        <li><NavLink to="/featureBlogs">Featured Blogs</NavLink></li>
        <li><NavLink to="/wishlist">Wishlist</NavLink></li>
        {
            user ? <>
                <li><Link><button onClick={handleLogOut} className="">Log Out</button></Link></li>
            </>
                :
                <>
                    <li><NavLink to="/register">Register</NavLink></li>
                    <li><NavLink to="/login">Login</NavLink></li>
                </>
        }
    </>;

    const variants = {
        open: { opacity: 1, x: 0 },
        closed: { opacity: 0, x: "-100%" },
    };

    return (
        <div className="navbar bg-[#101820] text-[#FBEAEB]">
            <div className="navbar-start">
                <div className="dropdown">
                    <button onClick={() => setIsOpen(!isOpen)} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </button>
                    <motion.div
                        initial={false}
                        animate={isOpen ? "open" : "closed"}
                        variants={variants}
                        className="absolute bg-[#101820] mt-3 p-2 shadow rounded-box w-52 z-10"
                    >
                        <ul>
                            {linksSm}
                        </ul>
                    </motion.div>
                </div>
                <a className="btn btn-ghost text-xl">
                    <span className='text-[#FF0000] flex items-center'><BsFire /> Fire</span>Blog
                </a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user?.photoURL && <div className="avatar tooltip tooltip-bottom" data-tip={user.displayName}>
                        <div className="w-16 rounded-full border-red-600 border-2">
                            <img src={user.photoURL} alt="User Avatar" />
                        </div>
                    </div>
                }
                <ul className="menu menu-horizontal px-1 hidden lg:flex">
                    <li>
                        <details>
                            <summary>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-14 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
                            </summary>
                            <ul className="p-2 bg-[#101820] rounded-t-none z-10">
                                {
                                    user ?
                                        <li>
                                            <button onClick={handleLogOut} className='hover:bg-[#FF0000] p-1 rounded-xl'>Log Out</button>
                                        </li>
                                        :
                                        <>
                                            <li><Link to="/login"><button className='hover:bg-[#FF0000] p-1 rounded-xl'>Login</button></Link></li>
                                            <li><Link to="/register"><button className='hover:bg-[#FF0000] p-1 rounded-xl'>Register</button></Link></li>
                                        </>
                                }
                            </ul>
                        </details>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;

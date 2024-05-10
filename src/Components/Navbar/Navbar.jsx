
import { BsFire } from 'react-icons/bs';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
    const links = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to={"/addblog"} >Add Blog</NavLink></li>
        <li><NavLink to={"/allblogs"} >All Blogs</NavLink></li>
        <li><NavLink to={`/featuredblogs`}>Featured Blogs</NavLink></li>
        <li><NavLink to={`/wishlist`}>Wishlist</NavLink></li>
    </>
    return (
        <div className="navbar bg-[#101820] text-[#FBEAEB]">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {links}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl"><span className='text-[#FF0000] flex items-center'><BsFire /> Fire</span>Blog</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <details>
                            <summary>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-14 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
                            </summary>
                            <ul className="p-2 bg-[#101820] rounded-t-none ">
                                <li><Link to={'/login'}><button className='hover:bg-[#FF0000] p-1 rounded-xl'>Login</button></Link></li>
                                <li><Link to={'/register'}><button className='hover:bg-[#FF0000] p-1 rounded-xl'>Register</button></Link></li>
                            </ul>
                        </details>
                    </li>
                </ul>
                <ul className="menu menu-horizontal px-1">
                    {/* <li>
                        <details>
                            <summary>
                                Parent
                            </summary>
                            <ul className="p-2 bg-black text-red-500 rounded-t-none">
                                <li><a>Link 1</a></li>
                                <li><a>Link 2</a></li>
                            </ul>
                        </details>
                    </li> */}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
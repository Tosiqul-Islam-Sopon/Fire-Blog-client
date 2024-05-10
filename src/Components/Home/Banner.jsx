
import img from "../../assets/Images/home.jpg"

const Banner = () => {
    return (
        <div className="relative">
            <div
                className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 h-96 flex items-center justify-center bg-cover bg-center text-white"
                style={{backgroundImage: `url(${img})`}}
            >
                <div className="absolute left-24">
                    <h1 className="text-4xl font-bold mb-4">Welcome to <span className="text-[#FF0000]">Fire</span> Blog</h1>
                    <p className="text-lg">Explore the latest articles, news, and updates</p>
                </div>
            </div>
        </div>
    );
};

export default Banner;

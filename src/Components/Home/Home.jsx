import Banner from "./Banner";
import NewsLetter from "./NewsLetter";
import RecentBlogs from "./RecentBlogs";
import TechTrends from "./TechTrends";

const Home = () => {
    return (
        <div className="">
            <Banner></Banner>
            <RecentBlogs></RecentBlogs>
            <NewsLetter></NewsLetter>
            <TechTrends></TechTrends>
        </div>
    );
};

export default Home;
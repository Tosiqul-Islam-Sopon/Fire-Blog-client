import Banner from "./Banner";
import DiscussionForum from "./DiscussionForum";
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
            <DiscussionForum></DiscussionForum>
        </div>
    );
};

export default Home;
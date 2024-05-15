import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const BlogCardSkeleton = () => {
    return (
        <div className="p-4">
            <Skeleton height={200} />
            <Skeleton count={2} />
        </div>
    );
};

export default BlogCardSkeleton;

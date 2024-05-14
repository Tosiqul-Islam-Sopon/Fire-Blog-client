import { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '../Providers/AuthProvider';
import useAxiosBase from '../Hooks/useAxiosBase';
import Comment from './Comment';

const BlogDetails = () => {
    const { user, loading } = useContext(AuthContext);
    const { id } = useParams();
    const axiosBase = useAxiosBase();
    const queryClient = useQueryClient();

    const { data: blogData, isError: isBlogError, error: blogError, isLoading: isBlogLoading } = useQuery({
        queryKey: [`blog${id}`],
        queryFn: async () => {
            return await axiosBase.get(`/blog/${id}`);
        }
    });

    const { data: commentsData, isError: isCommentsError, error: commentsError, isLoading: isCommentsLoading } = useQuery({
        queryKey: [`comments${id}`],
        queryFn: async () => {
            return await axiosBase.get(`/comments/${id}`);
        }
    });

    if (isBlogLoading || isCommentsLoading || loading) {
        return (
            <div className="flex justify-center items-center mt-10">
                <div>
                    <span className="loading loading-ring loading-xs"></span>
                    <span className="loading loading-ring loading-sm"></span>
                    <span className="loading loading-ring loading-md"></span>
                    <span className="loading loading-ring loading-lg"></span>
                </div>
            </div>
        );
    }

    if (isBlogError) {
        console.log(blogError);
        return <h1 className="text-4xl">Error</h1>;
    }

    if (isCommentsError) {
        console.log(commentsError);
        return <h1 className="text-4xl">Error</h1>;
    }

    const blog = blogData.data;
    const { _id, title, img, shortDescription, category, longDescription, uploadDateTime, uploaderName, uploaderEmail } = blog;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const comment = e.target.comment.value;
        const commentOb = {
            blogId: _id, comment, userName: user.displayName, userImage: user.photoURL
        };

        try {
            const res = await axiosBase.post('/addComment', commentOb);
            if (res.data.insertedId) {
                e.target.reset();
                queryClient.invalidateQueries([`comments${id}`]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container mx-auto py-8 px-3">
            <div className="max-w-3xl mx-auto">
                <img src={img} alt="Blog Image" className="mb-4 rounded-xl" />
                <h1 className="text-3xl font-bold mb-4 text-justify">{title}</h1>
                <p className="text-gray-600 mb-4">{shortDescription}</p>
                <div className='flex flex-col lg:flex-row space-y-3 lg:space-y-0 justify-between py-3 border-y-2'>
                    <p className="text-gray-600"><span className='font-bold'>Uploaded by:</span> {uploaderName}</p>
                    <p className="text-gray-600"><span className='font-bold'>Uploaded in:</span> {uploadDateTime}</p>
                </div>
                <p className="text-gray-600 py-3 border-b-2"><span className='font-bold'>Category:</span> {category}</p>
                <p className="text-gray-800 text-justify mt-4">{longDescription}</p>
            </div>

            {uploaderEmail === user.email ? (
                <div className='max-w-3xl mx-auto mt-8 text-center font-bold'>
                    <Link to={`/updateBlog/${_id}`}>
                        <button className='btn bg-red-500 text-white mb-5 hover:bg-transparent hover:text-black'>Update Blog</button>
                    </Link>
                    <p className='text-red-600'>**Cannot comment on your own blog</p>
                </div>
            ) : (
                <div className="max-w-3xl mx-auto mt-8">
                    <form onSubmit={handleSubmit} className="mb-4">
                        <textarea
                            name='comment'
                            placeholder="Add your comment..."
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                            rows={4}
                        ></textarea>
                        <button
                            type="submit"
                            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                        >
                            Post Comment
                        </button>
                    </form>
                </div>
            )}

            <div className='max-w-3xl mx-auto mt-8'>
                <h2 className="text-xl font-bold mb-2">Comments</h2>
                {commentsData.data.map((comment, index) => (
                    <Comment key={index} commentOb={comment} />
                ))}
            </div>
        </div>
    );
};

export default BlogDetails;

import { useContext, useState } from 'react';
import { Link, useLoaderData, useParams } from 'react-router-dom';
import useAxiosBase from '../Hooks/useAxiosBase';
import { useQuery } from '@tanstack/react-query';
import Skeleton from 'react-loading-skeleton';
import { AuthContext } from '../Providers/AuthProvider';
import Comment from './Comment';

const BlogDetails = () => {
    const { user, loading } = useContext(AuthContext);
    const { id } = useParams();
    const axiosBase = useAxiosBase();
    const loadedComments = useLoaderData();
    const [comments, setComments] = useState(loadedComments);
    // console.log(comments);

    const { data, isError, error, isLoading } = useQuery({
        queryKey: [`blog${id}`],
        queryFn: async () => {
            return await axiosBase.get(`blog/${id}`);
        }
    })
    

    if (isLoading || loading) {
        return <>
            <Skeleton count={10} />
        </>
    }
    if (isError) {
        console.log(error);
        return <>
            <h1 className="text-4xl">Error</h1>
        </>
    }

    const blog = data.data;
    const { _id, title, img, shortDescription, category, longDescription, uploadDateTime, uploaderName, uploaderEmail } = blog;

    const handleSubmit = (e) => {
        e.preventDefault();
        const comment = e.target.comment.value;
        const commentOb = {
            blogId: _id, comment, userName: user.displayName, userImage: user.photoURL
        }
        axiosBase.post('/addCommet', commentOb)
            .then(res => {
                if (res.data.insertedId) {
                    e.target.reset();
                }
            })
            .catch(error => console.log(error));
        setComments([...comments, commentOb]);
    };

    return (
        <div className="container mx-auto py-8">
            <div className="max-w-3xl mx-auto">
                <img src={img} alt="Blog Image" className="mb-4 rounded-xl" />
                <h1 className="text-3xl font-bold mb-4 text-justify ">{title}</h1>
                <p className="text-gray-600 mb-4">{shortDescription}</p>
                <div className='flex justify-between py-3 border-y-2'>
                    <p className="text-gray-600"><span className='font-bold'>Uploaded by:</span> {uploaderName} </p>
                    <p className="text-gray-600"><span className='font-bold'>Uploaded in:</span> {uploadDateTime} </p>
                </div>
                <p className="text-gray-600 py-3 border-b-2"><span className='font-bold'>Category:</span> {category} </p>
                <p className="text-gray-800 text-justify mt-4">{longDescription}</p>
            </div>

            {
                uploaderEmail === user.email ? <>
                    <div className='max-w-3xl mx-auto mt-8 text-center font-bold'>
                        <Link to={`/updateBlog/${_id}`}><button className='btn bg-red-500 text-white mb-5 hover:bg-transparent hover:text-black'>Update Blog</button></Link>
                        <p className='text-red-600'>**Can not comment on own blog</p>
                    </div>
                </>
                    :
                    <>
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
                    </>
            }

            <div className='max-w-3xl mx-auto mt-8'>
                <h2 className="text-xl font-bold mb-2">Comments</h2>
                {
                    comments.map(comment => <Comment
                        key={comment._id}
                        commentOb={comment}></Comment>)
                }
            </div>
        </div>
    );
};

export default BlogDetails;

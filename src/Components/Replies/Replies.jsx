import { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosBase from '../Hooks/useAxiosBase';
import ReplyCard from './ReplyCard';
import { AuthContext } from '../Providers/AuthProvider';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Skeleton from 'react-loading-skeleton';

const Replies = () => {
    const { user } = useContext(AuthContext);
    const axiosBase = useAxiosBase();
    const { id } = useParams();
    const queryClient = useQueryClient();
    const [newReply, setNewReply] = useState("");

    const { data: question, isLoading: questionLoading, isError: questionError } = useQuery({
        queryKey: ['question', id],
        queryFn: async () => {
            const res = await axiosBase.get(`/question/${id}`);
            return res.data;
        },
    });

    const { data: replies = [], isLoading: replyLoading, isError: replyError } = useQuery({
        queryKey: ['replies', id],
        queryFn: async () => {
            const res = await axiosBase.get(`/replies/${id}`);
            return res.data;
        },
    });

    if (questionLoading || replyLoading) {
        return (
            <div className="mt-10">

                <div className="px-3 mt-5">
                    <Skeleton count={5} />
                </div>
            </div>
        );
    }

    if (questionError || replyError) {
        return <h1 className="text-4xl">Error</h1>;
    }

    const handleReply = () => {
        if (newReply.trim() === "") return;
        const reply = {
            questionId: id,
            reply: newReply,
            userEmail: user.email,
            userName: user.displayName,
            userImg: user.photoURL
        }
        setNewReply("");

        axiosBase.post(`/replies`, reply)
            .then(() => {
                queryClient.setQueryData(['replies', id], prevData => [reply, ...prevData]);
            })
            .catch(error => console.error(error));
    }

    return (
        <div className="max-w-3xl mx-auto p-3 lg:p-0">
            <div className="my-8">
                <h1 className="text-3xl font-semibold mb-4">{question && question.question}</h1>
                <p className="text-gray-500 mb-6">Asked by {question && question.userName}</p>
                {user && (
                    <div className='mb-8'>
                        <textarea
                            value={newReply}
                            onChange={(e) => setNewReply(e.target.value)}
                            className="w-full border rounded-lg p-2 focus:outline-none focus:border-blue-500"
                            rows="3"
                            placeholder="Write your reply here..."
                        ></textarea>
                        <button
                            onClick={handleReply}
                            type="submit"
                            className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg mt-2 hover:bg-blue-600 focus:outline-none"
                        >
                            Reply
                        </button>
                    </div>
                )}
                <div className="space-y-4">
                    {replies.map(reply => (
                        <ReplyCard key={reply._id} reply={reply} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Replies;


import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosBase from '../Hooks/useAxiosBase';
import ReplyCard from './ReplyCard';
import { AuthContext } from '../Providers/AuthProvider';

const Replies = () => {
    const { user } = useContext(AuthContext);
    const axiosBase = useAxiosBase();
    const { id } = useParams();
    const [question, setQuestion] = useState(null);
    const [replies, setReplies] = useState([]);
    const [newReply, setNewReply] = useState("");

    useEffect(() => {

        axiosBase.get(`/question/${id}`)
            .then(res => setQuestion(res.data));

        axiosBase.get(`/replies/${id}`)
            .then(res => setReplies(res.data));

    }, [axiosBase, id]);

    const handleReply = () => {
        if (newReply.trim() === "") return;
        const reply = {
            questionId: id,
            reply: newReply,
            useEmail: user.email,
            userName: user.displayName,
            userImg: user.photoURL
        }
        setReplies([reply, ...replies]);
        setNewReply("");

        axiosBase.post(`/replies`, reply)
    }

    return (
        <div className="max-w-3xl mx-auto">
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

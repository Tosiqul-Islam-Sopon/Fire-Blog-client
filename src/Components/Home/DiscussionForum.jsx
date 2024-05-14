import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosBase from "../Hooks/useAxiosBase";
import { AiFillLike } from "react-icons/ai";
import { Link } from "react-router-dom";

const DiscussionForum = () => {
    const { user } = useContext(AuthContext);
    const axiosBase = useAxiosBase();
    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState("");

    useEffect(() => {
        axiosBase
            .get("/questions")
            .then((res) => {
                setQuestions(res.data);
            })
            .catch((error) => console.error(error));
    }, [axiosBase]);

    const handleAskQuestion = () => {
        if (newQuestion.trim() === "") return;
        const question = {
            question: newQuestion,
            userEmail: user.email,
            userName: user.displayName,
            userImg: user.photoURL,
            likes: 0,
            createdAt: new Date()
        }
        setQuestions([ question, ...questions]);
                setNewQuestion("");
        axiosBase.post("/askQuestion", question)
        
    };

    const handleLikeQuestion = (id) => {

        axiosBase.patch(`/likeQuestion/${id}`)
            .then(() => {
                const updatedQuestions = questions.map((question) => {
                    if (question._id === id) {
                        return { ...question, likes: question.likes + 1 };
                    }
                    return question;
                });
                setQuestions(updatedQuestions);
            })
    };

    return (
        <div className="max-w-3xl mx-auto p-3 lg:p-0">
            <h2 className="text-center text-3xl font-semibold text-gray-800 my-3">Discussion Forum</h2>
            <p className="text-gray-600 mb-6 text-center">Engage with other members of the community, ask questions, and share ideas.</p>
            {user && (
                <div className="mb-6">
                    <textarea
                        value={newQuestion}
                        onChange={(e) => setNewQuestion(e.target.value)}
                        className="w-full p-3 border rounded-md resize-none focus:outline-none focus:ring focus:border-blue-500"
                        placeholder="Ask a question..."
                        rows={4}
                    ></textarea>
                    <button
                        onClick={handleAskQuestion}
                        className="block mt-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none"
                    >
                        Ask Question
                    </button>
                </div>
            )}
            {questions.map((question) => (
                <div key={question._id} className="border-b border-gray-300 py-4">
                    <div className="flex items-center justify-between">
                        <div className="w-full">
                            <p className="text-lg font-semibold text-gray-800">{question.question}</p>
                            <div className="flex justify-between w-full mt-4">
                                <p className="text-sm text-gray-500 mt-1">Asked by {question.userName}</p>
                                <Link to={`/replies/${question._id}`}>
                                    <button className="text-sm text-gray-500 mt-1">Replies</button>
                                </Link>
                            </div>

                        </div>
                        <button
                            onClick={() => handleLikeQuestion(question._id)}
                            className="flex items-center text-blue-500 hover:text-blue-600 focus:outline-none"
                        >
                            <AiFillLike className="mr-1" />
                            {question.likes}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DiscussionForum;

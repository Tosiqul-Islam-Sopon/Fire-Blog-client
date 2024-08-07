import { useState, useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosBase from "../Hooks/useAxiosBase";
import { AiFillLike } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";

const DiscussionForum = () => {
    const { user } = useContext(AuthContext);
    const axiosBase = useAxiosBase();
    const queryClient = useQueryClient();
    const [newQuestion, setNewQuestion] = useState("");

    const { data: questions = [], isLoading, isError } = useQuery({
        queryKey: ['questions'],
        queryFn: async () => {
            const response = await axiosBase.get("/questions");
            return response.data;
        },
    });

    const handleAskQuestion = () => {
        if (newQuestion.trim() === "") return;
        const question = {
            question: newQuestion,
            userEmail: user.email,
            userName: user.displayName,
            userImg: user.photoURL,
            likes: 0,
            createdAt: new Date()
        };

        axiosBase.post("/askQuestion", question)
            .then(() => {
                queryClient.setQueryData(['questions'], prevData => [question, ...prevData]);
                setNewQuestion("");
            })
            .catch(error => console.error(error));
    };

    const handleLikeQuestion = (id) => {
        axiosBase.patch(`/likeQuestion/${id}`)
            .then(() => {
                queryClient.setQueryData(['questions'], prevData =>
                    prevData.map(question =>
                        question._id === id ? { ...question, likes: question.likes + 1 } : question
                    )
                );
            })
            .catch(error => console.error(error));
    };

    if (isLoading) {
        return (
            <div className="mt-10">
                <div className="px-3 mt-5">
                    <Skeleton count={5} />
                </div>
            </div>
        );
    }

    if (isError) {
        return <h1 className="text-4xl">Error</h1>;
    }

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

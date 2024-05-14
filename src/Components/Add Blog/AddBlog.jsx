import { useContext } from "react";
import useAxiosBase from "../Hooks/useAxiosBase";
import { AuthContext } from "../Providers/AuthProvider";
import Swal from "sweetalert2";

const AddBlog = () => {
    const { user } = useContext(AuthContext);
    const uploaderName = user.displayName;
    const uploaderEmail = user.email;
    const uploaderImg = user.photoURL;
    const currentDate = new Date();
    const uploadDateTime = currentDate.toLocaleString();
    const axiosBase = useAxiosBase();

    const handleSubmit = (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const img = e.target.imageUrl.value;
        const category = e.target.category.value;
        const shortDescription = e.target.shortDescription.value;
        const longDescription = e.target.longDescription.value;
        const blog = {
            title, img, category, shortDescription, longDescription, uploadDateTime, uploaderName, uploaderEmail, uploaderImg
        }

        axiosBase.post("/addBlog", blog)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Blog Added Successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    e.target.reset();
                }
            })
            .catch(error => {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: `Blog Adding failed`,
                    text: `${error?.message}`,
                    showConfirmButton: true,
                    // timer: 1500
                });
            })
    };

    return (
        <div className="max-w-2xl mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-5 ml-3 lg:ml-0">Add New Blog</h2>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                        Title
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="title"
                        type="text"
                        placeholder="Enter title"
                        name="title"

                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imageUrl">
                        Image URL
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="imageUrl"
                        type="text"
                        placeholder="Enter image URL"
                        name="imageUrl"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                        Category
                    </label>
                    <select
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="category"
                        name="category"
                        defaultValue={""}
                        required
                    >
                        <option value="" disabled>Select category</option>
                        <option value="Technology">Technology</option>
                        <option value="Travel">Travel</option>
                        <option value="Food">Food</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Health">Health</option>
                        <option value="Self-Improvement">Self-Improvement</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="shortDescription">
                        Short Description
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="shortDescription"
                        placeholder="Enter short description"
                        name="shortDescription"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="longDescription">
                        Long Description
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="longDescription"
                        rows={5}
                        placeholder="Enter long description"
                        name="longDescription"
                        required
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddBlog;

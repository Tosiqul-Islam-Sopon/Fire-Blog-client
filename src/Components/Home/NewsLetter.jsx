import Swal from 'sweetalert2';

const NewsLetter = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Thank you for subscribing to our newsletter",
            text: "Now you will informed about our latest news, articles, and special offers.",
            showConfirmButton: true,
            // timer: 2000
        });
        e.target.reset();
    };

    return (
        <div className="bg-indigo-100 py-12 px-4 sm:px-6 lg:px-8 mt-10">
            <div className="max-w-7xl mx-auto">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-indigo-800 sm:text-4xl">
                        Stay in the loop
                    </h2>
                    <p className="mt-3 text-lg text-indigo-600 sm:mt-4">
                        Sign up for our newsletter to get the latest updates.
                    </p>
                    <p className="mt-2 text-sm text-gray-500">
                        Stay informed about our latest news, articles, and special offers. Don&apos;t miss out!
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto flex justify-center items-center">
                    <div className="min-w-0 flex-1 ">
                        <label htmlFor="email" className="sr-only">Email address</label>
                        <input
                            id="email"
                            type="email"
                            name='email'
                            required
                            className="appearance-none block w-full px-4 py-3 sm:px-6 sm:py-4 text-base leading-6 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="">
                        <button
                            type="submit"
                            className="w-full sm:w-auto flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Subscribe
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewsLetter;

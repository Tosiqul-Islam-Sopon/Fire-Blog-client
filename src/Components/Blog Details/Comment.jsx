import PropTypes from 'prop-types';

const Comment = ({ commentOb }) => {
    // console.log(commentOb);
    const { comment, userName, userImage } = commentOb;
    return (
        <div className="border-b border-gray-300 py-2">
            <div className="flex items-center">
                <img
                    src={userImage}
                    alt="User"
                    className="w-8 h-8 rounded-full mr-2"
                />
                <span className="font-bold">{userName}</span>
            </div>
            <p className="text-gray-700 mt-3">{comment}</p>
        </div>
    );
};

Comment.propTypes = {
    commentOb: PropTypes.object
};

export default Comment;
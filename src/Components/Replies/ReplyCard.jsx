
import PropTypes from 'prop-types';

const ReplyCard = ({ reply }) => {
    

    return (
        <div className="border p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
                <p className="text-gray-800 font-semibold">{reply.reply}</p>
                <p className="text-sm text-gray-500">Replied by {reply.userName}</p>
            </div>
        </div>
    );
};

ReplyCard.propTypes = {
    reply: PropTypes.object
};

export default ReplyCard;
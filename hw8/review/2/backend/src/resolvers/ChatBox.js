const ChatBox = {
    messages(parent, ards, {db}, info) {
        return Promise.all (
            parent.messages.map((mId) =>
                db.MessageModel.findById(mId)),
        );
    };
};

export default ChatBox;
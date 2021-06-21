const Message = {
    sender(parent, args, {db}, info){
        return Promise.resolve
        (
            db.UserModel.findById(parent.sender._id)
        )
    }
}
  
export { Message as default };
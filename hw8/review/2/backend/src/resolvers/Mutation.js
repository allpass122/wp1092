const Mutation = {
    async createChatBox(parent, {name1, name2},{ db, pubsub }, info) {
        if(!name1 || !name2)
            throw new Error
            ("Missing chatbox name for createChatBox");
        if(!(await checkUser(db, name1, 'createChatBox'))){
            console.log('User does not exist for createChatBox: ' + name1);
            await newUser(db, name1)
        }
    }
    
}
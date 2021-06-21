import uuidv4 from 'uuid/v4';
import db from "../db"

var UserModel = db.UserModel
var ChatBoxModel = db.ChatBoxModel

const Query = {
    async createChatBox(parent, {name1, name2}, {db, pubsub}, info)
    {
        if(!name1 || !name2)
        {
            throw new Error ("Missing chatBox name for CreateChatBox")
        }
        if(!(await checkUser(db, name1, "createChatBox")))
        {
            console.log("User does not exist for createChatBox " + name1)
            await newUser(db, name1)
        }
        else
        {
            console.log("User found")
            return await validateChatBox(name1, [name1, name2])
        }
    }
};

export { Query as default };

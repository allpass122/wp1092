import db from "../db"
import {ChatBox} from "./ChatBox"

var UserModel = db.UserModel
var MessageModel = db.MessageModel
var ChatBoxModel = db.ChatBoxModel

const makeName = (name, to) => {
  return [name, to].sort().join('_');
};

const checkUser = async (db, name, action) => {
  let existing = await UserModel.findOne({ name });
  if (existing) 
  {
    return existing
      .populate("sender")
      .execPopulate()
  }
};

const validateChatBox = async (name, participants) => {
  let box = await ChatBoxModel.findOne({ name })
  if (!box) 
  {
    box = await new ChatBoxModel({ name, users: participants }).save();
    console.log("Box created")
  }
  else
  {
    console.log("Chatbox found")
  }
  
  return box
    .populate('users')
    .populate({ path: 'messages', populate: 'sender' })
    .execPopulate();
};

const Mutation = {
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
    }
    return await validateChatBox(makeName(name1, name2), [name1, name2])
  },
  async createMessage(parent, {sender, body}, {db, pubsub}, info)
  {
    if(!sender)
    {
      throw new Error ("Missing sender name for CreateMessage")
    }
    if(!(await checkUser(db, sender, "createMessage")))
    {
      console.log("User does not exist for createMessage " + name1)
      await newUser(db, sender)
    }
    else
    {
      console.log("Sender found")
      sender = await checkUser(db, sender, "createMessage")
    }

    let person = await new MessageModel({sender, body}).save()

    return person
  }
}

export { Mutation as default };

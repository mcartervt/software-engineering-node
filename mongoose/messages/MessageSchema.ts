/**
 * @file Implements a mongoose schema, based 
 * on Message.ts, for the messages collection to 
 * later be used in the mongoose model
 */
import mongoose, {Schema} from "mongoose";
import Message from "../../models/messages";

const MessageSchema = new mongoose.Schema<Message>({
    message: {type: String},
    to: {type: Schema.Types.ObjectId, ref: "UserModel"},
    from: {type: Schema.Types.ObjectId, ref: "UserModel"},
    sentOn: {type: Date},
}, {collection: "messages"});
export default MessageSchema;
/**
 * @file Implements a mongoose schema, based 
 * on Like.ts, for the likes collection to 
 * later be used in the mongoose model
 */
import mongoose, {Schema} from "mongoose";
import Like from "../../models/likes/Like";

const LikeSchema = new mongoose.Schema<Like>({
    tuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    likedBy: {type: Schema.Types.ObjectId, redf: "UserModel"},
}, {collection: "likes"});
export default LikeSchema;
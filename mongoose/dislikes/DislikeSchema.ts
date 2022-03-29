/**
 * @file Implements mongoose schema for dislikes
 */

/**
 * @typedef Dislike Represents tuit dislikes
 * @property {Tuit} tuit The dislike Tuit
 * @property {User} dislikedBy User that disliked
 */

import mongoose, {Schema} from "mongoose";
import Dislike from "../../models/dislikes/Dislike";

const DislikeSchema = new mongoose.Schema<Dislike>({
    tuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    dislikedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "dislikes"});
export default DislikeSchema;
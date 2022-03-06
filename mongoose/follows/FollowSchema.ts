/**
 * @file Implements a mongoose schema, based 
 * on Follow.ts, for the follows collection to 
 * later be used in the mongoose model
 */
import mongoose, {Schema} from "mongoose";
import Follow from "../../models/follows/Follow";

const FollowSchema = new mongoose.Schema<Follow>({
    userFollowed: {type: Schema.Types.ObjectId, ref: "UserModel"},
    userFollowing: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "follows"});
export default FollowSchema;
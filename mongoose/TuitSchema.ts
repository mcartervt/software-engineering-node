/**
 * @file Implements a mongoose schema, based 
 * on Tuit.ts, for the tuits collection to 
 * later be used in the mongoose model
 */
import mongoose, {Schema} from "mongoose";
import Tuit from "../models/Tuit";
const TuitSchema = new mongoose.Schema<Tuit>({
    tuit: {type: String, required: true},
    postedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
    postedOn: {type: Date, default: Date.now}
}, {collection: 'tuits'});
export default TuitSchema;
import mongoose from "mongoose";
import { SchemaTypes } from "mongoose";
import Tuit from "../models/Tuit";
const TuitSchema = new mongoose.Schema<Tuit>({
    tuit: {type: String, required: true},
    postedOn: {type: Date, default: Date.now},
    postedBy: {type: SchemaTypes.ObjectId, ref: "TuitModel"}
}, {collection: 'tuits'});
export default TuitSchema;
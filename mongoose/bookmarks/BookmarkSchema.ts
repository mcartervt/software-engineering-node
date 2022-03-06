/**
 * @file Implements a mongoose schema, based 
 * on Bookmark.ts, for the bookmarks collection to 
 * later be used in the mongoose model
 */
import mongoose, {Schema} from "mongoose";
import Bookmark from "../../models/bookmarks/Bookmark";

const BookmarkSchema = new mongoose.Schema<Bookmark>({
    bookmarkedTuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    bookmarkedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "bookmarks"});
export default BookmarkSchema;
/**
 * @file Implements DAO managing data storage of bookmarks.  Uses mongoose BookmarkModel
 * to integrate with MongoDB
 */
import BookmarkDaoI from "../interfaces/BookmarkDaoI";
import BookmarkModel from "../mongoose/bookmarks/BookmarkModel";
import Bookmark from "../models/bookmarks/Bookmark";

/**
 * @class BookmarkDao Implements Data Access Object managing data storage
 * of Bookmarks
 * @property {BookmarkDao} bookmarkDao Private single instance of BookmarkDao
 */
export default class BookmarkDao implements BookmarkDaoI {
    private static bookmarkDao: BookmarkDao | null = null;
    public static getInstance = (): BookmarkDao => {
        if(BookmarkDao.bookmarkDao === null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }
    private constructor() {}

    /**
     * Inserts bookmark instance into the database
     * @param {string} uid The primary key of the user bookmarking the tuit
     * @param {string} tid The primary key of the tuit being bookmarked
     * @returns Promise To be notified when bookmark is inserted into the database
     */
    userBookmarksTuit = async (uid: string, tid: string): Promise<Bookmark> =>
        BookmarkModel.create({bookmarkedTuit: tid, bookmarkedBy: uid});

    /**
     * Removes bookmark from the database.
     * @param {string} uid Primary key of user that bookmarked the tuit
     * @param {string} tid Primary key of tuit that was bookmarked
     * @returns Promise To be notified when bookmark is removed from the database
     */
    userUnbookmarksTuit = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel.deleteOne({bookmarkedTuit: tid, bookmarkedBy: uid});
    
    /**
     * Uses BookmarkModel to retrieve all bookmarks documents for the given 
     * uid from bookmarks collection
     * @param {string} uid The primary key of the user who bookmarked the tuits
     * @returns Promise To be notified when the bookmarks are retrieved from
     * database
     */
    findAllTuitsBookmarkedByUser = async (uid: string): Promise<Bookmark[]> =>
        BookmarkModel
            .find({bookmarkedBy: uid})
            .populate("bookmarkedTuit")
            .exec();

    /**
     * Removes all bookmarks for a given user from the database
     * @param {string} uid The primary key of the user bookmarking the tuits
     * @returns Promise To be notified when all bookmarks are removed from the
     * database
     */
    userUnbookmarksAllTuits = async (uid: string): Promise<any> =>
        BookmarkModel.deleteMany({bookmarkedBy: uid});

    /**
     * Uses BookmarkModel to retrieve single bookmark document from bookmarks collection
     * @param {string} uid The prmary key of the user that bookmarked the tuit
     * @param {string} tid The primary key of the tuit that was bookmarked
     * @returns Promise To be notified when bookmark is retrieved from the database
     */
    findBookmarkedTuitByUser = async (uid: string, tid: string): Promise<Bookmark[]> =>
        BookmarkModel
            .find({bookmarkedBy: uid, bookmarkedTuit: tid});
}
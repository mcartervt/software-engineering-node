/**
 * @file Controller RESTful Web service API for bookmarks resource
 */
import {Express, Request, Response} from "express";
import BookmarkDao from "../daos/BookmarkDao";
import BookmarkControllerI from "../interfaces/BookmarkControllerI";

/**
 * @class BookmarkController Implements RESTful Web service API for bookmarks resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users/:uid/bookmarks/:tid to record that a user bookmarks a tuit
 *     </li>
 *     <li>DELETE /api/users/:uid/bookmarks/:tid to record that a user
 *     no longer bookmarks a tuit</li>
 *     <li>GET /api/users/:uid/bookmarks to retrieve all the tuits bookmarked by a user
 *     </li>
 *     <li>DELETE /api/users/:uid/bookmarks to record that a user no longer bookmarks
 *     any tuits</li>
 *     <li>GET /api/users/:uid/bookmarks/:tid to retrieve a tuit bookmarked by a user
 *     </li>
 * </ul>
 * @property {BookmarkDao} bookmarkDao Singleton DAO implementing bookmarks CRUD operations
 * @property {BookmarkController} BookmarkController Singleton controller implementing
 * RESTful Web service API
 */
export default class BookmarkController implements BookmarkControllerI {
    private static bookmarkDao: BookmarkDao = BookmarkDao.getInstance();
    private static bookmarkController: BookmarkController | null = null;
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return BookmarkController
     */
    public static getInstance = (app: Express): BookmarkController => {
        if(BookmarkController.bookmarkController === null) {
            BookmarkController.bookmarkController = new BookmarkController();
            app.post("/api/users/:uid/bookmarks/:tid", BookmarkController.bookmarkController.userBookmarksTuit);
            app.delete("/api/users/:uid/bookmarks/:tid", BookmarkController.bookmarkController.userUnbookmarksTuit);
            app.get("/api/users/:uid/bookmarks", BookmarkController.bookmarkController.findAllTuitsBookmarkedByUser);
            app.delete("/api/users/:uid/bookmarks", BookmarkController.bookmarkController.userUnbookmarksAllTuits);
            app.get("/api/users/:uid/bookmarks/:tid", BookmarkController.bookmarkController.findBookmarkedTuitByUser);
        }
        return BookmarkController.bookmarkController;
    }

    private constructor() {}

    /**
     * Creates a bookmark representing a user bookmarked a tuit in the database
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is bookmarking the tuit
     * and the tuit being bookmarked
     * @param {Response} res Represents response to client, including the 
     * body formatted as JSON containing the new bookmark that was inserted in the 
     * database
     */
     userBookmarksTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.userBookmarksTuit(req.params.uid, req.params.tid)
            .then(bookmarks => res.json(bookmarks));

    /**
     * Deletes a bookmark representing a user bookmarking a tuit from the database
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is unbookmarking
     * the tuit and the tuit being unbookmarked
     * @param {Response} res Represents response to client, including status
     * on whether deleting the bookmark was successful or not
     */
     userUnbookmarksTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.userUnbookmarksTuit(req.params.uid, req.params.tid)
            .then(status => res.send(status));

    /**
     * Retrieves all tuits bookmarked by a user from the database
     * @param {Request} req Represents request from client, including the path
     * paramater uid representing the user that bookmarked the tuits
     * @param {Response} res Represents response to client, including the 
     * body formatted as JSON arrays containing the tuit objects that were bookmarked
     */
     findAllTuitsBookmarkedByUser = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.findAllTuitsBookmarkedByUser(req.params.uid)
            .then(bookmarks => res.json(bookmarks));

    /**
     * Deletes all bookmarks representing a user bookmarking a tuit from the database
     * @param {Request} req Represents request from client, including the
     * path paramater uid representing the user that is unbookmarking 
     * all tuits
     * @param {Response} res Represents response to client, including status
     * on whether deleting the bookmarks was successful or not
     */
     userUnbookmarksAllTuits = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.userUnbookmarksAllTuits(req.params.uid)
            .then(status => res.send(status));

    /**
     * Retrieves a tuit bookmarked by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameters uid and tid representing the user that bookmarked the tuit and
     * the tuit that was bookmarked
     * @param {Response} res Represents response to client, including the 
     * body formatted as JSON containing the tuit object that was bookmarked 
     */
     findBookmarkedTuitByUser = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.findBookmarkedTuitByUser(req.params.uid, req.params.tid)
            .then(tuit => res.json(tuit));
}
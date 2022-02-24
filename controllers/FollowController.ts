/**
 * @file Controller RESTful Web service API for follows resource
 */
import {Express, Request, Response} from "express";
import FollowDao from "../daos/FollowDao";
import FollowControllerI from "../interfaces/FollowController";

/**
 * @class FollowController Implements RESTful Web service API for follows resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *      <li>POST /api/users/:userFollowingId/follows/:userFollowedId to record that a user follows another user
 *      </li>
 *      <li>DELETE /api/users/:userFollowingId/follows/:userFollowedId to record that a user no longer follows a user
 *      </li>
 *      <li>GET /api/users/:uid/follows to retrieve all users the user is following
 *      </li>
 *      <li>GET /api/follows/:uid to retrieve a list of users following a user
 *      </li>
 *      <li>GET /api/users/:userFollowingId/follows/:userFollowedId to retrieve a specific user that a user is following
 *      </li>
 *      <li>DELETE /api/users/:uid/follows to record that a user no longer follows any users
 *      </li>
 * </ul>
 * @property {FollowDao} followDao Singleton DAO implementing follows CRUD operations
 * @property {FollowController} FollowController Singleton controller implementing
 * RESTful Web service API
 */
export default class FollowController implements FollowControllerI {
    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return FollowController
     */
    public static getInstance = (app: Express): FollowController => {
        if(FollowController.followController === null) {
            FollowController.followController = new FollowController();
            app.post("/api/users/:userFollowingId/follows/:userFollowedId", FollowController.followController.userFollowsAnotherUser);
            app.delete("/api/users/:userFollowingId/follows/:userFollowedId", FollowController.followController.userUnfollowsAnotherUser);
            app.get("/api/users/:uid/follows", FollowController.followController.findAllFollowsByUser);
            app.get("/api/follows/:uid", FollowController.followController.userViewsAllFollowingThem);
            app.get("/api/users/:userFollowingId/follows/:userFollowedId", FollowController.followController.userfindFollowById);
            app.delete("/api/users/:uid/follows", FollowController.followController.userUnfollowsAll);
        }
        return FollowController.followController;
    }

    private constructor() {}

    /**
     * @param {Request} req Represents request from client, including the 
     * path parameters userFollowingId and userFollowedId representing the user that is
     * doing the following and the user being followed
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new follows that was inserted in the 
     * database
     */
     userFollowsAnotherUser = (req: Request, res: Response) =>
        FollowController.followDao.userFollowsAnotherUser(req.params.userFollowingId, req.params.userFollowedId)
            .then(follows => res.json(follows));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters userFollowingId and userFollowedId representing the user that
     * is doing the unfollowing and the user being unfollowed
     * @param {Response} res Represents response to client, including status
     * on whether deleting the follow was successful or not 
     */
     userUnfollowsAnotherUser = (req: Request, res: Response) =>
        FollowController.followDao.userUnfollowsAnotherUser(req.params.userFollowingId, req.params.userFollowedId)
            .then(status => res.send(status));
    
    /**
     * Retrieves all users followed by a particular user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user doing the following
     * @param {Response} res Represents response to the client, including the
     * body formatted as JSON arrays containing the user objects that were followed 
     */
     findAllFollowsByUser = (req: Request, res: Response) =>
        FollowController.followDao.findAllFollowsByUser(req.params.uid)
            .then(users => res.json(users));
    
    /**
     * Retrieves all users following a particular user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user being followed
     * @param {Response} res Represents response to the client, including the
     * body formatted as JSON arrays containing the user objects that were doing
     * the following
     */
     userViewsAllFollowingThem = (req: Request, res: Response) =>
        FollowController.followDao.userViewsAllFollowingThem(req.params.uid)
            .then(users => res.json(users));
    
    /**
     * Retrieves a user being followed by a particular user from the database
     * @param {Request} req Represents request from client, including the path
     * parameters userFollowingId and userFollowedId representing the user doing
     * the following and the user being followed
     * @param {Response} res Represents response to client, including the 
     * body formatted as JSON containing the user object being followed
     */
     userfindFollowById = (req: Request, res: Response) =>
        FollowController.followDao.userfindFollowById(req.params.userFollowingId, req.params.userFollowedId)
            .then(user => res.json(user));

    /**
     * Removes all follows for a particular user from the database
     * @param {Request} req Represents request from client, including the
     * path parameter uid representing the user that is unfollowing all 
     * users
     * @param {Response} res Represents response to client, including status
     * on whether deleting the follows was successful or not
     */
     userUnfollowsAll = (req: Request, res: Response) =>
        FollowController.followDao.userUnfollowsAll(req.params.uid)
            .then(status => res.send(status));

};
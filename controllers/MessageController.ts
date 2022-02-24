/**
 * @file Controller RESTful Web service API for messages resource
 */
import {Express, Request, Response} from "express";
import MessageDao from "../daos/MessageDao";
import Message from "../models/messages";
import MessageControllerI from "../interfaces/MessageControllerI";

/**
 * @class MessageController Implements RESTful Web service API for messages resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users/:fromUserId/messages/:toUserId to record that a user 
 *         messages another user
 *     </li>
 *     <li>GET /api/users/:uid/messages to retrieve all messages a user has sent
 *     </li>
 *     <li>GET /api/messages/:uid to retrieve all messges sent to a user
 *     </li>
 *     <li>DELETE /api/users/:uid/messages/:mid to record that a user
 *     has removed a message to a user</li>
 *     <li>DELETE /api/users/:uid/messages to record that a user has removed
 *     all their messages
 *     </li>
 *     <li>GET /api/users/:uid/messages/:mid to retrieve a message a user
 *     sent to another user
 *     </li>
 * </ul>
 * @property {MessageDao} messageDao Singleton DAO implementing messages CRUD operations
 * @property {MessageController} MessageController Singleton controller implementing
 * RESTful Web service API
 */
 export default class MessageController implements MessageControllerI {
     private static messageDao: MessageDao = MessageDao.getInstance();
     private static messageController: MessageController | null = null;
     /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return MessageController
     */
    public static getInstance = (app: Express): MessageController => {
        if(MessageController.messageController === null) {
            MessageController.messageController = new MessageController();
            app.post("/api/users/:fromUserId/messages/:toUserId", MessageController.messageController.userSendsMessage);
            app.get("/api/users/:uid/messages", MessageController.messageController.userViewsAllMessagesSent);
            app.get("/api/messages/:uid", MessageController.messageController.userViewsAllMessagesReceived);
            app.delete("/api/users/:uid/messages/:mid", MessageController.messageController.userDeletesMessage);
            app.delete("/api/users/:uid/messages", MessageController.messageController.userDeletesAllMessages);
            app.get("/api/users/:uid/messages/:mid", MessageController.messageController.userViewsMessageById);
        }
        return MessageController.messageController;
    }

    private constructor() {}

    /**
     * Creates a new message to be inserted in the database
     * @param {Request} req Represents request from client, including the
     * path parameters fromUserId and toUserId representing the user that is 
     * sending the message and the user that is receiving the message
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new message that was inserted in the
     * database
     */
    userSendsMessage = (req: Request, res: Response) =>
        MessageController.messageDao.userSendsMessage(req.params.fromUserId, req.params.toUserId, req.body)
            .then((message: Message) => res.json(message));

    /**
     * Retrieves all messages sent by a user from the database
     * @param {Request} req Represents request from client, including the path
     * paramter uid representing the user sending the messages
     * @param {Response} res Represents response to client, including the 
     * body formatted as JSON arrays containing the message objects that were sent
     */
    userViewsAllMessagesSent = (req: Request, res: Response) =>
        MessageController.messageDao.userViewsAllMessagesSent(req.params.uid)
            .then(messages => res.json(messages));

    /**
     * Retrieves all messages received by a user from the database
     * @param {Reuqest} req Represents request from client, including the path
     * parameter uid representing the user receiving the messages
     * @param {Response} res Represents response to client, including the 
     * body formatted as JSON arrays containing the message objects that were received
     */
    userViewsAllMessagesReceived = (req: Request, res: Response) =>
        MessageController.messageDao.userViewsAllMessagesReceived(req.params.uid)
            .then(messages => res.json(messages));

    /**
     * Removes a message from the database
     * @param {Request} req Represents request from client, including the
     * path paramters uid and mid representing the user that is deleting 
     * the message and the message being deleted
     * @param {Response} res Represents response to client, including status
     * on whether deleting the message was successful or not
     */
    userDeletesMessage = (req: Request, res: Response) =>
        MessageController.messageDao.userDeletesMessage(req.params.uid, req.params.mid)
            .then(status => res.send(status));

    /**
     * Removes all messages belonging to a user from the database
     * @param {Request} req Represents request from client, including path
     * parameter uid identifying the primary key of the user whose messages
     * are to be removed
     * @param {Response} res Represents response to client, including status
     * on whether deleting the messages was successful or not
     */
    userDeletesAllMessages = (req: Request, res: Response) =>
        MessageController.messageDao.userDeletesAllMessages(req.params.uid)
            .then(status => res.send(status));

    /**
     * Retrieves a message from the database
     * @param {Request} req Represents request from client, including path
     * parameters uid and mid identifying the primary key of the user sending
     * the message and the primary key of the message being sent
     * @param {Response} res Represents response to client, including the 
     * body formatted as JSON containing the message that matches the mid
     */
    userViewsMessageById = (req: Request, res: Response) =>
        MessageController.messageDao.userViewsMessageById(req.params.uid, req.params.mid)
            .then((message: Message) => res.json(message));
 };
/**
 * @file Implements DAO managing data storage of messages.  Uses mongoose MessageModel
 * to integrate with MongoDB
 */
import MessageDaoI from "../interfaces/MessageDaoI";
import MessageModel from "../mongoose/messages/MessageModel";
import Message from "../models/messages";

/**
 * @class MessageDao Implements Data Access Object managing data storage
 * of Messages
 * @property {MessageDao} messageDao Private single instance of MessageDao
 */
export default class MessageDao implements MessageDaoI {
    private static messageDao: MessageDao | null = null;
    public static getInstance = (): MessageDao => {
        if(MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }
    private constructor() {}

    /**
     * Inserts message instance into the database
     * @param {string} fromUserId The primary key of the user sending the message
     * @param {string} toUserId The primary key of the user to whom the message is
     * being sent
     * @param {Message} message The message object being sent
     * @returns Promise To be notified when message is inserted into the database
     */
    userSendsMessage = async (fromUserId: string, toUserId: string, message: Message): Promise<Message> =>
        MessageModel.create({...message, to: toUserId, from: fromUserId});

    /**
     * Uses MessageModel to retrieve all message documents given a user
     * from messages collection
     * @param {string} uid The primary key of the user that sent the messages
     * @returns Promise To be notified when the messages are retrieved from
     * database
     */
    userViewsAllMessagesSent = async (uid: string): Promise<Message[]> =>
        MessageModel
            .find({from: uid})
            .populate("message", "to")
            .exec();

    /**
     * Uses MessageModel to retrieve all message documents given a user
     * from messages collection
     * @param {string} uid The primary key of the user that received the messages
     * @returns Promise To be notified when the messages are retrieved from
     * database
     */
    userViewsAllMessagesReceived = async (uid: string): Promise<Message[]> =>
        MessageModel
            .find({to: uid})
            .populate("message", "from")
            .exec();

    /**
     * Removes message from the database.
     * @param {string} uid Primary key of user that wrote the message
     * @param {string} mid Primary key of the message to be removed
     * @returns Promise To be notified when message is removed from the database
     */
    userDeletesMessage = async (uid: string, mid: string): Promise<any> =>
        MessageModel.deleteOne({from: uid, _id: mid});

    /**
     * Removes all messages for a given user from the database
     * @param {string} uid The primary key of the user that sent the messages
     * @returns Promise To be notified when all messages are removed from the
     * database
     */
    userDeletesAllMessages = async (uid: string): Promise<any> =>
        MessageModel.deleteMany({from: uid});

    /**
     * Uses MessageModel to retrieve single message document from messages collection
     * @param {string} uid The primary key of the user that sent the message
     * @param {string} mid The primary key of the message sent
     * @returns Promise To be notified when message is retrieved from the database
     */
    userViewsMessageById = async (uid: string, mid: string): Promise<any> =>
        MessageModel
            .find({from: uid, _id: mid})
            .populate("message", "to")
            .exec();
}
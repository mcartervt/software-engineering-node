import Message from "../models/messages";

/**
 * @file Declares API for Messages related data access object methods
 */
export default interface MessageDaoI {
    userSendsMessage (fromUserId: string, toUserId: string, message: Message): Promise<Message>;
    userViewsAllMessagesSent (uid: string): Promise<Message[]>;
    userViewsAllMessagesReceived (uid: string): Promise<Message[]>;
    userDeletesMessage (uid: string, mid: string): Promise<any>;
    userDeletesAllMessages (uid: string): Promise<any>;
    userViewsMessageById (uid: string, mid: string): Promise<Message>;
};
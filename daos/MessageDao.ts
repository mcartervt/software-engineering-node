import MessageDaoI from "../interfaces/MessageDaoI";
import MessageModel from "../mongoose/messages/MessageModel";
import Message from "../models/messages";
export default class MessageDao implements MessageDaoI {
    private static messageDao: MessageDao | null = null;
    public static getInstance = (): MessageDao => {
        if(MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }
    private constructor() {}
    userSendsMessage = async (fromUserId: string, toUserId: string, message: Message): Promise<Message> =>
        MessageModel.create({...message, to: toUserId, from: fromUserId});
    userViewsAllMessagesSent = async (uid: string): Promise<Message[]> =>
        MessageModel
            .find({from: uid})
            .populate("message", "to", "sentOn")
            .exec();
    userViewsAllMessagesReceived = async (uid: string): Promise<Message[]> =>
        MessageModel
            .find({to: uid})
            .populate("message", "from", "sentOn")
            .exec();
    userDeletesMessage = async (uid: string, mid: string): Promise<any> =>
        MessageModel.deleteOne({from: uid, _id: mid});
    userDeletesAllMessages = async (uid: string): Promise<any> =>
        MessageModel.deleteMany({from: uid});
    userViewsMessageById = async (uid: string, mid: string): Promise<any> =>
        MessageModel
            .find({from: uid, _id: mid})
            .populate("message", "to", "sentOn")
            .exec();
}
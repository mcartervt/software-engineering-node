/**
 * @file Implements DAO managing data storage of tuits. Uses mongoose TuitModel
 * to integrate with MongoDB
 */
import Tuit from "../models/Tuit";
import TuitModel from "../mongoose/TuitModel";
import TuitDaoI from "../interfaces/TuitDaoI";

/**
 * @class TuitDao Implements Data Access Object managing data storage
 * of Tuits
 * @property {TuitDao} tuitDao Private single instance of TuitDao
 */
 export default class TuitDao implements TuitDaoI{
    private static tuitDao: TuitDao | null = null;
    public static getInstance = (): TuitDao => {
        if(TuitDao.tuitDao === null) {
            TuitDao.tuitDao = new TuitDao();
        }
        return TuitDao.tuitDao;
    }
    private constructor() {}
    findAllTuits = async (): Promise<Tuit[]> =>
        TuitModel.find();
    findAllTuitsByUser = async (uid: string): Promise<Tuit[]> =>
        TuitModel.find({postedBy: uid});
    findTuitById = async (uid: string): Promise<any> =>
        TuitModel.findById(uid)
            .populate("postedBy")
            .exec();
    createTuitByUser = async (uid: string, tuit: Tuit): Promise<Tuit> =>
        TuitModel.create({...tuit, postedBy: uid});
    updateTuit = async (tid: string, tuit: Tuit): Promise<any> =>
        TuitModel.updateOne(
            {_id: tid},
            {$set: tuit});
    deleteTuit = async (uid: string): Promise<any> =>
        TuitModel.deleteOne({_id: uid});
}
/**
 * @file Implements DAO managing data storage of follows.  Uses mongoose FollowModel
 * to integrate with MongoDB
 */
import FollowDaoI from "../interfaces/FollowDaoI";
import FollowModel from "../mongoose/follows/FollowModel";
import Follow from "../models/follows/Follow";
import User from "../models/User";

/**
 * @class FollowDao Implements Data Access Object managing data storage
 * of Follows
 * @property {FollowDao} followDao Private single instance of FollowDao
 */
export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;
    public static getInstance = (): FollowDao => {
        if(FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }
    private constructor() {}

    /**
     * Inserts follow instance into the database
     * @param {string} userFollowingId Primary key of the user doing the following
     * @param {string} userFollowedId Primary key of the user being followed
     * @returns Promise To be notified when follow is inserted into the database
     */
    userFollowsAnotherUser = async (userFollowingId: string, userFollowedId: string): Promise<any> =>
        FollowModel.create({userFollowing: userFollowingId, userFollowed: userFollowedId});
    
    /**
     * Removes follow from the database.
     * @param {string} userFollowingId Primary key of user doing the following
     * @param {string} userFollowedId Primary key of the user being followed
     * @returns Promise To be notified when follow is removed from the database
     */
    userUnfollowsAnotherUser = async (userFollowingId: string, userFollowedId: string): Promise<any> =>
        FollowModel.deleteOne({userFollowing: userFollowingId, userFollowed: userFollowedId});
    
    /**
     * Uses FollowModel to retrieve all follows documents from follows collection
     * @param {string} uid The primary key of the user doing the following
     * @returns Promise To be notified when the follows are retrieved from
     * database
     */
    findAllFollowsByUser = async (uid: string): Promise<User[]> =>
        FollowModel
            .find({userFollowing: uid});

    /**
     * Uses FollowModel to retrieve all follows documents from follows collection
     * @param {string} uid The primary key of the user being followed
     * @returns Promise To be notified when the follows are retrieved from
     * database
     */
    userViewsAllFollowingThem = async (uid: string): Promise<User[]> =>
        FollowModel
            .find({userFollowed: uid});

    /**
     * Uses FollowModel to retrieve single follow document from follows collection
     * @param {string} userFollowingId The primary key of the user doing the following
     * @param {string} userFollowedId The primary key of the user being followed
     * @returns Promise To be notified when follow is retrieved from the database
     */
    userfindFollowById = async (userFollowingId: string, userFollowedId: string): Promise<Follow[]> =>
        FollowModel
            .find({userFollowing: userFollowingId, userFollowed: userFollowedId});    // Fixed!
    
    /**
     * Removes all follows from the database for a given user
     * @param {string} uid The primary key of the user whose follows are
     * being removed
     * @returns Promise To be notified when all follows are removed from the
     * database
     */
    userUnfollowsAll = async (uid: string): Promise<any> =>
        FollowModel.deleteMany({userFollowing: uid});
} 
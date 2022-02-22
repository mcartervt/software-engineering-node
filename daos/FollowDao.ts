import FollowDaoI from "../interfaces/FollowDaoI";
import FollowModel from "../mongoose/follows/FollowModel";
import Follow from "../models/follows/Follow";
import User from "../models/User";
export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;
    public static getInstance = (): FollowDao => {
        if(FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }
    private constructor() {}
    userFollowsAnotherUser = async (userFollowingId: string, userFollowedId: string): Promise<any> =>
        FollowModel.create({userFollowing: userFollowingId, userFollowed: userFollowedId});
    userUnfollowsAnotherUser = async (userFollowingId: string, userFollowedId: string): Promise<any> =>
        FollowModel.deleteOne({userFollowing: userFollowingId, userFollowed: userFollowedId});
    findAllFollowsByUser = async (uid: string): Promise<User[]> =>
        FollowModel
            .find({userFollowing: uid});
    userViewsAllFollowingThem = async (uid: string): Promise<User[]> =>
        FollowModel
            .find({userFollowed: uid});
    userfindFollowById = async (userFollowingId: string, userFollowedId: string): Promise<User> =>
        FollowModel
            .find({userFollowing: userFollowingId})
            .find({userFollowed: userFollowedId});    // Need help!!
    userUnfollowsAll = async (uid: string): Promise<any> =>
        FollowModel.deleteMany({userFollowing: uid});
} 
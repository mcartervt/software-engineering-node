import Follow from "../models/follows/Follow";
import User from "../models/User";

/**
 * @file Declares API for Follows related data access object methods
 */
export default interface FollowDaoI {
    userFollowsAnotherUser(userFollowingId: string, userFollowedId: string): Promise<any>;
    userUnfollowsAnotherUser(userFollowingId: string, userFollowedId: string): Promise<any>;
    findAllFollowsByUser(uid: string): Promise<User[]>;
    userViewsAllFollowingThem(uid: string): Promise<User[]>;
    userfindFollowById(userFollowingId: string, userFollowedId: string): Promise<Follow[]>;
    userUnfollowsAll(uid: string): Promise<any>;
};
/**
 * @file Declares Follow data type representing relationship between
 * two users, as in user follows another user
 */
import User from "../User";

/**
 * @typedef Follow Represents follows relationship between two users,
 * as in a user follows another user
 * @property {User} userFollowed User being followed
 * @property {User} userFollowing User following the other user 
 */

export default interface Follow {
    userFollowed: User,
    userFollowing: User
};
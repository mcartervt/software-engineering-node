/**
 * @file Declares Tuit data type representing a tuit on
 * Tuiter
 */
import User from "./User";

/**
 * @typedef Like Represents likes relationship between a user and a tuit,
 * as in a user likes a tuit
 * @property {string} tuit A tuit on Tuiter
 * @property {User} postedBy User that posted the tuit
 * @property {Date} postedOn Date the tuit was posted
 * on Tuiter
 */

export default interface Tuit {
	tuit: string,
	postedBy: User,
	postedOn?: Date,
};
/**
 * @file Declares Message data type representing relationship between 
 * users, as in user messages another user
 */
import User from "./User";

/**
 * @typedef Message Represents messages relationship between users,
 * as in a user messages another user
 * @property {String} message String containing the message
 * @property {User} to User to whom the message is sent
 * @property {User} from User who sends the message
 * @property {Date} sentOn Date the message was sent
 */

export default interface Message {
    message: String,
    to: User,
    from: User,
    sentOn: Date
};
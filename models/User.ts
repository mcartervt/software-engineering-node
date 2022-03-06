/**
 * @file Declares User data type representing a user
 * on Tuiter
 */
import AccountType from "./AccountType";
import MaritalStatus from "./MaritalStatus";
import Location from "./Location";
import mongoose from "mongoose";

/**
 * @typedef User Represents a user on Tuiter
 * @property {string} username Username of the user on Tuiter
 * @property {string} password Password of the user on Tuiter
 * @property {string} firstName First name of the user on Tuiter
 * @property {string} lastName Last name of the user on Tuiter
 * @property {string} email Email of the user on Tuiter
 * @property {string} profilePhoto The photo associated with the
 * user's profile on Tuiter
 * @property {string} headerImage The image in the user's profile 
 * header on Tuiter
 * @property {string} biography The bio of the user on Tuiter
 * @property {string} dateOfBirth The day the user was born
 * @property {string} accountType Specifies what type of account 
 * the user has; e.g. personal, academic, professional
 * @property {string} maritalStatus Indicates if the user is single,
 * married, or widowed
 * @property {string} location Represents the latitude and logitude 
 * coordinates of the user on Tuiter
 * @property {string} salary The annual salary of the user on Tuiter
 *  
 */

export default interface User {
	_id?: mongoose.Schema.Types.ObjectId,
	username: string,
	password: string,
	firstName?: string,
	lastName?: string,
	email: string,
	profilePhoto?: string,
	headerImage?: string,
	biography?: string,
	dateOfBirth?: Date,
	accountType?: AccountType,
	maritalStatus?: MaritalStatus,
	location: Location,
	salary?: number
};
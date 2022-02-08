import User from "../models/User";

export default interface UserDao {
    findAllUsers(): Promise<User[]>;
    findUserById(uid: string): Promise<User>;
    createUser(user: User): Promise<any>; //changed to any from User
    updateUser(uid: string, user: User): Promise<any>;
    deleteUser(uid: string): Promise<any>;
}
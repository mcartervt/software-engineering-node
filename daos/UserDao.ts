import User from "../models/User";
import UserModel from "../mongoose/UserModel";
import UserDaoI from "../interfaces/UserDao"; // How can UserDaoI be imported when it is called UserDao in the /interfaces/UserDao.ts file?

export default class UserDao implements UserDaoI { // I notice the interface has been "renamed" UserDaoI.
                                                  //  Should it not just be called that in /interfaces/UserDao.ts?
    private static userDao: UserDao | null = null;
    public static getInstance = (): UserDao => {
        if(UserDao.userDao === null) {
            UserDao.userDao = new UserDao();
        }
        return UserDao.userDao;
    }
    private constructor() {}
    async findAllUsers(): Promise<User[]> {
        return await UserModel.find();
    }
    async findUserById(uid: string): Promise<User> {
        return await UserModel.findById(uid);      // Changed userId to uid to match parameter
    }
    async createUser(user: User): Promise<User> { // Switched void to User to match Interface
        return await UserModel.create(user);
    }
    async deleteUser(uid: string): Promise<any> {
        return await UserModel.deleteOne({_id: uid}); // Changed userId to uid to match parameter
    }
    async updateUser(uid: string, user: User): Promise<any> {
        return await UserModel.updateOne({_id: uid}, {$set: user}); // Changed userId to uid to match parameter
    }
}
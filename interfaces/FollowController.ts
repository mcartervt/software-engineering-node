import {Request, Response} from "express";

export default interface FollowControllerI {
    userFollowsAnotherUser(req: Request, res: Response): void;
    userUnfollowsAnotherUser(req: Request, res: Response): void;
    findAllFollowsByUser(req: Request, res: Response): void;
    userViewsAllFollowingThem(req: Request, res: Response): void;
    userfindFollowById(req: Request, res: Response): void;
    userUnfollowsAll(req: Request, res: Response): void;
}
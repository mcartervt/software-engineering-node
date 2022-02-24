import {Request, Response} from "express";

export default interface MessageControllerI {
    userSendsMessage (req: Request, res: Response): void;
    userViewsAllMessagesSent (req: Request, res: Response): void;
    userViewsAllMessagesReceived (req: Request, res: Response): void;
    userDeletesMessage (req: Request, res: Response): void;
    userDeletesAllMessages (req: Request, res: Response): void;
    userViewsMessageById (req: Request, res: Response): void;
}
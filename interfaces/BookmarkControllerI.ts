import {Request, Response} from "express";

export default interface BookmarkControllerI {
    userBookmarksTuit (req: Request, res: Response): void;
    userUnbookmarksTuit (req: Request, res: Response): void;
    findAllTuitsBookmarkedByUser (req: Request, res: Response): void;
    userUnbookmarksAllTuits (req: Request, res: Response): void;
    findBookmarkedTuitByUser (req: Request, res: Response): void;
}
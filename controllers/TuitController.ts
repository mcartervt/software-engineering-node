import {Request, Response, Express} from "express";
import Tuit from "../models/Tuit";
import TuitDao from "../daos/TuitDao";
import TuitControllerI from "../interfaces/TuitController";

export default class TuitController implements TuitControllerI {
    private static tuitDao: TuitDao = TuitDao.getInstance();
    private static tuitController: TuitController | null = null;
    public static getInstance = (app: Express): TuitController => {
        if(TuitController.tuitController === null) {
            TuitController.tuitController = new TuitController();
            app.post("/api/users/:uid/tuits",
                TuitController.tuitController.createTuitByUser);
            app.get("/api/users/:uid/tuits",
                TuitController.tuitController.findAllTuitsByUser);
            app.get("/api/tuits", TuitController.tuitController.findAllTuits);
            app.get("/api/tuits/:uid", TuitController.tuitController.findTuitById);
            app.put("/api/tuits/:uid", TuitController.tuitController.updateTuit);
            app.delete("/api/tuits/:uid", TuitController.tuitController.deleteTuit);
        }
        return TuitController.tuitController;
    }
    private constructor(){}
    findAllTuits = (req: Request, res: Response) =>
        TuitController.tuitDao.findAllTuits()
            .then((tuits: Tuit[]) => res.json(tuits));
    findTuitById = (req: Request, res: Response) =>
        TuitController.tuitDao.findTuitById(req.params.uid)
            .then((tuit: Tuit) => res.json(tuit));
    findAllTuitsByUser = (req: Request, res: Response) =>
        TuitController.tuitDao.findAllTuitsByUser(req.params.uid)
            .then((tuits: Tuit[]) => res.json(tuits));
    createTuitByUser = (req: Request, res: Response) =>
        TuitController.tuitDao.createTuitByUser(req.params.uid,
            req.body).then((tuit: Tuit) => res.json(tuit));
    updateTuit = (req: Request, res: Response) =>
            TuitController.tuitDao.updateTuit(req.params.uid, req.body)
                .then((status) => res.send(status));
    deleteTuit = (req: Request, res: Response) =>
            TuitController.tuitDao.deleteTuit(req.params.uid)
                .then((status) => res.send(status));
}
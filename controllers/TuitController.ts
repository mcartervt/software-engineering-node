import {Request, Response, Express} from "express";
import Tuit from "../models/Tuit";
import TuitDao from "../daos/TuitDao";
import TuitControllerI from "../interfaces/TuitController";

export default class TuitController implements TuitControllerI {
    //app: Express;
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
    /*constructor(app: Express, tuitDao: TuitDao) {
        this.app = app;
        this.tuitDao = tuitDao;
        this.app.get('/tuits', this.findAllTuits);
        this.app.get('/tuits/:tid', this.findTuitById);
        this.app.get('/tuits/:uid', this.findTuitByUser);
        this.app.post('/tuits', this.createTuit);
        this.app.put('/tuits/:tid', this.updateTuit);
        this.app.delete('/tuits/:tid', this.deleteTuit);
    }*/
    findAllTuits = (req: Request, res: Response) =>
        TuitController.tuitDao.findAllTuits()
            .then((tuits: Tuit[]) => res.json(tuits));
        /*this.tuitDao.findAllTuits()
            .then(tuits => res.json(tuits));*/
    findTuitById = (req: Request, res: Response) =>
        TuitController.tuitDao.findTuitById(req.params.uid)
            .then((tuit: Tuit) => res.json(tuit));
        /*this.tuitDao.findTuitById(req.params.tid)
            .then(tuit => res.json(tuit));*/
    findAllTuitsByUser = (req: Request, res: Response) =>
        TuitController.tuitDao.findAllTuitsByUser(req.params.uid)
            .then((tuits: Tuit[]) => res.json(tuits));
        /*this.tuitDao.findTuitsByUser(req.params.uid)
            .then(tuit => res.json(tuit));  // Hoping I was right to use "tuit" here*/
    createTuitByUser = (req: Request, res: Response) =>
        TuitController.tuitDao.createTuitByUser(req.params.uid,
            req.body).then((tuit: Tuit) => res.json(tuit));
        /*this.tuitDao.createTuit(req.body)
            .then(tuit => res.json(tuit));*/
    updateTuit = (req: Request, res: Response) =>
            TuitController.tuitDao.updateTuit(req.params.uid, req.body)
                .then((status) => res.send(status));
        /*this.tuitDao.updateTuit(req.params.tid, req.body)
            .then(status => res.json(status));*/
    deleteTuit = (req: Request, res: Response) =>
            TuitController.tuitDao.deleteTuit(req.params.uid)
                .then((status) => res.send(status));
        /*this.tuitDao.deleteTuit(req.params.tid)
            .then(status => res.json(status));*/
}
/**
 * @file Server file
 */
 import express, {Request, Response} from 'express';
 //import CourseController from "./controllers/CourseController";
 import UserController from "./controllers/UserController";
 import TuitController from "./controllers/TuitController";
 //import LikeController from "./controllers/LikeController";
 import mongoose from "mongoose";
 
 // connect to the database
 mongoose.connect("mongodb://localhost:27017/tuiter");
 
 // create RESTful Web service API
 const app = express();
 app.use(express.json());
 
 app.get('/', (req: Request, res: Response) =>
     res.send('Welcome!'));
 
 app.get('/add/:a/:b', (req: Request, res: Response) =>
     res.send(req.params.a + req.params.b));
 
 //const courseController = new CourseController(app);
 const userController = UserController.getInstance(app);
 const tuitController = TuitController.getInstance(app);
 //const likesController = LikeController.getInstance(app);
 

const PORT = 4000; 
app.listen(process.env.PORT || PORT);
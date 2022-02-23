/**
 * @file Server file
 */
 import express, {Request, Response} from 'express';
 //import CourseController from "./controllers/CourseController";
 import UserController from "./controllers/UserController";
 import TuitController from "./controllers/TuitController";
 //import LikeController from "./controllers/LikeController";
 import mongoose from "mongoose";
 
// Build the connection string
const PROTOCOL = "mongodb+srv";
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const HOST = "cluster0.16p9j.mongodb.net";
const DB_NAME = "tuiter";
const DB_QUERY = "retryWrites=true&w=majority";
const connectionString = `${PROTOCOL}://${DB_USERNAME}:${DB_PASSWORD}@${HOST}/${DB_NAME}?${DB_QUERY}`;
console.log(DB_USERNAME)
console.log(DB_PASSWORD)
 // connect to the database
 mongoose.connect(connectionString);
 //mongoose.connect('mongodb+srv://carterm:admin@cluster0.16p9j.mongodb.net/tuiter?retryWrites=true&w=majority');
 //mongoose.connect("mongodb://localhost:27017/tuiter");
 
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
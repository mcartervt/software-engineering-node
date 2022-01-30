import User from "./User";
//import Tag from "./Tag";
//import Topic from "./Topic";

export default class Tuit {
	private tuit: string = '';
	private postedOn: Date = new Date();
	private postedBy: User | null = null;
}
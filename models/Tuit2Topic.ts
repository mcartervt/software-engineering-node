/**
 * @file Declares Tuit2Topic data type representing the 
 * relationship between a tuit and a topic, in that a 
 * tuit can be associated with 0 to many topics and vice
 * versa
 */
import Tuit from "./Tuit";

/**
 * @typedef Tuit2Topic Represents the relationship between tuits
 * and topics on Tuiter
 * @property {string} topic A general category tuits fall into
 * @property {Tuit} tuit A tuit on Tuiter
 */

export default class Tuit2Topic {
    private topic: string = '';
    private tuit: Tuit | null = null;
}
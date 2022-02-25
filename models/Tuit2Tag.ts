/**
 * @file Declares Tuit2Tag data type representing the 
 * relationship between a tuit and a tag, in that a 
 * tuit can be associated with 0 to many tags and vice
 * versa
 */
import Tuit from "./Tuit";

/**
 * @typedef Tuit2Tag Represents the relationship between tuits
 * and tags on Tuiter
 * @property {string} tag A custom made category tuits fall into
 * @property {Tuit} tuit A tuit on Tuiter
 */

export default class Tuit2Tag {
    private tag: string = '';
    private tuit: Tuit | null = null;
}
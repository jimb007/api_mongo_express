import { connection, dbInstance } from './mongoConnection';
import * as usersDB from './usersDB';
import { User } from '../models/usersModel'


// Creating users
let password = User.encryptPassword("holamundo");
let userTest1 = new User("","noIdea", "whatImdoing", "somefake@info.com", password.passwordHash, password.salt)
delete userTest1._id;

//Establishing connnection with db
connection().then((result) => {
    console.log(result);
    createUserTable(userTest1)
}).catch((err) => {
    console.log(err);
})


//USER STRUCTURE DB
/**
 * createUserTable creates user table and set email as unique parameter (index)
 * @param {User} user 
 */
async function createUserTable(user) {

    try {
        let createCollection = await dbInstance().createCollection('users');
        console.log(createCollection)
    }
    catch (err) { console.log(err) }
    try {
        let createIndex = await dbInstance().collection('users').createIndex({ "email": 1 }, { unique: true });
        console.log(createIndex)
    }
    catch (err) { console.log(err) }    
    try {
        let insertUser = await usersDB.insertUser(user);
        console.log(insertUser);
    }
    catch (err) { console.log(err) };    
}

















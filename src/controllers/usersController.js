//IMPORT STATEMENTS
import Ajv from 'ajv';
import { User as userClass } from '../models/usersModel';
import * as db from '../database/usersDB';
import {MongoError} from 'mongodb'

//GLOBAL VARIABLES
const ajv = new Ajv({ allErrors: true });

//CREATE USER FUNCTION
export const create = async (req, res) => {
    let valid = ajv.validate(userClass.Schema(), req.body);
    if (!valid) {
        let error = new errorResponse(ajv.errors)
        error.message = "Format error, please check you body request"
        res.json(error)
    }
    else {
        let newUser = new userClass();
        newUser.parseJson(req.body)
        let passwordHashed = userClass.encryptPassword(newUser.password);
        newUser.password = passwordHashed.passwordHash;
        newUser.salt = passwordHashed.salt;
        delete newUser.id;
        try {
            let result = new resultResponse(await db.insertUser(newUser))
            result.message = "User inserted succesfully to DB"
            res.json(result)
        }
        catch (err) {
            let error = new errorResponse(err)
            error.message = "An error ocurred when inserting user to DB"
            res.json(error)
        }
    }
};


// GET ALL USERS FUNCTION
export const get = async (req, res) => {
    try {
        let result = new resultResponse(await db.getUsers())
        result.message = "Get users request successful"
        res.json(result);
    }
    catch (err) {
        let error = new errorResponse(err)
        error.message = "An error ocurred when getting users data from DB"
        res.json(error)
    }
};


// GET USER BY ID FUNCTION 
export const getById = async (req, res) => {
    try {
        let result = new resultResponse(await db.getUserById(req.params.id))
        result.message = result.result ? "Getting user by Id request succesfull" : "User not found"
        res.json(result);
    }
    catch (err) {
        console.log(err)
        let error = new errorResponse(err)
        error.message = "An error ocurred when retrieving user from DB"
        res.json(error)
    }
}

// UPDATE USER BY ID
export const updateUser = async (req, res) => {

    let valid = ajv.validate(userClass.Schema(), req.body);
    if (!valid) {
        let error = new errorResponse(ajv.errors)
        error.message = "Format error, please check you body request"
        res.json(error)
    }
    else {
        /**@type {userClass}*/
        let requestParams = Object.assign({}, req.body);
        delete requestParams._id;

        try {
            let userUpdated = new resultResponse(await db.updateUser(req.body._id, requestParams));
            userUpdated.message = userUpdated.result.value? `User updated succesfully`:`No data updated`
            res.json(userUpdated)
        }
        catch (err) {            
            let error = new errorResponse(err)
            error.message = "An internal error ocurred when updating user from DB"            
            res.json(error)
        }
    }
}

// UPDATE USER BY ID
export const deleteUser = async (req, res) => {
    try {
        let userDeleted = new resultResponse(await db.deleteUser(req.params.id));
        userDeleted.message = `User deleted succesfully`
        res.json(userDeleted)
    }
    catch (err) {
        let error = new errorResponse(err)
        error.message = "An error ocurred when deleting user from DB"
        res.json(error)
    }

}





//==========Objects=============

function resultResponse(promiseResult) {
    this.message = "Successful request"
    this.result = promiseResult || null;
}

function errorResponse(promiseError) {
    this.message = "An internal error ocurred";    
    this.error = true;       
    this.detail=promiseError.toString();
}






/**Validator function
 * process error object returned from mongooseValidation
 * @function
 * @param {object} error - error object
 */
function validator(error) {
    for (var props in error.errors) {
        if (error.errors.hasOwnProperty(props)) {
            switch (error.errors[props].name) {
                case 'ValidatorError':
                    return {
                        "error": error.errors[props].message,
                        "kind": error.errors[props].kind,
                        "path": error.errors[props].path
                    }
                default:
                    return {
                        "error": "sorry we dont know this error"
                    }
            }
        }
    }
}







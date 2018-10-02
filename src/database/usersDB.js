import { dbInstance } from './mongoConnection'
import { ObjectId } from 'mongodb'
import { User as userClass } from '../models/usersModel'




/**Get users function
* @returns {Promise} 
*/
export const getUsers = function () {
    return dbInstance().collection('users').find().project({ 'salt': 0, 'password': 0 }).toArray();
}

/**Get usersById function
 * @param {String} id - id user string
 * @returns {Promise} 
 */
export const getUserById = (id) => {
    if (!id) return ("Id is mandatory")
    return dbInstance().collection('users').findOne({ "_id": _createObject(id) },{projection:{ 'salt': 0, 'password': 0 }})
}

/**Get usersById function
 * @param {String} param - id user string
 * @returns {Promise} 
 */
export const getUserByParam = (param) => {
    return new Promise((res, rej) => {
        if (!id) rej("Id is mandatory")
        dbInstance().collection('users').findOne({ "_id": _createObject(id) }, (err, document) => {
            if (err) rej({ "querySuccess": false, "result": err })
            else res({ "querySuccess": true, "result": document })
        })
    })
}


/**Insert new user function
 * @param {userClass} user - user object
 * @returns {Promise<queryPromise>} 
 */
export const insertUser = (user) => {
    return dbInstance().collection('users').insertOne(user);
}




/**Update user info
 * @param {String} id - user id 
 * @param {object} params - params to be updated 
 * @returns {Promise} 
 */
export const updateUser = (id, params) => {
    console.log(params)
    return dbInstance().collection('users').findOneAndUpdate({ "_id": _createObject(id) }, { $set: params }, { "returnOriginal": false ,projection:{ 'salt': 0, 'password': 0 }})
}

/**Delete  user 
 * @param {String} id - user id  
 * @returns {Promise} 
 */
export const deleteUser = (id) => {
    console.log(params)
    return dbInstance().collection('users').findOneAndDelete({ "_id": _createObject(id) });
}


//=======   LOCAL METHODS===========
/**Function to create object id
 * In case you need to search by id.
 * @param {String} id 
 */
function _createObject(id) {
    let objectId = new ObjectId(id);
    return objectId;
}
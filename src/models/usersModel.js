import crypto from 'crypto'
import * as userSchema from './schemas/userSchema.json'

//====================
//=====USER CLASS=====
//====================

/**
 * @class User
 * @property {String} _id - idUser
 * @property {String } firstName
 * @property {String } lastName
 * @property {String } email
 * @property {String } password
 * @property {String } salt
 * @property {String } phone
 * @property {String } birth
 * @property {String } address
 * @property {Date} createdOn
 */
export class User {
    constructor(_id="", firstName="", lastName="", email="", password="", salt="", phone="", birth="", address="", createdOn = Date.now()) {
        this._id = _id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.salt = salt;
        this.phone = phone;
        this.birth = birth;
        this.address = address;
        this.createdOn = createdOn;
    }

    get fullName() {
        return `${this.firstName} ${this.lastName}`
    }

    parseJson(json) {
        for (var props in json) {
            if (this.hasOwnProperty(props)) {
                this[props] = (json[props]);
            }
        }        
    }

    
    static Schema() {        
        return  userSchema;
    }

    /** passwordhashed object definition
       * @typedef {Object} passwordHashed
       * @property {String} salt
       * @property {Number} passwordHash   
       */

    /**Encrypt password function
     * generates an encrypt password string
     * @private
     * @function
     * @param {string} userPassword - password from user
     * @returns {passwordHashed}  returns salt generated and password hashed
     */
    static encryptPassword(userPassword) {
        return sha512(userPassword, genSomeSalt(16));
    }

    /**validatePassword password function
     *@private
    * @function
    * @param {string} userPassword - password from request
    * @param {string} salt - salt from user stored in db
    * @returns {passwordHashed} returns salt generated and password hashed
    */
    static validatePassword(userPassword, salt) {
        return sha512(userPassword, salt);
    }
}

//====================
//===LOCAL METHODS====
//====================
/**Generate Salt
 * generates random string of characters i.e salt
 * @private
 * @function
 * @param {number} length - Length of the random string.
 */
function genSomeSalt(length) {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex') /** convert to hexadecimal format */
        .slice(0, length);   /** return required number of characters */
};

/**Hash function
 * hash password with sha512.
 * @private
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
function sha512(password, salt) {
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt: salt,
        passwordHash: value
    }
}










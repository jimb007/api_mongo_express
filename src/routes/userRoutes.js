import * as user from "../controllers/usersController";


const userRoutes = (app) => {
    app.route('/user')
        .get((req, res, next) => {
            // middleware
            //Example middleware just in case you want to use it
            next();
        }, user.get)

        // POST endpoint
        .post(user.create)
        //PUT endpoint to update user
        .put(user.updateUser);

    app.route('/user/:id')
        //get specific contact
        .get(user.getById)

        //put request         

        //delete request
        .delete(user.deleteUser);
}

export default userRoutes;
import express from 'express';
import { connection } from './database/mongoConnection'
import {settings} from './settings'
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';

const app = express();
const PORT = settings.express.port;



//mongo connection
connection().then((result)=>{
    console.log(result)
}).catch((err)=>{
    console.log(err)
});



//bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Middlaware just for printing all requests
app.use(function (req, res, next) {
    console.log(`Request from: ${req.originalUrl}`)
    console.log(`Request type: ${req.method}`)
    next();
});


//Setting routes
userRoutes(app);

//serving static files
app.use(express.static('public'));


app.get('/', (req, res) => {
    console.log(req.body)
    res.send(`Node and express server is running on port ${PORT}`)
}
);

app.listen(PORT, () =>
    console.log(`your server is running in por ${PORT}`)
);



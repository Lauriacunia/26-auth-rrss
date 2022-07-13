import express  from "express";
import morgan from "morgan";
import session from "express-session";
import apiRoutes from "./src/routes/apiRoutes.js";
import MongoStore from "connect-mongo";
import passport from "passport";
import 'dotenv/config'
import './src/db/database.js';
import './src/passport/local.js';

const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASS = process.env.MONGO_PASS;
const DB_NAME = process.env.DB_NAME;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(session(
    {
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl: `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@cluster0.cyfup.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
            ttl: 60 * 10 // 10 minutes
            })
    }
));

app.use(passport.initialize()); // Inicializa passport
app.use(passport.session()); // Enlaza passport con la sesion

app.set('views', 'src/views');
app.set('view engine', 'ejs');


/** Routes */
app.use('/', apiRoutes);



const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    }
);
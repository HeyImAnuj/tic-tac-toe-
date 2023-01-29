import express from "express"; //we need a express to creat a server
import cors from "cors"; //cors library helps to connect our react app to backend
import { StreamChat  } from "stream-chat";
import { v4 as uuid4} from "uuid";
import bcrypt from "bcrypt";


const app = express(); //so that we can creat app in express app

app.use(cors());
app.use(express.json());

const api_key = "4dkbmnz7jrem"; //making connection to stream api
const api_secret = "65ycp484cxr6v64rvqqq9384wu9p5dggcv9xnxtmqvheb26kfqqg8rtwwuxdx7us";

const serverClient = StreamChat.getInstance(api_key, api_secret);


// Creating Routes

app.post("/signup", async (req, res) => {
    try{
    const {YourName, Username, Email, Password} = req.body;
    const userId = uuid4(); // randomid generator
    const hashedPassword = await bcrypt.hash(Password, 10);
    const token = serverClient.createToken(userId);
    res.json({token, userId, YourName, Username, Email, hashedPassword});
    } catch (error) {
        res.json(error)
    }
});

app.post("/login", async (req, res) => {
    try {
    const {username, Password} = req.body;
    const {users} = await serverClient.queryUsers({name: username});
    if (users.length === 0) return res.json({message: "enter correct details."});

    const token = serverClient.createToken(users[0].id);
    const passwordMatch = bcrypt.compare(Password, users[0].hashedPassword);

    if (passwordMatch) {
        res.json({
            token, 
            YourName: users[0].YourName,
            Email: users[0].Email,
            username,
            userId: users[0].id,
        
        });
    }
} catch (error) {
    res.json(error);
}
});

app.listen(3001, () => {
    console.log("server is running on port 3001");
});
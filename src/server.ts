import app from './app.js';
import { connectToDB } from './db/db.client.js';
import {PORT} from './common/config.js'

console.log("try to connect Mongo")
connectToDB(()=> {
    app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
);
})

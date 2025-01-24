import express from 'express';
import { configDotenv } from 'dotenv';

configDotenv();



class Server {
    contructor(){
        this.app = express();
        this.port = process.env.PORT || 4000;
        console.log('a ver que ondis');
    }
    listen(){
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}

export default Server;
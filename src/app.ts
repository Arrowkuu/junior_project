import express, { Application } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import Controller from '@/utils/interfaces/controller.interface';
import Database from '@/config/database.config';
import ErrorMiddleware from '@/middleware/error.middleware';
import { Model } from 'objection';

class App {
    public express: Application;
    public port: number;

    constructor(controllers: Controller[], port: number) {
        this.express = express();
        this.port = port;

        this.initMiddleware();
        this.initDatabaseConnection();
        this.initControllers(controllers);
        this.initErrorHandling();
    }

    private initMiddleware(): void {
        this.express.use(helmet());
        this.express.use(morgan('dev'));
        this.express.use(cors());
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
        this.express.set('trust proxy', true);
    }

    private initControllers(controllers: Controller[]): void {
        controllers.forEach((controller: Controller) => {
            this.express.use('/api', controller.router);
        });
    }

    private initDatabaseConnection(): void {
        // bind model.
        Model.knex(Database);
    }

    private initErrorHandling(): void {
        this.express.use(ErrorMiddleware);
    }

    public async listen(): Promise<void> {
        this.express.listen(this.port, () => {
            console.log(`Application listen on port ${this.port}`);
        });
    }
}

export default App;

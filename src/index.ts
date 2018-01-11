import * as express from 'express';
import 'reflect-metadata';
import { createExpressServer, useContainer } from 'routing-controllers';
import { Container } from 'typedi';

useContainer(Container);

const app: express.Application = createExpressServer({
    controllers: [ `${__dirname}/**/*.controller.{js,ts}` ]
});

const port = process.env.PORT || 3000;

app.disable('x-powered-by');
app.listen(port);

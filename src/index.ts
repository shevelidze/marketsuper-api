import express from 'express';
import { appConfig } from './configs';
import { authRouter, graphqlRouter } from './routes';

const app = express();

app.use('/auth', authRouter);
app.use('/graphql', graphqlRouter);

app.listen(appConfig.port, () => {
  console.log(`Running an API server on http://localhost:${appConfig.port}.`);
});

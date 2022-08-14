import express from 'express';
import { appConfig } from './configs';
import { authRouter, graphqlRouter } from './routes';
import { ApiError } from './utils/errors';

const app = express();

app.use('/auth', authRouter);
app.use('/graphql', graphqlRouter);

app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
    res.status(err.code).json({
      error: {
        name: err.name,
        message: err.message,
      },
    });
  } else next(err);
});

app.listen(appConfig.port, () => {
  console.log(`Running an API server on http://localhost:${appConfig.port}.`);
});

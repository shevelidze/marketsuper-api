import express, { Response } from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import { verify, JsonWebTokenError } from 'jsonwebtoken';
import secretKey from './secretKey';

const schema = buildSchema(`#graphql
  type User {
    firstName: String!,
    lastName: String!
    cart: [Item!]!
  }
  type Item {
    name: String!,
    description: String!
  }
  type Query {
    me: User
  }
`);

const root = {
  hello: () => {
    return 'Hello world!';
  },
  me: (a) => {
    return {
      firstName: 'Denys',
      lastName: 'Shevel',
      cart: (b) => {
        console.log(b);
        return [{ name: 'name', description: 'hello' }];
      },
    };
  },
};

const app = express();

function getTokenFromHeader(header: string): string | null {
  const execResult = /(?<=Bearer\s).*/.exec(header);
  return execResult?.[0] || null;
}

function generateErrorJson(message: string) {
  return { error: { name: 'Authorization error', message } };
}

function sendAuthentificationError(message: string, res: Response<any, any>) {
  res.status(401).json(generateErrorJson(message));
}

function getTokenPayload(token: string) {
  const tokenPayload = verify(token, secretKey);
  if (typeof tokenPayload === 'string')
    throw new JsonWebTokenError('invalid payload.');

  return tokenPayload;
}

app.use('/graphql', (req, res, next) => {
  const authorizationHeader = req.get('Authorization');

  if (authorizationHeader === undefined) {
    sendAuthentificationError('No Authorization header found.', res);
    return;
  }

  const token = getTokenFromHeader(authorizationHeader);

  if (token === null) {
    sendAuthentificationError(
      'Invalid Authorization header. Expected "Bearer <JWT>".',
      res
    );
    return;
  }

  try {
    const tokenPayload = getTokenPayload(token);
    console.log(tokenPayload);
  } catch (e) {
    if (e instanceof JsonWebTokenError) {
      sendAuthentificationError(`Invalid JWT token: ${e.message}.`, res);
      return;
    }

    throw e;
  }

  next();
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.post('/authentificate_with_google', (req, res) => {});

app.post('authentificate_with_email_and_password', (req, res) => {});

app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');

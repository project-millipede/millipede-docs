import { compose, Handler, Next, RequestHandler } from 'compose-middleware';
import { IncomingMessage, ServerResponse } from 'http';

import { testDirectory } from '../../../i18n';

export const testMiddleware = (): Array<Handler<
  IncomingMessage,
  ServerResponse
>> => {
  // const middleware: Array<Handler<IncomingMessage, ServerResponse>> = [];

  const fake = (
    _req: IncomingMessage,
    _res: ServerResponse,
    next: Next
  ): void => {
    testDirectory();

    console.log('Fake middleware step');
    next();
  };
  return [fake];
};

export const composeTestMiddleware = (
  req: IncomingMessage,
  res: ServerResponse
) => (middlewares: Array<Handler<IncomingMessage, ServerResponse>>) => {
  const handler: RequestHandler<IncomingMessage, ServerResponse> = compose(
    middlewares
  );

  const done = () => {
    console.log('done');
  };

  handler(req, res, _next => {
    return done();
  });

  return handler;
};

export const instantiateTestMiddleware = (
  req: IncomingMessage,
  res: ServerResponse
) => {
  composeTestMiddleware(req, res)(testMiddleware());
};

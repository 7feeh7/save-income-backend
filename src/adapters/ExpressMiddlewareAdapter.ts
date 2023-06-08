import { NextFunction, Request, Response } from 'express';

export const adaptMiddleware = (middleware: any) => {

  return async (request: Request, response: Response, next: NextFunction) => {
    try {

      const httpResponse = await middleware.handle(request);
      Object.assign(request, httpResponse);
      return next();
    } catch (e) {
      return response.status(401).json("AccessDenied");
    }
  };
};

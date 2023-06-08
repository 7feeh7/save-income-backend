import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { auth } from "../config/auth";
import { PostgresUserRepository } from "../repositories/implementations/PostgresUsersRepository";
import { IUsersRepository } from "../repositories/IUsersRepository";

interface TokenPayload {
    id: string;
    iat: number;
    exp: number;
}

export class AuthMiddleware {
    constructor(
        private usersRepository: IUsersRepository
    ) { }
    async handle(request: Request) {
        const { authorization } = request.headers;

        if (!authorization) {
            throw new Error("Access Denied");
        }

        const token = authorization.replace("Bearer", "").trim();

        const data = jwt.verify(token, auth.secretKey);

        const { id } = data as TokenPayload;

        const dbUser = await this.usersRepository.existUserWithToken(
            id,
            token
        );

        console.log(dbUser)
      
        if (!dbUser) throw new Error("Access Denied");

        return {
            statusCode: 200,
            headers: {
                userLoggerIn: dbUser    
            },
        };
    }
}

export function makeAuthMiddleware(): any {
    const postgresUserRepository = new PostgresUserRepository();
    const ensureAuthMiddleware = new AuthMiddleware(
        postgresUserRepository
    );
    return ensureAuthMiddleware;
  }
import { CreateUserUseCase } from "@/domain/useCase/user/CreateUser/CreateUserUseCase"
import { CreateUserController } from "@/presentation/http/controllers/user/CreateUserController"
import { HttpStatus } from "@/shared/http/HttpStatus"
import { makeCreateUserInput } from "@tests/utils/mocks/CreateUserMock"
import { Request, Response } from "express"

describe("CreateUserController", () => {
    it("deve retornar sucesso quando o usuário é criado", async () => {
        const createUserUseCase = {
            execute: jest.fn().mockResolvedValue(null)
        } as unknown as CreateUserUseCase

        const controller = new CreateUserController(createUserUseCase)

        const req = { body: makeCreateUserInput() } as Request

        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        } as unknown as Response

        await controller.handle(req, res)

        expect(createUserUseCase.execute).toHaveBeenCalledWith(req.body)
        expect(res.status).toHaveBeenCalledWith(HttpStatus.NO_CONTENT)
        expect(res.send).toHaveBeenCalled()
    })

    it("deve retornar erro quando o usuário já existe", async () => {
        const conflict = Object.assign(new Error("User already exists."), { statusCode: 409 })

        const createUserUseCase = {
            execute: jest.fn().mockRejectedValue(conflict)
        } as unknown as CreateUserUseCase

        const controller = new CreateUserController(createUserUseCase)

        const req = { body: makeCreateUserInput() } as Request

        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        } as unknown as Response

        await expect(controller.handle(req, res)).rejects.toBe(conflict)

        expect(res.status).not.toHaveBeenCalled()
        expect(res.send).not.toHaveBeenCalled()
    })

    it("deve retornar erro quando ocorrer erro inesperado", async () => {
        const someError = new Error("Internal server error")

        const createUserUseCase = {
            execute: jest.fn().mockRejectedValue(someError)
        } as unknown as CreateUserUseCase

        const controller = new CreateUserController(createUserUseCase)

        const req = { body: makeCreateUserInput() } as Request

        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        } as unknown as Response

        await expect(controller.handle(req, res)).rejects.toBe(someError)

        expect(res.status).not.toHaveBeenCalled()
        expect(res.send).not.toHaveBeenCalled()
    })
})

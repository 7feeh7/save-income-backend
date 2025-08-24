import { Request, Response } from "express"
import { UpdateUserUseCase } from "@/domain/useCase/user/UpdateUser/UpdateUserUseCase"
import { HttpStatus } from "@/shared/http/HttpStatus"
import { UpdateUserController } from "@/presentation/http/controllers/user/UpdateUserController"
import { makeUpdateUserInput, makeUpdateUserInputWithId } from "@tests/utils/mocks/UpdateUserMock"

describe("UpdateUserController", () => {
    it("deve retornar sucesso quando o usuário é atualizado", async () => {
        const useCase = { execute: jest.fn().mockResolvedValue(null) } as unknown as UpdateUserUseCase
        const controller = new UpdateUserController(useCase)

        const req = makeUpdateUserInputWithId() as unknown as Request

        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() } as unknown as Response

        await controller.handle(req, res)

        expect(useCase.execute).toHaveBeenCalledWith(makeUpdateUserInput())
        expect(res.status).toHaveBeenCalledWith(HttpStatus.OK)
        expect(res.send).toHaveBeenCalledWith()
    })

    it("deve retornar erro de domínio caso não encontre o usuario", async () => {
        const notFound = Object.assign(new Error("User not found"), { statusCode: 404 })

        const useCase = { execute: jest.fn().mockRejectedValue(notFound) } as unknown as UpdateUserUseCase

        const controller = new UpdateUserController(useCase)

        const req = makeUpdateUserInputWithId() as unknown as Request

        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() } as unknown as Response

        await expect(controller.handle(req, res)).rejects.toBe(notFound)

        expect(res.status).not.toHaveBeenCalled()
        expect(res.send).not.toHaveBeenCalled()
    })

    it("deve retornar erro inesperado", async () => {
        const error = new Error("Internal Server Error")
        const useCase = { execute: jest.fn().mockRejectedValue(error) } as unknown as UpdateUserUseCase
        const controller = new UpdateUserController(useCase)

        const req = makeUpdateUserInputWithId() as unknown as Request

        const res = {
            status: jest.fn().mockReturnThis(), send: jest.fn()
        } as unknown as Response

        await expect(controller.handle(req, res)).rejects.toBe(error)

        expect(res.status).not.toHaveBeenCalled()
        expect(res.send).not.toHaveBeenCalled()
    })
})

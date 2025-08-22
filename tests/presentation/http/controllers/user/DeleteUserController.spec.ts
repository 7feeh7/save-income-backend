import { Request, Response } from "express"
import { DeleteUserController } from "@/presentation/http/controllers/user/DeleteUserController"
import { DeleteUserUseCase } from "@/domain/useCase/user/DeleteUser/DeleteUserUseCase"
import { HttpStatus } from "@/shared/http/HttpStatus"

describe("DeleteUserController (sem try/catch)", () => {
    it("deve retornar 204 quando o usuário é deletado com sucesso", async () => {
        const useCase = { execute: jest.fn().mockResolvedValue(undefined) } as unknown as DeleteUserUseCase
        const controller = new DeleteUserController(useCase)

        const req = { params: { id: "1234" } } as unknown as Request
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() } as unknown as Response

        await controller.handle(req, res)

        expect(useCase.execute).toHaveBeenCalledWith({ id: "1234" })
        expect(res.status).toHaveBeenCalledWith(HttpStatus.NO_CONTENT)
        expect(res.send).toHaveBeenCalledWith()
    })

    it("deve retornar erro quando não achar um usuario para excluir", async () => {
        const notFound = Object.assign(new Error("User not found."), { statusCode: HttpStatus.NOT_FOUND })
        const useCase = { execute: jest.fn().mockRejectedValue(notFound) } as unknown as DeleteUserUseCase
        const controller = new DeleteUserController(useCase)

        const req = { params: { id: "1234" } } as unknown as Request
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() } as unknown as Response

        await expect(controller.handle(req, res)).rejects.toBe(notFound)
        expect(res.status).not.toHaveBeenCalled()
        expect(res.send).not.toHaveBeenCalled()
    })

    it("deve retornar erro quando acontecer erro inesperado", async () => {
        const error = new Error("Internal Server Error")

        const useCase = { execute: jest.fn().mockRejectedValue(error) } as unknown as DeleteUserUseCase
        const controller = new DeleteUserController(useCase)

        const req = { params: { id: "1234" } } as unknown as Request
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() } as unknown as Response

        await expect(controller.handle(req, res)).rejects.toBe(error)
        expect(res.status).not.toHaveBeenCalled()
        expect(res.send).not.toHaveBeenCalled()
    })
})

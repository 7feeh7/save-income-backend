import { Request, Response } from "express"
import { UserProfileController } from "@/presentation/http/controllers/user/UserProfileController"
import { UserProfileUseCase } from "@/domain/useCase/user/UserProfile/UserProfileUseCase"

describe("UserProfileController", () => {
    it("deve retornar sucesso ao retornar o perfil do usuário", async () => {
        const profile = { id: "1234", name: "John", email: "john@example.com" }

        const useCase = {
            execute: jest.fn().mockResolvedValue(profile)
        } as unknown as UserProfileUseCase

        const controller = new UserProfileController(useCase)

        const req = { params: { id: "1234" } } as unknown as Request

        const res = {
            json: jest.fn().mockReturnThis(),
            status: jest.fn().mockReturnThis()
        } as unknown as Response

        await controller.handle(req, res)

        expect(useCase.execute).toHaveBeenCalledWith("1234")
        expect(res.json).toHaveBeenCalledWith(profile)
    })

    it("deve propagar erro quando o use case falhar", async () => {
        const boom = new Error("db down")

        const useCase = {
            execute: jest.fn().mockRejectedValue(boom)
        } as unknown as UserProfileUseCase

        const controller = new UserProfileController(useCase)

        const req = { params: { id: "1234" } } as unknown as Request
        const res = {
            json: jest.fn().mockReturnThis(),
            status: jest.fn().mockReturnThis()
        } as unknown as Response

        await expect(controller.handle(req, res)).rejects.toBe(boom)

        expect(res.json).not.toHaveBeenCalled()
        expect(res.status).not.toHaveBeenCalled()
    })
})

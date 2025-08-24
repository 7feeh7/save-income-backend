import { UpdateUserUseCase } from "@/domain/useCase/user/UpdateUser/UpdateUserUseCase"
import { NotFoundException } from "@/shared/exceptions/NotFoundException"
import { makeUpdateUserInput, makeUsersRepoMock } from "@tests/utils/mocks/UpdateUserMock"

describe("UpdateUserUseCase", () => {
    it("deve retornar void (undefined) quando atualiza usuário com sucesso", async () => {
        const repo = makeUsersRepoMock()
        repo.findById.mockResolvedValue({ id: "1234" })

        const updateUserUseCase = new UpdateUserUseCase(repo)

        const data = makeUpdateUserInput()

        const result = await updateUserUseCase.execute(data)

        expect(repo.findById).toHaveBeenCalledWith("1234")
        expect(repo.update).toHaveBeenCalledWith(data)
        expect(result).toBeUndefined()
    })

    it("deve retornar erro quando usuário não existir", async () => {
        const repo = makeUsersRepoMock()
        repo.findById.mockResolvedValue(null)

        const updateUserUseCase = new UpdateUserUseCase(repo)

        await expect(
            updateUserUseCase.execute(makeUpdateUserInput())
        ).rejects.toThrow(NotFoundException)

        expect(repo.update).not.toHaveBeenCalled()
    })

    it("deve retornar erro quando o repositório falhar ao buscar usuário", async () => {
        const repo = makeUsersRepoMock()
        repo.findById.mockRejectedValue(new Error("db down"))

        const updateUserUseCase = new UpdateUserUseCase(repo)

        await expect(
            updateUserUseCase.execute(makeUpdateUserInput())
        ).rejects.toThrow("db down")

        expect(repo.update).not.toHaveBeenCalled()
    })

    it("deve retornar erro quando o repositório falhar ao atualizar usuário", async () => {
        const repo = makeUsersRepoMock()
        repo.findById.mockResolvedValue({ id: "1234" })
        repo.update.mockRejectedValue(new Error("Internal Server Error"))

        const updateUserUseCase = new UpdateUserUseCase(repo)

        await expect(
            updateUserUseCase.execute(makeUpdateUserInput())
        ).rejects.toThrow("Internal Server Error")

        expect(repo.findById).toHaveBeenCalledWith("1234")
        expect(repo.update).toHaveBeenCalled()
    })
})

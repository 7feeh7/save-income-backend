import { DeleteUserUseCase } from "@/domain/useCase/user/DeleteUser/DeleteUserUseCase"
import { NotFoundException } from "@/shared/exceptions/NotFoundException"

function makeUsersRepoMock() {
    return {
        findById: jest.fn(),
        delete: jest.fn(),
    } as any
}

describe("DeleteUserUseCase", () => {
    it("deve deletar o usuário com sucesso", async () => {
        const repo = makeUsersRepoMock()
        repo.findById.mockResolvedValue({ id: "1234" })

        const deleteUserUseCase = new DeleteUserUseCase(repo)

        await deleteUserUseCase.execute({ id: "1234" })

        expect(repo.findById).toHaveBeenCalledWith("1234")
        expect(repo.delete).toHaveBeenCalledWith("1234")
        expect(repo.delete).toHaveBeenCalledTimes(1)
    })

    it("deve lançar NotFoundException quando o usuário não existir", async () => {
        const repo = makeUsersRepoMock()
        repo.findById.mockResolvedValue(null)

        const deleteUserUseCase = new DeleteUserUseCase(repo)

        await expect(deleteUserUseCase.execute({ id: "1234" }))
            .rejects.toBeInstanceOf(NotFoundException)

        expect(repo.findById).toHaveBeenCalledWith("1234")
        expect(repo.delete).not.toHaveBeenCalled()
    })

    it("deve retornar erro do repositório ao buscar usuário", async () => {
        const repo = makeUsersRepoMock()
        repo.findById.mockRejectedValue(new Error("db down"))

        const deleteUserUseCase = new DeleteUserUseCase(repo)

        await expect(deleteUserUseCase.execute({ id: "1234" }))
            .rejects.toThrow("db down")

        expect(repo.delete).not.toHaveBeenCalled()
    })

    it("deve retornar erro do repositório ao deletar usuário", async () => {
        const repo = makeUsersRepoMock()
        repo.findById.mockResolvedValue({ id: "1234" })
        repo.delete.mockRejectedValue(new Error("delete failed"))

        const deleteUserUseCase = new DeleteUserUseCase(repo)

        await expect(deleteUserUseCase.execute({ id: "1234" }))
            .rejects.toThrow("delete failed")

        expect(repo.findById).toHaveBeenCalledWith("1234")
        expect(repo.delete).toHaveBeenCalledWith("1234")
    })
})

import { UserProfileUseCase } from "@/domain/useCase/user/UserProfile/UserProfileUseCase"
import { IUsersRepository } from "@/domain/repositories/IUsersRepository"
import { User } from "@/domain/entities/User"

function makeUsersRepoMock(): jest.Mocked<IUsersRepository> {
    return {
        userProfile: jest.fn(),
    } as any
}

describe("UserProfileUseCase", () => {
    it("deve retornar o perfil do usuário com sucesso", async () => {
        const repo = makeUsersRepoMock()

        const profile: User = {
            id: "1234",
            name: "John",
            email: "john@example.com",
            phone: "123456789",
        } as unknown as User

        repo.userProfile.mockResolvedValue(profile)

        const userProfileUseCase = new UserProfileUseCase(repo)

        const result = await userProfileUseCase.execute("1234")

        expect(repo.userProfile).toHaveBeenCalledWith("1234")
        expect(result).toBe(profile)
    })

    it("deve retornar erro quando o repositório falhar ao buscar o perfil", async () => {
        const repo = makeUsersRepoMock()
        repo.userProfile.mockRejectedValue(new Error("db down"))

        const userProfileUseCase = new UserProfileUseCase(repo)

        await expect(userProfileUseCase.execute("1234")).rejects.toThrow("db down")
        expect(repo.userProfile).toHaveBeenCalledWith("1234")
    })
})

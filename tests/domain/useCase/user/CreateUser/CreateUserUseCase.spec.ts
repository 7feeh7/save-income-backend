import { CreateUserUseCase } from "@/domain/useCase/user/CreateUser/CreateUserUseCase"
import { ConflictException } from "@/shared/exceptions/ConflictException"
import { User } from "@/domain/entities/User"
import { makeCreateUserInput, makeHasherMock, makeMailProviderMock, makeUsersRepoMock } from "@tests/utils/mocks/CreateUserMock"


describe("CreateUserUseCase", () => {
    it("deve criar usuário com sucesso", async () => {
        const usersRepo = makeUsersRepoMock()
        const mail = makeMailProviderMock()
        const hasher = makeHasherMock()

        usersRepo.findByEmail.mockResolvedValue(null)

        const createUserUseCase = new CreateUserUseCase(usersRepo, mail, hasher)

        const input = makeCreateUserInput()

        await createUserUseCase.execute(input)

        expect(usersRepo.findByEmail).toHaveBeenCalledWith("john@example.com")
        expect(hasher.hash).toHaveBeenCalledWith("secret")
        expect(usersRepo.save).toHaveBeenCalledTimes(1)
        expect(mail.sendMail).toHaveBeenCalledTimes(1)

        const savedUser = usersRepo.save.mock.calls[0][0]
        expect(savedUser).toBeInstanceOf(User)
        expect(savedUser.email).toBe("john@example.com")
        expect(savedUser.password).toBeDefined()
    })

    it("deve lançar erro quando o e-mail já existir", async () => {
        const usersRepo = makeUsersRepoMock()
        const mail = makeMailProviderMock()
        const hasher = makeHasherMock()

        usersRepo.findByEmail.mockResolvedValue({ id: "123" })

        const createUserUseCase = new CreateUserUseCase(usersRepo, mail, hasher)

        await expect(
            createUserUseCase.execute(makeCreateUserInput())
        ).rejects.toBeInstanceOf(ConflictException)

        expect(usersRepo.save).not.toHaveBeenCalled()
        expect(mail.sendMail).not.toHaveBeenCalled()
        expect(hasher.hash).not.toHaveBeenCalled()
    })

    it("deve lançar erro quando findByEmail falha", async () => {
        const usersRepo = makeUsersRepoMock()
        const mail = makeMailProviderMock()
        const hasher = makeHasherMock()

        usersRepo.findByEmail.mockRejectedValue(new Error("db down"))

        const createUserUseCase = new CreateUserUseCase(usersRepo, mail, hasher)

        await expect(
            createUserUseCase.execute(makeCreateUserInput())
        ).rejects.toThrow("db down")

        expect(usersRepo.save).not.toHaveBeenCalled()
        expect(mail.sendMail).not.toHaveBeenCalled()
        expect(hasher.hash).not.toHaveBeenCalled()
    })

    it("não deve enviar e-mail se salvar o usuário falhar", async () => {
        const usersRepo = makeUsersRepoMock()
        const mail = makeMailProviderMock()
        const hasher = makeHasherMock()

        usersRepo.findByEmail.mockResolvedValue(null)
        usersRepo.save.mockRejectedValue(new Error("insert failed"))

        const createUserUseCase = new CreateUserUseCase(usersRepo, mail, hasher)

        await expect(
            createUserUseCase.execute(makeCreateUserInput())
        ).rejects.toThrow("insert failed")

        expect(hasher.hash).toHaveBeenCalledWith("secret")
        expect(usersRepo.save).toHaveBeenCalledTimes(1)
        expect(mail.sendMail).not.toHaveBeenCalled()
    })
})

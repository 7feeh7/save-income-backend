export const makeUsersRepoMock = () => {
    return {
        findByEmail: jest.fn(),
        save: jest.fn()
    } as any
}

export const makeMailProviderMock = () => {
    return {
        sendMail: jest.fn()
    } as any
}

export const makeHasherMock = () => {
    return {
        hash: jest.fn(async (p: string) => `hashed:${p}`),
        compare: jest.fn()
    } as any
}

export const makeCreateUserInput = () => {
    return {
        name: "John Doe",
        email: "john@example.com",
        phone: "123456789",
        password: "secret",
        role_id: 1
    }
}

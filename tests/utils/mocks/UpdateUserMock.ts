export const makeUpdateUserInputWithId = () => {
    return {
        params: {
            id: "1234"
        },
        body: {
            name: "John",
            email: "john@example.com",
            phone: "123",
            role_id: 1
        }
    }
}

export const makeUpdateUserInput = () => {
    return {
        id: "1234",
        name: "John",
        email: "john@example.com",
        phone: "123",
        role_id: 1
    }
}

export const makeUsersRepoMock = () => {
    return {
        findById: jest.fn(),
        update: jest.fn(),
    } as any
}
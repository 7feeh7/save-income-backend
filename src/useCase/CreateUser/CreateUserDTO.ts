export interface ICreateUserRequestDTO {
    name: string;
    email: string;
    phone: string;
    password: string;
    role_id?: unknown;
}
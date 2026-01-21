import {ReturnKeyOfObject} from "../../../shared/utility-types";

export type UserType = {
    id: string;
    email: string;
    lastName: string;
    firstName: string;
    phone: string;
    role: RoleType;
    createdAt: string;
    updatedAt: string;
}

export type CreateUserType = Omit<UserType, "id" | 'createdAt' | 'updatedAt'> & {
    lastName?: string;
    firstName?: string;
    phone?: string;
}

export const Roles = {
    user: 'user',
    admin: 'admin',
    worker: 'worker',
} as const;


export type RoleType = ReturnKeyOfObject<typeof Roles>;
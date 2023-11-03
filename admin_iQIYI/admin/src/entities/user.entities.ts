export type ListUsers = {
    userId: number;
    userName: string;
    passwords: string;
    email: string;
    avatarUser: string;
    role: string;
    isBlocked: number;
}

export type Signin = {
    // email: string;
    passwords: string;
    userName: string;
}
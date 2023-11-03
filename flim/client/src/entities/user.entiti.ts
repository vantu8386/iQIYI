export type Signup = {
    userName: string;
    email: string;
    passwords: string;
}

export type Signin = {
    email: string;
    passwords: string;
}

export type NameUpdate = {
    userName: string;
}
export interface UserName1 {
    userId: number;
    userName: string;
    email: string;
    avatarUser: string;
}
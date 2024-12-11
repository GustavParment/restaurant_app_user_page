export interface IUser {
    education: string;
    id?: string;
    username: string;
    password: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    birthday?: string;
    role?: string;
    profile?: UserProfile[];
    matchListId?: string[];
}

export interface UserProfile {
    avatar: string,
    bio: string,
    favoriteFood: string[]
    hobbies: string[]
}
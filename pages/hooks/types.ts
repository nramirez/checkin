export interface Member {
    id: string;
    email?: string;
    lastName: string;
    name: string;
    phone?: string;
}

export interface MemberInput {
    email?: string;
    lastName: string;
    name: string;
    phone?: string;
}

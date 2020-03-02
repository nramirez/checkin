import { ApolloQueryResult } from "apollo-client";

export interface Member {
    id: string;
    email?: string;
    lastName: string;
    name: string;
    phoneNumber?: string;
}

export interface MemberInput {
    email?: string;
    lastName: string;
    name: string;
    phoneNumber?: string;
}

export interface Geography {
    point: {
        type: string,
        coordinates: [number, number]
    }
}

export interface OrgEventInput {
    description: string;
    description?: string;
    location: Geography;
    startTime: string;
    endTime: string;
}

export interface OrgEvent {
    id: string;
    description: string;
    description?: string;
    location: Geography;
    startTime: string;
    endTime: string;
}

export interface PageInfo {
    limit: number;
    offset: number;
}

export interface PagingResult<T> {
    data: T[];
    count: number;
    loading: boolean;
    fetchMore?: (info: PageInfo) => Promise<ApolloQueryResult<any>>
}
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

export interface OrgEventInput {
    title: string;
    description?: string;
    startTime: Date;
    endTime: Date;
    place: Place;
}

export interface OrgEvent extends OrgEventInput {
    id: string;
}

export interface Place {
    place_id: string;
    description: string;
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
import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Submission {
    contactInfo: string;
    name: string;
    message: string;
    timestamp: bigint;
}
export interface backendInterface {
    getAllSubmissions(): Promise<Array<Submission>>;
    getSubmission(timestamp: bigint): Promise<Submission>;
    submitContactForm(name: string, contactInfo: string, message: string): Promise<void>;
}

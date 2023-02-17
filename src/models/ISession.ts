export type SessionLevel = "Basic" | "Intermediate" | "Advanced";

export default interface ISession {
    id: number,
    workshopId: number,
    sequenceId: number,
    name: string,
    speaker: string,
    duration: number,
    level: SessionLevel,
    abstract: string,
    upvoteCount: number
}
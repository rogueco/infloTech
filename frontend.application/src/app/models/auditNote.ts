export interface IAuditNote {
    id: string;
    forename: string;
    surname: string;
    email: string;
    createdOn: Date;
    actionType: boolean;
    actionDescription: string;
}

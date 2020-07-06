export interface IUser {
    id: string;
    forename: string;
    surname: string;
    email: string;
    dateOfBirth: Date;
    isActive: boolean;
}

export interface IUserFormValues extends Partial<IUser> {
    forename: string;
    isActive: boolean;
}

export class UserFormValues implements IUserFormValues {
    id?: string = undefined;
    forename: string = '';
    surname: string = '';
    email: string = '';
    dateOfBirth?: Date = undefined;
    isActive: boolean = false;

    constructor(init?: IUserFormValues) {
        Object.assign(this, init);
    }
}

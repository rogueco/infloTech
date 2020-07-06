import { IUser } from '../../models/user';

export const setUserProps = (user: IUser) => {
    user.dateOfBirth = new Date(user.dateOfBirth);

    return user;
};

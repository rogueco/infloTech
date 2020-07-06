import { action, computed, observable, runInAction } from 'mobx';
import { RootStore } from './rootStore';
import { IUser } from '../models/user';
import agent from '../api/agent';
import { toast } from 'react-toastify';
import { history } from '../../index';
import { SyntheticEvent } from 'react';
import { setUserProps } from '../common/utilities/util';

export default class UserStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @observable userRegistry = new Map();
    @observable user: IUser | null = null;
    @observable target = '';
    @observable loadingInitial = false;

    @computed get getAllUsers() {
        return this.groupById(Array.from(this.userRegistry.values()));
    }

    groupById(users: IUser[]) {
        const sortedUsers = users.sort();
        return Object.entries(
            sortedUsers.reduce((users, user) => {
                const userId = user.id;
                users[userId] = users[userId]
                    ? [...users[userId], user]
                    : [user];
                return users;
            }, {} as { [key: string]: IUser[] })
        );
    }

    @action loadAllUsers = async (query?: string) => {
        this.loadingInitial = true;
        const users = await agent.Users.getAllUsers();
        runInAction('getting users', () => {
            this.userRegistry = new Map();
            users.forEach((user) => {
                this.loadingInitial = true;
                console.log(query);
                switch (query) {
                    case 'active':
                        if (user.isActive) {
                            this.userRegistry.set(user.id, user);
                        }
                        break;
                    case 'non-active':
                        if (!user.isActive) {
                            this.userRegistry.set(user.id, user);
                        }
                        break;
                    default:
                        this.userRegistry.set(user.id, user);
                        break;
                }
            });
            this.loadingInitial = false;
        });
    };

    @action loadAllActiveUsers = async () => {
        this.loadingInitial = true;
        const users = await agent.Users.getAllUsers();
        runInAction('getting users', () => {
            users.forEach((user) => {
                if (!user.isActive) {
                    this.userRegistry.set(user.id, user);
                }
            });
            this.loadingInitial = false;
        });
    };

    @action loadUser = async (id: string) => {
        let user = this.getUser(id);
        if (user) {
            this.user = user;
            return user;
        } else {
            this.loadingInitial = true;
            try {
                user = await agent.Users.getUserById(id);
                runInAction('Getting user', () => {
                    setUserProps(user);
                    this.user = user;
                    this.userRegistry.set(user.id, user);
                    this.loadingInitial = false;
                });
                return user;
            } catch (error) {
                runInAction('get user from API', () => {
                    this.loadingInitial = false;
                });
                console.log(error);
            }
        }
    };

    getUser = (id: string) => {
        return this.userRegistry.get(id);
    };

    //    submitting

    @action createUser = async (user: IUser) => {
        try {
            await agent.Users.createUser(user);
            runInAction('creating user', () => {
                this.userRegistry.set(user.id, user);
            });
            history.push(`/usersDashboard`);
        } catch (error) {
            runInAction('create user error', () => {});
            toast.error('Problem submitting data');
            console.log(error.response);
        }
    };

    @action editUser = async (user: IUser) => {
        try {
            await agent.Users.updateUser(user);
            runInAction('editing user', () => {
                this.userRegistry.set(user.id, user);
                this.user = user;
            });
            history.push(`/usersDashboard`);
        } catch (error) {
            runInAction('create editing error', () => {});
            toast.error('Problem submitting data');
            console.log(error.response);
        }
    };

    @action deleteUser = async (
        event: SyntheticEvent<HTMLButtonElement>,
        id: string
    ) => {
        this.target = event.currentTarget.name;
        try {
            await agent.Users.deleteUserById(id);
            runInAction('deleting user', () => {
                this.userRegistry.delete(id);
                this.target = '';
            });
        } catch (error) {
            runInAction('delete error', () => {
                this.target = '';
            });

            console.log(error);
        }
    };
}

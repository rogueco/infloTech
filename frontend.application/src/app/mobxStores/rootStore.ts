import { configure } from 'mobx';
import UserStore from './userStore';
import { createContext } from 'react';
import AuditNoteStore from './auditNoteStore';
import CommonStore from './commonStore';

configure({ enforceActions: 'always' });

export class RootStore {
    userStore: UserStore;
    auditNoteStore: AuditNoteStore;
    commonStore: CommonStore;

    constructor() {
        this.userStore = new UserStore(this);
        this.auditNoteStore = new AuditNoteStore(this);
        this.commonStore = new CommonStore(this);
    }
}

export const RootStoreContext = createContext(new RootStore());

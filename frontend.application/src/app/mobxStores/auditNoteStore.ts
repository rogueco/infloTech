import { RootStore } from './rootStore';
import { action, computed, observable, runInAction } from 'mobx';
import agent from '../api/agent';
import { IAuditNote } from '../models/auditNote';
import { history } from '../../index';

export default class AuditNoteStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @observable auditNoteRegistry = new Map();
    @observable auditNoteSearchedRegistry = new Map();
    @observable auditNote: IAuditNote | null = null;
    @observable loadingInitial: boolean = false;

    @computed get getAllAuditNotes() {
        return this.groupById(Array.from(this.auditNoteRegistry.values()));
    }

    @computed get getAllSearchedAuditNotes() {
        return this.groupById(
            Array.from(this.auditNoteSearchedRegistry.values())
        );
    }

    groupById(auditNotes: IAuditNote[]) {
        const sortedUsers = auditNotes.sort();
        return Object.entries(
            sortedUsers.reduce((auditNotes, auditNote) => {
                const auditNoteId = auditNote.id;
                auditNotes[auditNoteId] = auditNotes[auditNoteId]
                    ? [...auditNotes[auditNoteId], auditNote]
                    : [auditNote];
                return auditNotes;
            }, {} as { [key: string]: IAuditNote[] })
        );
    }

    @action loadAllAuditNotes = async () => {
        this.loadingInitial = true;
        const notes = await agent.AuditNotes.getAllAuditNotes();
        runInAction('getting auditNotes', () => {
            this.loadingInitial = false;
            notes.forEach((note) => {
                this.auditNoteRegistry.set(note.id, note);
            });
            this.loadingInitial = false;
        });
    };

    @action auditNoteSearch = async (searchTerm: string) => {
        this.loadingInitial = true;
        const notes = await agent.AuditNotes.getAuditNoteFuzzySearch(
            searchTerm
        );
        console.log('hit');
        runInAction('getting auditNotes', () => {
            console.log(notes);
            notes.forEach((note) => {
                this.auditNoteSearchedRegistry.set(note.id, note);

                history.push(`/search/${searchTerm}`);
            });
            this.loadingInitial = false;
        });
    };
}

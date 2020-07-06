import axios, { AxiosResponse } from 'axios';
import { IUser } from '../models/user';
import {IAuditNote} from "../models/auditNote";

axios.defaults.baseURL = 'https://localhost:5001/api';

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) =>
        axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) =>
        axios.put(url, body).then(responseBody),
    delete: (url: string) =>
        axios.delete(url).then(responseBody),
};

const Users = {
    getAllUsers : (): Promise<IUser[]> => requests.get('/user'),
    getUserById: (id: string) => requests.get(`/user/${id}`),
    createUser: (user: IUser) => requests.post(`/user`, user),
    updateUser: (user: IUser) =>
        requests.put(`/user/${user.id}`, user),
    deleteUserById: (id: string) => requests.delete(`/user/${id}`),
};

const AuditNotes = {
    getAllAuditNotes : (): Promise<IAuditNote[]> => requests.get('/userAuditNote'),
    getAuditNoteFuzzySearch: (searchTerm: string) : Promise<IAuditNote[]> => requests.get(`/userAuditNote/searchByTerm/${searchTerm}`),
    getAuditNoteById: (id: string) => requests.get(`/userAuditNote/${id}`),
    createAuditNote: (user: IUser) => requests.post(`/userAuditNote`, user),
    deleteAuditNoteById: (id: string) => requests.delete(`/userAuditNote/${id}`),
}


export default {
    Users,
    AuditNotes
};



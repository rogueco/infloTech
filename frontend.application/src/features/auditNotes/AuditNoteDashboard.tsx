import React, { Fragment, useContext, useEffect } from 'react'
import { Button, Header, Table } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { RootStoreContext } from "../../app/mobxStores/rootStore";
import NoteTable from "./NoteTable";
import { observer } from "mobx-react-lite";

const AuditNoteDashboard: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const { loadAllAuditNotes, getAllAuditNotes } = rootStore.auditNoteStore

    useEffect(() => {
        loadAllAuditNotes();
    }, [loadAllAuditNotes])

    return (
        <div>
            <Header size="huge">User Audit Log</Header>
            <Button as={NavLink} to="/users/addUser" positive content="Create Audit Note" />
            <Table fixed selectable size='large'>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Id</Table.HeaderCell>
                        <Table.HeaderCell>Forename</Table.HeaderCell>
                        <Table.HeaderCell>Surname</Table.HeaderCell>
                        <Table.HeaderCell singleLine>Email Address</Table.HeaderCell>
                        <Table.HeaderCell>Creation Date</Table.HeaderCell>
                        <Table.HeaderCell>Action Type</Table.HeaderCell>
                        <Table.HeaderCell>Action Description</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {getAllAuditNotes.map(([group, notes]) => (
                        <Fragment key={group}>
                            {notes.map((note) => (
                                <NoteTable key={note.id} auditNote={note} />
                            ))}
                        </Fragment>
                    ))}
                </Table.Body>
            </Table>
        </div>
    )
}

export default observer(AuditNoteDashboard)
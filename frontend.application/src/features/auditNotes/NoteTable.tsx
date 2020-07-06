import React from 'react'
import { Header, Table } from "semantic-ui-react";
import { IAuditNote } from "../../app/models/auditNote";
import { observer } from "mobx-react-lite";
import { format } from "date-fns";

const NoteTable: React.FC<{ auditNote: IAuditNote }> = ({ auditNote }) => {
    return (
        <Table.Row>
            <Table.Cell>
                <Header as="h4" textAlign="center">
                    {auditNote.id}
                </Header>
            </Table.Cell>
            <Table.Cell>{auditNote.forename}</Table.Cell>
            <Table.Cell>{auditNote.surname}</Table.Cell>
            <Table.Cell>{auditNote.email}</Table.Cell>

            <Table.Cell>{format(new Date(auditNote.createdOn), 'dd/MM/yyyy')}</Table.Cell>
            <Table.Cell>{auditNote.actionType}</Table.Cell>
            <Table.Cell>{auditNote.actionDescription}</Table.Cell>
        </Table.Row>
    )
}

export default observer(NoteTable)
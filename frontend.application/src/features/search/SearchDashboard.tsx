import React, { Fragment, useContext, useEffect } from 'react'
import { Header, Table, Container, Segment, Grid, Button } from "semantic-ui-react";
import { NavLink, RouteComponentProps } from "react-router-dom";
import { RootStoreContext } from "../../app/mobxStores/rootStore";
import { observer } from "mobx-react-lite";
import NoteTable from "../auditNotes/NoteTable";
import SearchForm from "./SearchForm";
import { LoadingComponent } from "../../app/layout/LoadingComponent";

interface DetailParams {
    searchTerms: string;

}

const SearchDashboard: React.FC<RouteComponentProps<DetailParams>> = ({ match, history }) => {
    const rootStore = useContext(RootStoreContext);
    const { auditNoteSearch, getAllSearchedAuditNotes, loadingInitial } = rootStore.auditNoteStore

    useEffect(() => {
        auditNoteSearch(match.params.searchTerms);
    }, [auditNoteSearch, match.params.searchTerms])

    if (loadingInitial) return <LoadingComponent content='Loading audit log...' />

    return (
        <Container fluid>
            <Segment style={{ padding: '8em 0em' }} vertical>
                <Grid container stackable verticalAlign='middle'>

                    <Grid.Row>
                        <Grid.Column width={16}>
                            <Header size="huge">Search Audit Log</Header>
                            <SearchForm />
                            <Button as={NavLink} to="/users/addUser/" positive content="Add User" />
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
                                    {getAllSearchedAuditNotes.map(([group, notes]) => (
                                        <Fragment key={group}>
                                            {notes.map((note) => (
                                                <NoteTable key={note.id} auditNote={note} />
                                            ))}
                                        </Fragment>
                                    ))}
                                </Table.Body>
                            </Table>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>

        </Container>
    )
}

export default observer(SearchDashboard)
import React, { useContext, useEffect, Fragment } from 'react'
import { Button, Header, Table, Segment, Container, Grid } from "semantic-ui-react";
import { RootStoreContext } from "../../app/mobxStores/rootStore";
import UserTable from "./UserTable";
import { NavLink, RouteComponentProps } from "react-router-dom";
import AuditNoteDashboard from "../auditNotes/AuditNoteDashboard";
import { observer } from "mobx-react-lite";
import 'mobx-react-lite/batchingForReactDom'
import { LoadingComponent } from "../../app/layout/LoadingComponent";
import SearchForm from "../search/SearchForm";

interface DetailParams {
    searchTerms: string;

}

const UsersDashboard: React.FC<RouteComponentProps<DetailParams>> = ({ match, history }) => {

    const rootStore = useContext(RootStoreContext);
    const { loadAllUsers, loadAllActiveUsers, getAllUsers, loadingInitial } = rootStore.userStore
    const active: string = 'active';
    const nonActive: string = 'non-active';

    useEffect(() => {
        loadAllUsers();
    }, [loadAllUsers, loadAllActiveUsers])

    if (loadingInitial) return <LoadingComponent content='Loading Dashboard...' />

    return (
        <Container fluid>
            <Segment style={{ padding: '8em 0em' }} vertical>
                <Grid container stackable verticalAlign='middle'>
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <Header size="huge">User Admin</Header>
                            <Button as={NavLink} to="/users/addUser/" positive content="Add User" />
                            <Table fixed selectable size='large'>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Id</Table.HeaderCell>
                                        <Table.HeaderCell>Forename</Table.HeaderCell>
                                        <Table.HeaderCell>Surname</Table.HeaderCell>
                                        <Table.HeaderCell singleLine>Email Address</Table.HeaderCell>
                                        <Table.HeaderCell>Date of Birth</Table.HeaderCell>
                                        <Table.HeaderCell>Is Active</Table.HeaderCell>
                                        <Table.HeaderCell>Actions</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {getAllUsers.map(([group, users]) => (
                                        <Fragment key={group}>
                                            {users.map((user) => (
                                                <UserTable key={user.id} user={user} />
                                            ))}
                                        </Fragment>
                                    ))}
                                </Table.Body>
                            </Table>
                            <Button.Group>
                                <Button
                                    content='Show All Users'
                                    positive
                                    onClick={() => loadAllUsers()}
                                />
                                <Button.Or />
                                <Button
                                    content='Show Active Users'
                                    color='pink'
                                    onClick={() => loadAllUsers(active)}
                                />
                                <Button.Or />
                                <Button
                                    content='Show Non-Active Users'
                                    negative
                                    onClick={() => loadAllUsers(nonActive)}
                                />
                            </Button.Group>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>

            <Segment style={{ padding: '8em 0em' }} vertical>
                <Grid container stackable verticalAlign='middle'>
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <Header size="huge">Search Audit Log</Header>
                            <SearchForm />
                            <AuditNoteDashboard />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        </Container>
    )
}

export default observer(UsersDashboard)
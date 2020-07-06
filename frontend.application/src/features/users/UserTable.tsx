import React, { useContext, Fragment } from 'react'
import { IUser } from "../../app/models/user";
import { Table, Header, Button, Modal } from 'semantic-ui-react';
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";
import { RootStoreContext } from "../../app/mobxStores/rootStore";
import { format } from 'date-fns';
import ViewModal from "./ViewModal";

const UserTable: React.FC<{ user: IUser }> = ({ user }) => {

    const rootStore = useContext(RootStoreContext);
    const { deleteUser } = rootStore.userStore;

    return (
        <Table.Row>
            <Table.Cell>
                <Header as="h4" textAlign="center">
                    {user.id}
                </Header>
            </Table.Cell>
            <Table.Cell>{user.forename}</Table.Cell>
            <Table.Cell>{user.surname}</Table.Cell>
            <Table.Cell singleLine>{user.email}</Table.Cell>

            <Table.Cell>{format(new Date(user.dateOfBirth), 'dd/MM/yyyy')}</Table.Cell>
            <Table.Cell>{user.isActive ? "Yes" : "No"}</Table.Cell>
            <Table.Cell width={3}>
                <Fragment>
                    <Button.Group vertical labeled icon>
                        <Modal trigger={<Button icon='angle right' color='teal' size='mini' content='View' />}>
                            <ViewModal user={user} />
                        </Modal>
                        <Button
                            as={NavLink}
                            to={`/users/manage/${user.id}`}
                            icon='edit'
                            color='green'
                            content="Edit"
                            size='mini'
                        />
                        <Modal trigger={<Button icon='delete' negative size='mini' content='Delete' />} centered={false}>
                            <Modal.Content>
                                <Modal.Description>
                                    <Header>Are you sure you want to delete this user?</Header>
                                    <Button
                                        onClick={(e) => deleteUser(e, user.id)}
                                        negative
                                        color='red'
                                        content="Delete"
                                    />
                                </Modal.Description>
                            </Modal.Content>
                        </Modal>
                    </Button.Group>
                </Fragment>
            </Table.Cell>
        </Table.Row>
    )
}

export default observer(UserTable)
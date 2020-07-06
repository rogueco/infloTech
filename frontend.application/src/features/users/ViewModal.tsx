import React, { Fragment } from 'react'
import { Button, Modal, Header, Image, List } from "semantic-ui-react";
import { IUser } from "../../app/models/user";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";

const ViewModal: React.FC<{ user: IUser }> = ({ user }) => {
    return (
        <Fragment>
            <Modal.Header>{user.forename} {user.surname}</Modal.Header>
            <Modal.Content image>
                <Image wrapped size='medium' src='https://react.semantic-ui.com/images/avatar/large/matthew.png' />
                <Modal.Description>
                    <Header>{user.forename} {user.surname}</Header>
                    <List>
                        <List.Item>
                            <List.Icon name='users' />
                            <List.Content>Account Active <strong>{(user.isActive ? "Yes" : "No")}</strong></List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Icon name='marker' />
                            <List.Content>Date Of Birth: <strong>{user.dateOfBirth}</strong></List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Icon name='mail' />
                            <List.Content>
                                <a href={`mailto:${user.email}`}>{user.email}</a>
                            </List.Content>
                        </List.Item>
                    </List>
                    <p>Is it okay to use this photo?</p>

                    <br />
                    <Button.Group>
                        <Button
                            as={NavLink}
                            to={`/users/manage/${user.id}`}
                            icon='edit'
                            color='green'
                            content="Edit"
                            size='mini'
                        />
                    </Button.Group>
                </Modal.Description>
            </Modal.Content>
        </Fragment>

    )
}

export default observer(ViewModal)
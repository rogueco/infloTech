import React from 'react'
import { Button, Container, Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

const NavBar: React.FC = () => {
    return (
        <Menu fixed='top' inverted>
            <Container>
                <Menu.Item header as={NavLink} exact to='/' >
                    Home Page
                </Menu.Item>
                <Menu.Item name='Users' as={NavLink} to='/usersDashboard' />
                <Menu.Item>
                    <Button
                        as={NavLink} to='/users/addUser'
                        positive
                        content='Add User'
                    />
                </Menu.Item>
            </Container>
        </Menu>
    )
}

export default NavBar
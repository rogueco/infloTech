import React from 'react'
import { Container, Grid, Header, Button, Segment, List } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

const HomePage: React.FC = () => {
    return (
        <Container text className='homepage-default--layout'>
            <Segment style={{ padding: '8em 0em' }} vertical>
                <Grid container stackable verticalAlign='middle'>
                    <Grid.Row>
                        <Grid.Column width={16} >
                            <Header as='h1' style={{ fontSize: '3em' }} textAlign='center'>
                                React Application W/.NET Core
                            </Header>
                            <p style={{ fontSize: '1.33em' }}>
                                This is a small React application, that implements a .NET web API. Whilst I would like to develop the style of the application further, I have implemented the application more as a proof of concept and I hope it gives you an idea on how I would approach a project in the following stack.
                            </p>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column textAlign='center'>
                            <Button
                                size="huge"
                                as={NavLink}
                                to='users/addUser'
                                positive
                                content='Add User' />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
            <Segment style={{ padding: '8em 0em' }} vertical>
                <Grid container stackable verticalAlign='middle'>
                    <Grid.Row>
                        <Grid.Column width={8} >
                            <Header as='h3' style={{ fontSize: '2em' }}>
                                React Specifications
                            </Header>
                            <p style={{ fontSize: '1.33em' }}>
                                The core React components are as following:
                                <br />
                                <List bulleted>
                                    <List.Item>React-Semantic-UI</List.Item>
                                    <List.Item>React-Final-Form</List.Item>
                                    <List.Item>Axios</List.Item>
                                    <List.Item>MobX</List.Item>
                                    <List.Item>Date-fns</List.Item>
                                </List>
                            </p>
                        </Grid.Column>
                        <Grid.Column width={8} >
                            <Header as='h3' style={{ fontSize: '2em' }}>
                                .NET Core API
                            </Header>
                            <p style={{ fontSize: '1.33em' }}>
                                The .NET Core components:
                                <br />
                                <List bulleted>
                                    <List.Item>Mediator Pattern</List.Item>
                                    <List.Item>Entity FrameworkCore</List.Item>
                                    <List.Item>SqlLite DataBase</List.Item>
                                    <List.Item>FluentValidation</List.Item>
                                    <List.Item>DependencyInjection</List.Item>
                                </List>
                            </p>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>

            <Segment style={{ padding: '8em 0em' }} vertical>
                <Container text>
                    <Header as='h3' style={{ fontSize: '2em' }}>
                        Progression
                    </Header>
                    <p style={{ fontSize: '1.33em' }}>
                        There are a few things which I would look to implement in a larger project.
                        <br />
                        <List bulleted>
                            <List.Item>AutoMapper</List.Item>
                            <List.Item>DTO's</List.Item>
                            <List.Item>IServiceAccessors</List.Item>
                            <List.Item>Notifications (success, failure)</List.Item>
                            <List.Item>Audit Note pagination</List.Item>
                        </List>
                    </p>
                </Container>
            </Segment>
        </Container>
    )
}

export default HomePage
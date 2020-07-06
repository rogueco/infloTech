import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Form, Grid, Header, Segment } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';
import { Field, Form as FinalForm } from 'react-final-form'
import { RootStoreContext } from "../../app/mobxStores/rootStore";
import { UserFormValues } from "../../app/models/user";
import TextInput from "../../app/common/form/TextInput";
import DateInput from "../../app/common/form/DateInput";
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import "react-datepicker/dist/react-datepicker.css";



interface DetailParams {
    id: string;

}

const UserForm: React.FC<RouteComponentProps<DetailParams>> = ({ match, history }) => {
    const rootStore = useContext(RootStoreContext);
    const { createUser, editUser, loadUser } = rootStore.userStore;

    const [user, setUser,] = useState(new UserFormValues());
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (match.params.id) {
            setLoading(true);
            loadUser(match.params.id).then(
                (user) => setUser(new UserFormValues(user))
            ).finally(() => setLoading(false))
        }
    }, [loadUser, match.params.id]);

    const handleFinalFormSubmit = (values: any) => {
        const { date, ...user } = values;

        if (!user.id) {
            let newUser = {
                ...user,
            };
            createUser(newUser);
        } else {
            editUser(user);
        }
    }

    const required = (value: string) => (value ? undefined : 'Required')
    const dateRequired = (value: Date) => (value ? undefined : 'Required')

    return (
        <Container fluid>
            <Segment style={{ padding: '8em 0em' }} vertical>
                <Grid container stackable verticalAlign='middle'>
                    <Grid.Row>
                        <Grid.Column width={16}>
                            {!user.surname ? (
                                <Header as='huge' content='Create User' />
                            ) :
                                (<Header as='huge' content='Edit User' />)
                            }
                            <FinalForm
                                initialValues={user}
                                onSubmit={handleFinalFormSubmit}
                                render={({ handleSubmit, invalid, pristine }) => (
                                    <Form loading={loading} onSubmit={handleSubmit}>
                                        <Field
                                            name='forename'
                                            placeholder='forename'
                                            value={user.forename}
                                            component={TextInput}
                                            validate={required}
                                        />
                                        <Field
                                            name='surname'
                                            placeholder='surname'
                                            value={user.surname}
                                            component={TextInput}
                                            validate={required}
                                        />
                                        <Field
                                            name='email'
                                            placeholder='email'
                                            value={user.email}
                                            component={TextInput}
                                            validate={required}
                                            type='email'
                                        />

                                        <Field
                                            name='dateOfBirth'
                                            date={true}
                                            placeholder='Date'
                                            value={user.dateOfBirth}
                                            component={DateInput}
                                            validate={dateRequired}
                                        />


                                        <Form.Checkbox
                                            type='checkbox'
                                            name='isActive'
                                            label='Is Account Active?'
                                            value='isActive'
                                        />

                                        <Button
                                            disabled={loading || invalid || pristine}
                                            floated='right'
                                            positive
                                            type='submit'
                                            content='Submit'
                                        />
                                    </Form>
                                )}
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        </Container>

    );
};

export default observer(UserForm);
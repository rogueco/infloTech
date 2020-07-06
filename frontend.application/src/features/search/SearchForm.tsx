import React, { useContext, useState } from 'react'
import { Button, Form, Grid } from "semantic-ui-react";
import { Field, Form as FinalForm } from "react-final-form";
import TextInput from "../../app/common/form/TextInput";
import { RootStoreContext } from "../../app/mobxStores/rootStore";
import { observer } from "mobx-react-lite";



const SearchForm: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const { auditNoteSearch } = rootStore.auditNoteStore;
    const [loading] = useState(false);

    const handleFinalFormSubmit = (values: any) => {
        const { searchTerms } = values;

        auditNoteSearch(searchTerms)
    }

    return (
        <Grid>
            <Grid.Column width={16}>
                <FinalForm
                    onSubmit={handleFinalFormSubmit}
                    render={({ handleSubmit, invalid, pristine }) => (
                        <Form loading={loading} onSubmit={handleSubmit}>
                            <Field
                                name='searchTerms'
                                placeholder='Search Term'
                                component={TextInput}
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
        </Grid>
    )
}

export default observer(SearchForm)
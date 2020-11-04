import React from 'react';
import Header from '../../components/Header';
import { Button, Form, Grid, TextArea, Icon } from 'semantic-ui-react'
import '../../App.css';
const SummarizeContainer = () => {
    return (
        <div>
            <Header />
            <Grid container columns={2} relaxed stackable centered>
                <Grid.Column>
                    <Form style={{resize : "none"}}>
                        <TextArea placeholder='Copy/Paste the text here' />
                    </Form>
                </Grid.Column>
                <Grid.Column>
                    <Form>
                        <TextArea readOnly={true} placeholder='Output text summary' />
                    </Form>
                </Grid.Column>
            </Grid>
            <Grid container columns={2} stackable centered >
                <Grid.Column textAlign="right">
                    <Button style={{width:150}} primary>
                        <Icon name="compress"></Icon>
                        Summarize
                        </Button>
                </Grid.Column>
                <Grid.Column textAlign="left">
                    <Button style={{width:150}} primary>
                        <Icon name="save"></Icon>
                        Save
                    </Button>
                </Grid.Column>
            </Grid>
        </div>
    );
};

export default SummarizeContainer;
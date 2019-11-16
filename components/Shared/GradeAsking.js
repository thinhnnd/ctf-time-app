import React, { Component } from "react";
import Dialog from "react-native-dialog";


export default class GradeAsking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogVisible: this.props.dialogVisible
        };
    }


    showDialog = () => {
        this.setState({ dialogVisible: true });
    };

    handleCancel = () => {
        this.setState({ dialogVisible: false });
    };

    handleSubmit = () => {
        // The user has pressed the "Delete" button, so here you can do your own logic.
        // ...Your logic
        this.setState({ dialogVisible: false });
        this.toggleDialog();
    };

    handleDelete = () => {
        // The user has pressed the "Delete" button, so here you can do your own logic.
        // ...Your logic
        this.setState({ dialogVisible: false });
    };


    render() {
        return (
            <Dialog.Container visible={this.state.dialogVisible}>
                <Dialog.Title>Updade score</Dialog.Title>
                <Dialog.Description>
                    Please insert a new score: 
                </Dialog.Description>
                <Dialog.Input />
                <Dialog.Button label="Submit" onPress={this.handleSubmit} />
            </Dialog.Container>
        )
    }
}
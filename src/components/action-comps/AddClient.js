import React, { Component } from 'react'
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class AddClient extends Component {

    constructor() {
        super()
        this.state = {
            firstName: "",
            surname: "",
            email: "",
            country: "",
            owner: ""
        }
    }

    handleInput = e => this.setState({ [e.target.name]: e.target.value })

    isStateSet = () => {
        let isStateSet = true
        let stateKeys = Object.keys(this.state)
        stateKeys.forEach(sk => this.state[sk] ? null : isStateSet = false)

        return isStateSet
    }

    saveClient = async (client) => {
        await axios.post('http://localhost:3001/client', client)
    }

    addClient = () => {
        if (this.isStateSet()) {
            let client = {
                name: `${this.state.firstName} ${this.state.surname}`,
                email: this.state.email,
                firstContact: new Date(),
                owner: this.state.owner,
                country: this.state.country
            }
            this.saveClient(client)
        }
    }

    render() {
        return (
            <div id="create-action">
                <h3>ADD CLIENT</h3>

                <div id="input-fields">


                    <TextField
                        id="standard-name"
                        label="First Name"
                        name="firstName"
                        value={this.state.firstName} onChange={this.handleInput}
                        margin="normal"
                    />

                    <TextField
                        id="standard-name"
                        label="Surname"
                        name="surname" value={this.state.surname} onChange={this.handleInput}
                        margin="normal"
                    />

                    <TextField
                        id="standard-name"
                        label="Email"
                        name="email" value={this.state.email} onChange={this.handleInput}
                        margin="normal"
                    />

                    <TextField
                        id="standard-name"
                        label="Country"
                        name="country" value={this.state.country} onChange={this.handleInput}
                        margin="normal"
                    />

                    <TextField
                        id="standard-name"
                        label="Owner"
                        name="owner" value={this.state.owner} onChange={this.handleInput}
                        margin="normal"
                    />

                    <Button id="add-client-btn" onClick={this.addClient} variant="contained" color="primary">Add New Client</Button>

                </div>
                {/* <span>First name: </span>
                <input type="text" name="firstName" value={this.state.firstName} onChange={this.handleInput} />
                <span>Surname: </span>
                <input type="text" name="surname" value={this.state.surname} onChange={this.handleInput} />
                <span>Email: </span>
                <input type="text" name="email" value={this.state.email} onChange={this.handleInput} />
                <span>Country: </span>
                <input type="text" name="country" value={this.state.country} onChange={this.handleInput} />
                <span>Owner: </span>
                <input type="text" name="owner" value={this.state.owner} onChange={this.handleInput} /> */}
                {/* <div id="add-client-btn" onClick={this.addClient}>Add New Client</div> */}
            </div>
        )
    }
}

export default AddClient
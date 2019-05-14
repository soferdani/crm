import React, { Component } from 'react'
import TableHeader from './TableHeader';
import axios from 'axios'
import ClientRow from './ClientRow';
import '../styles/Clients.css'


class Clients extends Component {

    constructor() {
        super()
        this.state = {
            clients: [],
            searchFilter: "",
            selectedFilter: "name",
            pageNum: 1
        }
    }

    handleFilter = e => this.setState({ [e.target.name]: e.target.value })

    getClients = async () => {
        let clients = await axios.get('http://localhost:3001/clients')
        return clients.data
    }

    componentDidMount = async () => {
        let clients = await this.getClients()
        this.setState({ clients })
    }

    currentClients = () => this.state.clients.slice((this.state.pageNum * 20) - 20, this.state.pageNum * 20)

    filterClients = () => {

        if (this.state.selectedFilter !== "sold") {
            return this.currentClients()
                .filter(c => c[this.state.selectedFilter].toLowerCase()
                    .includes(this.state.searchFilter.toLowerCase()))
        } else {
            return this.currentClients().filter(c => c.sold)
        }
    }

    pageUp = () => {
        if (this.state.pageNum * 20 > this.state.clients.length) { return }

        let pageNum = this.state.pageNum + 1
        this.setState({ pageNum })
    }

    pageDown = () => {
        if (this.state.pageNum === 1) { return }

        let pageNum = this.state.pageNum - 1
        this.setState({ pageNum })
    }

    showCurrentClientNum = () => {

        let topNum = this.state.pageNum * 20
        let lowNum = topNum - 19

        return (
            <div id="paging">
                <i className="fas fa-chevron-left" onClick={this.pageDown}></i>
                <p>{lowNum} - {this.state.pageNum * 20 > this.state.clients.length && this.state.clients.length ? 'END' : topNum}</p>
                <i className="fas fa-chevron-right" onClick={this.pageUp}></i>
            </div>
        )
    }

    render() {

        return (
            <div id="clients-page">
                <div id="search-container">

                    <input type="text" name="searchFilter" placeholder="Search" value={this.state.search} onChange={this.handleFilter} id="search-clients-input" />
                    <select id="select-filter" name="selectedFilter" value={this.state.selectedFilter} onChange={this.handleFilter}>
                        <option value="name">Name</option>
                        <option value="email">Email</option>
                        <option value="sold">Sold</option>
                        <option value="owner">Owner</option>
                        <option value="country">Country</option>
                    </select>
                </div>
                <div id="table">
                    <TableHeader />
                    {this.filterClients().map(c => <ClientRow client={c} key={c._id} />)}
                    {this.showCurrentClientNum()}
                </div>
            </div>
        )
    }
}

export default Clients
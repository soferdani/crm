import React, { Component } from 'react'
import Badge from './Badge';

class Badges extends Component {

    constructor() {
        super()
        this.state = {
            isLoading: true
        }
    }

    getMonthName = (date = new Date()) => new Intl.DateTimeFormat('en-US', {month: "long"}).format(date)

    getNumNewClients = clients => {
        const currentMonth = new Date().getMonth()

        return clients.filter(c => (new Date(c.firstContact).getMonth()) === currentMonth).length
    }

    getNumEmailsSent = clients => clients.filter(c => c.emailType).length

    getNumOutstandingClients = clients => clients.filter(c => !c.sold).length

    getHottestCountry = clients => {
        let clientsPerCountry = {}
        clients.forEach(c => clientsPerCountry[c.country] ? clientsPerCountry[c.country]++ : clientsPerCountry[c.country] = 1)
    
        let countries = Object.keys(clientsPerCountry)
        let maxClients = 0
        let hottestCountry = ""

        countries.forEach(c => {
            if(clientsPerCountry[c] > maxClients){
                maxClients = clientsPerCountry[c]
                hottestCountry = c
            }
        })

        return hottestCountry
    }

    createBadgeElements = clients => {
        let badgeElements = {
            newClients: {
                data: this.getNumNewClients(clients),
                icon: 'fas fa-chart-line',
                sentence: `New ${this.getMonthName()} Clients`,
                color: '#2ECC71'
            },
            emailsSent: {
                data: this.getNumEmailsSent(clients),
                icon: 'fas fa-envelope',
                sentence: "Emails Sent",
                color: '#3498DB'
            },
            outstandingClients: {
                data: this.getNumOutstandingClients(clients),
                icon: 'fas fa-users',
                sentence: "Outstanding Clients",
                color: '#E74C3C'
            },
            hottestCountry: {
                data: this.getHottestCountry(clients),
                icon: 'fas fa-globe-americas',
                sentence: "Hottest Country",
                color: '#F1C40F'
            }
        }

        return badgeElements
    }

    render() {
        let badgeElements = this.createBadgeElements(this.props.clients)
        let badgeCategories = Object.keys(badgeElements)

        if(this.props.clients.length && this.state.isLoading) { this.setState({isLoading: false}) }

        return (
            <div id="badges-container">
                {this.state.isLoading ? "show loader" : badgeCategories.map(bc => <Badge key={bc} badgeCategory={badgeElements[bc]} />)}
            </div>
        )
    }
}

export default Badges
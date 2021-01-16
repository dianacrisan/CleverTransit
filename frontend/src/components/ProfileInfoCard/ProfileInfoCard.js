import React from "react"
import Card from 'react-bootstrap/Card'
import './ProfileInfoCard.css'

export default class ProfileInfoCard extends React.Component {

    constructor(props){
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className="infoCard-container">

                <Card>
                    <Card.Title>My information</Card.Title>
                    <Card.Text>Name: Robert Eftene</Card.Text>
                    <Card.Text>Mail: roberteftene25@gmail.com</Card.Text>
                    <Card.Text>Password: blabla</Card.Text>
                </Card>

            </div>
        );
    }

}
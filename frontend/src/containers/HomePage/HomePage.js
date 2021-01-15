import React from "react"
import './HomePage.css'
import Card from 'react-bootstrap/Card'
import axios from 'axios'
import ReviewInfo from "../../components/ReviewCard/ReviewInfo"
import ActiveUserCard from  "../../components/ActiveUserCard/ActiveUserCard"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default class HomePage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            latestReviews:[],
            activeUsers:[],
            activeUsersProfileImages:["AvatarMale","AvatarMale2","AvatarFemale"]
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3000/latest-reviews')
        .then(res => {
            const reviews = res.data;
            this.setState({latestReviews: reviews})
        })
        axios.get('http://localhost:3000/active-users')
        .then(res => {
            const activeUsers = res.data;
            this.setState({activeUsers:activeUsers});
        })
        
    }

    getNoLikes = (userId) => {
        let noLikes = 0;
        this.state.activeUsers.map((activeUser) => {
            if(activeUser.id === userId) {
                for (let index = 0; index < activeUser.reviews.length; index++) {
                    noLikes += activeUser.reviews[index].review_noLikes;
                }
            }
        })
        return noLikes;
    }

    render() {
        return (
            <>
            <Row>

                <Col sm={4}>

                <Card className="latest-card">
                <Card.Body>
                <Card.Title>Latest experiences with public transport in Bucharest</Card.Title>
                {this.state.latestReviews.map((review) => {
                let smileyFaces = [];
                for(let i = 0; i <review.satisfaction_level; i++) {
                smileyFaces.push(<i className="faces fas fa-smile"></i>);
                }
                return(
                    <ReviewInfo
                        reviewId={review.id} 
                        reviewTitle={review.review_title}
                        reviewStartPoint={review.start_point}
                        reviewEndPoint={review.end_point}
                        reviewCongestion={review.congestion_level}
                        reviewSmileyFaces={smileyFaces}
                        reviewObservations={review.observations}
                        reviewLeavingHour={review.leaving_hour}
                        reviewDuration={review.duration}
                        reviewLikes={review.review_noLikes}
                    ></ReviewInfo>
                )
                } 
                )}
                </Card.Body>
            </Card>

                </Col>

                <Col sm={8}>
                <Card className="active-users">
                <Card.Body>

                <Card.Title>Most Active Users</Card.Title>
                <Row className={"d-flex justify-content-center"}>
                {this.state.activeUsers.map((user,index) => {
                    return(

                    <ActiveUserCard 
                    key={user.id}
                    reviews={user.reviews}
                    userFirstName={user.first_name}
                    userLastName={user.last_name}
                    noLikes={this.getNoLikes(user.id)}
                    activeUsersProfileImages={this.state.activeUsersProfileImages[index]}
                    ></ActiveUserCard>
                    )
                })
                }
                </Row>
                </Card.Body>
                </Card>    
                </Col>    

            </Row>

           
            </>
        )
    }

}


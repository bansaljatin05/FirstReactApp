import React, {Component} from 'react';
import {Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, CardHeader } from 'reactstrap';
import {ul, li} from 'reactstrap';


class DishDetails extends Component {

    constructor(props) {
        super(props);
    }

    renderComments(comments) {
        
        if(comments != null) {
            return (
                <div>
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {
                            comments.map((Dcomment)=>{
                                return (
                                    <li>
                                        <p>{Dcomment.comment}</p>
                                        <p>--{Dcomment.author}, {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(Dcomment.date)))}</p>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
            );
        } else {
            return (<div></div>)
        }


    }

    render() {  
            if(this.props.selecteddish != null) {
                return (
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                        <Card>
                            <CardImg width="100%" src={this.props.selecteddish.image} alt={this.props.selecteddish.name} />
                            <CardBody>
                                <CardTitle>{this.props.selecteddish.name}</CardTitle>
                                <CardText>{this.props.selecteddish.description}</CardText>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        {this.renderComments(this.props.selecteddish.comments)}
                    </div>
                    
                    </div>
                );
            } else {
                return(<div></div>);
            }
        } 
    }

export default DishDetails;
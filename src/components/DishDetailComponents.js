import React from 'react';
import {Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, CardHeader } from 'reactstrap';

   function Renderdish({dish}) {
        if(dish!=null) {
            return(
                <div className="col-12 col-md-5 m-1">
                    <Card>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            );
        } else {
            return (<div></div>);
        }
   }
    function RenderComments({comments}) {
        
        if(comments != null) {
            return (
                <div className="col-12 col-md-5 m-1">
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
            return (<div></div>);
        }
    }
    const DishDetails = (props) => {
        if(props.selecteddish != null) {
            return (
                <div className="row">
                    <Renderdish dish = {props.selecteddish}/>
                    <RenderComments comments = {props.selecteddish.comments}/>
                </div>
            );
        } else {
            return(<div></div>);
        }
    } 
    

export default DishDetails;
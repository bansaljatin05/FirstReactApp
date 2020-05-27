import React, { Component } from 'react';
import {Col, Row, Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import {Link} from 'react-router-dom';
import { LocalForm, Control, Errors } from 'react-redux-form';
import {Loading } from './LoadingComponent';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
    class CommentForm extends Component {
        constructor(props) {
            super(props);

            this.state={
                isModalOpen: false
            }

            this.toggleModal = this.toggleModal.bind(this);
        }

        toggleModal() {
            this.setState({
                isModalOpen: !this.state.isModalOpen
            })
        }

        handleSubmit = (values) => {
            this.props.addComment(this.props.dishId, values.rating, values.yourname, values.comment);
        }

        render() {

            return(
                <div className="row">
                    <Button outline onClick={this.toggleModal}>
                        <span className="fa fa-pencil fa-lg">Submit Comment</span>
                    </Button>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader>
                            <h3>Submit Comment</h3>
                        </ModalHeader>
                        <ModalBody>
                            <div className="container">
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                <Row className="form-group">
                                    <Label htmlFor="rating">Rating</Label>
                                    <Control.select model=".rating" name="contactType"
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="yourname">Your Name</Label>
                                    <Control.text model=".yourname" id="yourname" name="yourname"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".yourname"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="comment">Comment</Label>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        placeholder="Write your comments here" rows="8"
                                        className="form-control"
                                    />
                                </Row>
                                <Row className="form-group">
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Row>
                            </LocalForm>
                            </div>
                        </ModalBody>
                    </Modal>
                </div>
            )

        }
    }

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
    function RenderComments({comments, addComment, dishId}) {
        
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
                    <CommentForm dishId={dishId} addComment={addComment}/>
                </div>
                
            );
        } else {
            return (<div></div>);
        }
    }
    const DishDetails = (props) => {
        if(props.isLoading) {
            return(
                <div className="conatainer">
                    <div className="row">
                        <Loading/>
                    </div>
                </div>
            );
        } else if(props.errMess) {
            return(
                <div className="conatainer">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if(props.dish != null) {
            console.log(props.comments);
            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr/>
                        </div>
                    </div>
                    <div className="row">
                        <Renderdish dish = {props.dish}/>
                        <RenderComments comments = {props.comments} addComment={props.addComment} dishId={props.dish.id}/>
                    </div>
                </div>
            );
        } else {
            return(<div></div>);
        }
    } 
    

export default DishDetails;
import React from 'react';
import { Component } from 'react';
import Menu from './MenuComponents';
import DishDetails from './DishDetailComponents';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import {Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutUsComponent';
import {connect} from 'react-redux';     
import { addComment } from '../redux/ActionCreators'   

const mapStateToProps = state => ({
    dishes: state.dishes,
    comments: state.comments,
    leaders: state.leaders,
    promotions: state.promotions
})

const mapDispatchToProps = (dispatch) => ({
    addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment))
});

class Main extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const HomePage = () => {
            return (
                <Home dish={this.props.dishes.filter((dish) => dish.featured)[0]}
                    promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
                    leader={this.props.leaders.filter((leader) => leader.featured)[0]}
                />
            );
        }

        const DishWithID = ({match}) => {
            return (
                <DishDetails dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishID,10))[0]} comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishID,10))} addComment={this.props.addComment}/>
            );
        }

        return (
            <div>
                <Header/>
                <Switch> 
                    <Route path="/home"><HomePage/></Route>
                    <Route exact path="/menu" component={() => <Menu dishes = {this.props.dishes}/>}/>
                    <Route path="/menu/:dishID" component={DishWithID}></Route>
                    <Route exact path="/contactus"><Contact/></Route>
                    <Route exact path="/aboutus" component={() => <About leaders={this.props.leaders}/>}/>
                    <Redirect to="/home" />
                </Switch>
                <Footer/>
            </div>
        );
    }

}
 

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

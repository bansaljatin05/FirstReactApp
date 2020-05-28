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
import { postComment, fetchDishes, fetchComments, fetchPromos } from '../redux/ActionCreators';
import {actions} from 'react-redux-form';   

const mapStateToProps = state => ({
    dishes: state.dishes,
    comments: state.comments,
    leaders: state.leaders,
    promotions: state.promotions
})

const mapDispatchToProps = (dispatch) => ({
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
    fetchDishes: () => {dispatch(fetchDishes())},
    resetFeedbackForm: () => {dispatch(actions.reset('feedback'))},
    fetchComments: () => {dispatch(fetchComments())},
    fetchPromos: () => {dispatch(fetchPromos())}
});

class Main extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchPromos();
        this.props.fetchComments();
    }

    render() {

        const HomePage = () => {
            return (
                <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                    dishesLoading={this.props.dishes.isLoading}
                    dishesErrMess={this.props.dishes.errMess}
                    promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
                    promosLoading={this.props.promotions.isLoading}
                    promosErrMess={this.props.promotions.errMess}
                    leader={this.props.leaders.filter((leader) => leader.featured)[0]}
                />
            );
        }

        const DishWithID = ({match}) => {
            return (
                <DishDetails dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishID,10))[0]}
                isLoading={this.props.dishes.isLoading}
                errMess={this.props.dishes.errMess}
                comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishID,10))}
                commentsErrMess={this.props.comments.errMess} 
                postComment={this.props.postComment}/>
            );
        }

        return (
            <div>
                <Header/>
                <Switch> 
                    <Route path="/home"><HomePage/></Route>
                    <Route exact path="/menu" component={() => <Menu dishes = {this.props.dishes}/>}/>
                    <Route path="/menu/:dishID" component={DishWithID}></Route>
                    <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm}/>}/>
                    <Route exact path="/aboutus" component={() => <About leaders={this.props.leaders}/>}/>
                    <Redirect to="/home" />
                </Switch>
                <Footer/>
            </div>
        );
    }

}
 

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

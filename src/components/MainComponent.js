import React from 'react';
import { Component } from 'react';
import Menu from './MenuComponents';
import {DISHES} from '../shared/dishes';
import DishDetails from './DishDetailComponents';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import {Switch, Route, Redirect } from 'react-router-dom';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import {COMMENTS} from '../shared/comments';
import {LEADERS} from '../shared/leaders';
import {PROMOTIONS} from '../shared/promotions';
import About from './AboutUsComponent';

class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dishes: DISHES,
            selectedDish: null,
            comments: COMMENTS,
            promotions: PROMOTIONS,
            leaders: LEADERS

        };
    }

    render() {

        const HomePage = () => {
            return (
                <Home dish={this.state.dishes.filter((dish) => dish.featured)[0]}
                    promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
                    leader={this.state.leaders.filter((leader) => leader.featured)[0]}
                />
            );
        }

        const DishWithID = ({match}) => {
            return (
                <DishDetails dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishID,10))[0]} comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishID,10))}/>
            );
        }

        return (
            <div>
                <Header/>
                <Switch> 
                    <Route path="/home"><HomePage/></Route>
                    <Route exact path="/menu" component={() => <Menu dishes = {this.state.dishes}/>}/>
                    <Route path="/menu/:dishID" component={DishWithID}></Route>
                    <Route exact path="/contactus"><Contact/></Route>
                    <Route exact path="/aboutus" component={() => <About leaders={this.state.leaders}/>}/>
                    <Redirect to="/home" />
                </Switch>
                <Footer/>
            </div>
        );
    }

}
 

export default Main;

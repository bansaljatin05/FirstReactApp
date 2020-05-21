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
import {COMMENTS} from '../shared/comments'
import {LEADERS} from '../shared/leaders'
import {PROMOTIONS} from '../shared/promotions'

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

    onDishSelect(dishID) {
        this.setState( {selectedDish: dishID} );
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

        return (
            <div>
                <Header/>
                <Switch> 
                    <Route path="/home"><HomePage/></Route>
                    <Route exact path="/menu" component={() => <Menu dishes = {this.state.dishes}/>}/>
                    <Route exact path="/contactus"><Contact/></Route>
                    <Redirect to="/home" />
                </Switch>
                <Footer/>
            </div>
        );
    }

}
 

export default Main;

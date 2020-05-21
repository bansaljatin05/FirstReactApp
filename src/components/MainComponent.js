import React from 'react';
import { Component } from 'react';
import Menu from './MenuComponents';
import {DISHES} from '../shared/dishes';
import DishDetails from './DishDetailComponents';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import {Switch, Route, Redirect } from 'react-router-dom';
import Home from './HomeComponent';
class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dishes: DISHES,
            selectedDish: null
        };
    }

    onDishSelect(dishID) {
        this.setState( {selectedDish: dishID} );
    }

    render() {

        const HomePage = () => {
            return (
                <Home/>
            );
        }

        return (
            <div>
                <Header/>
                <Switch> 
                    <Route path="/home" component={HomePage}/>
                    <Route exact path="/menu" component={() => <Menu dishes = {this.state.dishes}/>}/>
                    <Redirect to="/home" />
                </Switch>
                <Footer/>
            </div>
        );
    }

}
 

export default Main;

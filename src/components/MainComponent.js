import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import { Component } from 'react';
import Menu from './MenuComponents';
import {DISHES} from '../shared/dishes';
import DishDetails from './DishDetailComponents';


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
        return (
            <div className="container">
                <Navbar dark color="primary">
                    <div className="container">
                    <NavbarBrand href="/">Restorante Con Fusion</NavbarBrand>
                    </div>
                </Navbar>
                <Menu dishes = {this.state.dishes} 
                onClick={(dishID) => this.onDishSelect(dishID)}/>
                <DishDetails selecteddish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]}></DishDetails>
            </div>
        );
    }

}
 

export default Main;

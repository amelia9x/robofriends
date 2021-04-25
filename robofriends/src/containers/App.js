import { React, useState, useEffect } from 'react';
import { connect } from "react-redux";
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css'

import { setSearchField } from "../actions";

const mapStateToProps = state => {
    return {
        searchField: state.searchField
    }
}

const mapDispatchToPros = dispatch => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value))
    }
}

function App(props) {
    const [robots, setRobots] = useState([]);
    //const [searchField, setSearchField] = useState('');
    const [count, setCount] = useState(0);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then(users => setRobots(users));
        console.log(count)
    }, [count])

    // const onSearchChange = (event) => {
    //     setSearchField(event.target.value)
    // }

    const filteredRobots = robots.filter((robot) => {
        return robot.name.toLowerCase().includes(props.searchField.toLowerCase());
    });
    if (robots.length === 0) {
        return <h1 className='tc'>Loading ...</h1>
    } else {
        return (
            <div className='tc' >
                <h1 className='f1'>RoboFriends</h1>
                <button onClick={() => setCount(count + 1)}>Click Me!</button>
                <SearchBox searchChange={props.onSearchChange} />
                <Scroll>
                    <ErrorBoundary>
                        <CardList robots={filteredRobots} />
                    </ErrorBoundary>
                </Scroll>
            </div>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToPros)(App);
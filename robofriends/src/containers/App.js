import { React, useState, useEffect } from 'react';
import { connect } from "react-redux";
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css'

import { setSearchField, requestRobots } from "../actions";

const mapStateToProps = state => {
    return {
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error,
    }
}

const mapDispatchToPros = dispatch => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        onRequestRobots: () => dispatch(requestRobots())
    }
}

function App(props) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        props.onRequestRobots();
        console.log(count)
    }, [count])

    const { searchField, onSearchChange, robots, isPending } = props;

    const filteredRobots = robots.filter((robot) => {
        return robot.name.toLowerCase().includes(searchField.toLowerCase());
    });
    if (isPending) {
        return <h1 className='tc'>Loading ...</h1>
    } else {
        return (
            <div className='tc' >
                <h1 className='f1'>RoboFriends</h1>
                <button onClick={() => setCount(count + 1)}>Click Me!</button>
                <SearchBox searchChange={onSearchChange} />
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
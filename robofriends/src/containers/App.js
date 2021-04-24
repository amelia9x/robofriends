import { React, useState, useEffect } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css'

function App() {
    const [robots, setRobots] = useState([]);
    const [searchField, setSearchField] = useState('');
    const [count, setCount] = useState(0);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then(users => setRobots(users));
        console.log(count)
    }, [count])

    const onSearchChange = (event) => {
        setSearchField(event.target.value)
    }

    const filteredRobots = robots.filter((robot) => {
        return robot.name.toLowerCase().includes(searchField.toLowerCase());
    });
    if (robots.length === 0) {
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

export default App;
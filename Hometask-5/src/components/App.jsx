import React from 'react';
import './App.scss';

import Header from './Header.jsx';
import Counter from './Counter.jsx';


const App = () => {
    return (
        <div className="app">
            <Header>
                <Counter value={10} />
                <Counter value={5} />
            </Header>
        </div>
    );
};

export default App;
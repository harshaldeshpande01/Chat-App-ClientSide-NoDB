import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';
import New from './components/New/New';

const App = () => {
    return (
        <Router>
            <Route path="/" exact component={Join} />
            <Route path="/chat" exact component={Chat} />
            <Route path="/new" exact component={New} />
        </Router>
    )
};

export default App;


import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import Nouveau from './postupload';
import List from './list';
// import MonProfil from './monProfil.jsx';
import 'bootstrap/dist/css/bootstrap.css';

class Routes extends React.Component {
    render() {
        return (
            <div className="contenu">
                <div className='container-fluid'>
                    <BrowserRouter>
                        <Switch>
                            <Route exact path='/list' component={List} />
                            <Route path='/admin/upload' component={List} />
                            {/* <Route path='/admin/monProfil' component={MonProfil} /> */}
                        </Switch>
                    </BrowserRouter>
                </div>
            </div>
        );
    }
}

export default Routes;
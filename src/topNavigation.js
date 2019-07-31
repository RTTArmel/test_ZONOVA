import React, { Component } from 'react';

class TopNavigation extends Component {
    
    render() {
        return (
            <div className="container-fluid">
                <nav className="navbar navbar-fixed navbar-expand-lg navbar-dark bg-dark">
                    <h3 className="navbar-brand">ZONOVA Library</h3>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <div className="navbar-nav ml-auto">
                            {/* <form className="form-inline my-2 my-lg-0">
                                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                            </form> */}
                        </div>
                    </div>
                </nav>
            </div>

        );
    }
}

export default TopNavigation /* connect(mapStateToProps)(TopNavigation); */
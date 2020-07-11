import React, {useContext} from "react";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import Home from "../home/Home";
import Matches from "../matches/Matches";
import Account from "../Account/Account";
import {AuthContext} from "../context/AuthContext";

function MainMenu() {
    const {isAuthenticated} = useContext(AuthContext);

    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>

                        <li>
                            <Link to="/account">Account</Link>
                        </li>

                        {isAuthenticated ?
                            (<li>
                                <Link to="/matches">Matches</Link>
                            </li>) : (null)
                        }
                    </ul>
                </nav>


                <Switch>

                    <Route path="/matches">
                        <Matches/>
                    </Route>
                    <Route path="/account">
                        <Account/>
                    </Route>

                    <Route path="/">
                        <Home/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}


export default MainMenu
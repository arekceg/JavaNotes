import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PropTypes from 'prop-types';

const Navigation = ({ routes }) => (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
        <ul style={{ listStyle: 'none', display: 'flex', gap: '1rem', margin: 0 }}>
            {routes.map((routeDefinition, index) => (
                <li key={routeDefinition.route}>
                    <Link to={routeDefinition.route}>{routeDefinition.displayName}</Link>
                </li>
            ))}
        </ul>
    </nav>
);

const Routing = ({ routes }) => (
    <Routes>
        {routes.map((routeDefinition) => (
            <Route 
                key={routeDefinition.route} 
                path={routeDefinition.route} 
                element={routeDefinition.element} 
            />
        ))}
    </Routes>
);

const RouterRenderer = ({ routes }) => (
    <Router>
        <Navigation routes={routes} />
        <Routing routes={routes} />
    </Router>
);

const routePropType = PropTypes.shape({
    route: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    element: PropTypes.element.isRequired,
});

Navigation.propTypes = {
    routes: PropTypes.arrayOf(routePropType).isRequired,
};

Routing.propTypes = {
    routes: PropTypes.arrayOf(routePropType).isRequired,
};

RouterRenderer.propTypes = {
    routes: PropTypes.arrayOf(routePropType).isRequired,
};

export default RouterRenderer;

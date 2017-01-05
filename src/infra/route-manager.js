import express                   from 'express';
import FS                        from 'fs';
import React                     from 'react';
import { renderToString }        from 'react-dom/server'
import { RouterContext, match }  from 'react-router';
import { Provider }              from 'react-redux';
//import createMemoryHistory       from 'history/createMemoryHistory'

import routes from '../components/routes';
import store  from '../store';
import {getAll, post, update, remove, filename} from '../data/data-manager';
import clientToServerAction from '../actions/actionCreatorsServers';

//Promises to gather all the data and dispatch it.
let fetchComponentData = (dispatch, components, params) => {
        console.log('Fetching needed component(s)');
        const needs = components.reduce (
            (prv, cur) => {
                //checking component needed actions; WrappedComponent key needs to be checked as well
                //as "smart" components will be wrapped in a Connector component.
                return prv.concat(cur.needs || [], ((cur.WrappedComponent? cur.WrappedComponent.needs : []) || []));
            },[]);
        
        console.log('Components needed data: ', needs);

        const promises = needs.map(need => {
            let servercompatible = clientToServerAction(need);
            console.log('Dispatching: ', servercompatible.name, need.name !== servercompatible.name? ' from ' + need.name:'');
            return dispatch(clientToServerAction(need)(params));
        });

        return Promise.all(promises);
};


let router = {
    handle(app) {
        //order matters when matching
        app.get('/api', this.getData);
        app.post('/api', this.postData);
        app.put('/api', this.updateData);
        app.delete('/api', this.deleteData);
        app.use(this.manageViews);
    },

    getData(req, res) {
        console.log('GET request: ', req.body);
        getAll(filename, 4000)
            .then(val => { 
                res.json(val);
            })
            .catch(err => res.status(500).end('Internal server error\n\n' + err.message));
    },

    postData(req ,res) {
        console.log('POST request: ', req.body);
        post(filename, req.body, 4000)
            .then(val => { 
                res.json(val);
            })
            .catch(err => res.status(500).end('Internal server error\n\n' + err.message));
    },

    updateData(req, res) {
        console.log('PUT request: ', req.body);
        update(filename, req.body.data, req.body.id, 4000)
            .then(val => { 
                res.json(val);
            })
            .catch(err => res.status(500).end('Internal server error\n\n' + err.message));
    },

    deleteData(req, res) {
        console.log('DELETE request: ', req.body);
        remove(filename, req.body.id, 4000)
            .then(val => { 
                res.json(val);
            })
            .catch(err => res.status(500).end('Internal server error\n\n' + err.message));
    },

    manageViews(req, res) {
        //const location = createMemoryHistory(req.url).location;
        console.log('URL: ', req.url, ' Date: ', Date.now());

        //react-router will manage the routes
        match({ routes, location: req.url }, (err, redirect, props) => {
            if (err) {
                // there was an error somewhere during route matching 
                return res.status(500).end('Internal server error\n\n' + err.message);
            } else if (redirect) {
                // Before a route is entered, it can redirect. Here we handle on the server.
                res.redirect(redirect.pathname + redirect.search);
            } else if (props) {
                // if we got props then we matched a route and can render    
                console.log('Dispatching');
                fetchComponentData(store.dispatch, props.components, props.params)
                    .then(val => {
                        console.log('Rendering: ' + val);
                        // `RouterContext` is what the `Router` renders. `Router` keeps these `props`
                        // in its state as it listens to `browserHistory`. But on the server our app
                        // is stateless, so we need to use `match` to get these props before rendering.
                        const markup = renderToString(
                        <Provider store={store}>
                            <RouterContext {...props}/>
                        </Provider>
                        );

                        //Passing the initial state
                        const initialState = store.getState();
                        
                        console.log('Store state: ', initialState);
                        res.render('index', {markup, initialState});

                        return true; })
                    .catch(err => res.end(err.message));
            } else {
                // no errors, no redirect, we just didn't match anything
                res.status(404).send('Not Found');
            }
        });
    },

    renderPage(filename, res, template) {
        FS.readFile(filename, 'utf-8', (err, content) => {
            if (!err) {
                res.send(content.replace('${template}', template));
            } else {
                res.status(500).send();
            }
        });
    }
};

export default router;
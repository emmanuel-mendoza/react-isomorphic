import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../actions/actionCreators';
import Home from './home';


function mapStateToProps(state) {
  return { todos: state.todos };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

import React from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Menu from './Menu';
import { testme } from './store/actions';
import { getName } from './store/actions';
import { createUser,getUser } from './store/actions';
import User from './User';


class Home extends React.Component {

    constructor(props){
        super(props);
    this.props.getUser(); 
        
    }
   
   clickHandle(e){
    //   debugger
    //console.log('btn clicked');
    this.props.testme();
    
   }
clickHandleForName(e){
    //   debugger
    //console.log('btn clicked');
    
    
   }
componentDidMount(){
    //debugger
    this.props.getUser();
}

   render() {

      return (
      	<div>
                   
			Home Page 
<div>
               {Object.keys(this.props.user).length ? <User user={this.props.user}/>: ''}
           </div>
        </div> 

      );
   }
}

function mapDispatchToProps(dispatch){
  return {
    createUser: bindActionCreators(createUser, dispatch),
    getUser:bindActionCreators(getUser,dispatch)
    
  }
}

function mapStateToProps(state){
    console.log('fd5rtgy8ujhgfd4e5fr6g8u9ik ',state.user.user)
    return{
        user: state.user.user
    }
}

const _Home = connect(mapStateToProps, mapDispatchToProps )(Home);

export default _Home;
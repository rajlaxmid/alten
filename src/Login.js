import React from 'react';
import Menu from './Menu';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { createUser,getUser } from './store/actions';
import {  hashHistory } from 'react-router';  

import User from './User';



class Login extends React.Component {
  
   submitForm(e){
    var user={userName:this.refs.userName.value, userAddress:this.refs.userAddress.value,userPhone:this.refs.userPhone.value} 
    console.log(user);
    this.props.createUser(user);
    this.props.getUser(); 
    hashHistory.push('/home');
   };
   
   render() {

      return (
      	<div>
             
			Login Page: <br/>
          <div> UserName: <input type='text' ref='userName'/> </div> 
          <div> UserAddress: <input type='text' ref='userAddress'/> </div>
          <div> UserPhone: <input type='text' ref='userPhone'/></div>

           <button type='submit'onClick={this.submitForm.bind(this)} >Submit</button>

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

const _Login = connect(mapStateToProps, mapDispatchToProps )(Login);

export default _Login;
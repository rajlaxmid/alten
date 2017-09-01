import React from 'react';
import Menu from './Menu';
import axios from 'axios';

class UserDataTable extends React.Component {
  constructor(){
     super();
     this.state = {
       userlist: { users: [], page: 1, pagesize: 20 }
     }
     this.gerUrl = this.gerUrl.bind(this); 
     this.userSelected = this.userSelected.bind(this);
     this.paginationClickHandler = this.paginationClickHandler.bind(this);
  }
  
 gerUrl(page){
     var page = page || this.state.userlist.page;
     var pagesize = this.state.userlist.pagesize;
     var URL = 'https://randomuser.me/api/?page='+page+'&results='+pagesize+'&seed=abc';
     return URL;
  }
  componentDidMount(){ 
    var URL = this.gerUrl();
    axios.get(URL).then((result)=>{
       this.setState({  userlist: {users: result.data.results, page: 1, pagesize: 20}  });
    })
  }
 userSelected(user){
    var selectedUsers = this.state.selectedUsers;
    selectedUsers.push(user);
    this.setState({selectedUsers: selectedUsers});
    console.log(this.state.selectedUsers);
  }
  NameSearch(e){
    var pattern=e.target.value;
    var filteredUsers=this.state.userlist.users.filter(function(item){ if(item.name.first.includes(pattern)) return item});
    this.setState({  userlist: {users: filteredUsers, page: this.state.userlist.page, pagesize: 20}  });

  }

  paginationClickHandler(e){
    var page = this.state.userlist.page;
    if(e.target.id == 'prev'){
      if(page>1){
        var URL = this.gerUrl(page-1);    
        axios.get(URL).then((result)=>{
          this.setState({  userlist: {users: result.data.results, page: page-1, pagesize: 20}  });
        })  
      }
    }
    if(e.target.id == 'next'){
        var URL = this.gerUrl(page+1);    
        axios.get(URL).then((result)=>{
          this.setState({  userlist: {users: result.data.results, page: page+1, pagesize: 20}  });
        }) 
    }
  }
   render() {
    console.log(this.state.userlist)
      if(this.state.userlist.users.length === 0){

        return(<h1>Loading...</h1>);
      }
      return (
        <div>
          <div className="col-md-5">
            <input type="text" className="form-control" id="myInput" onKeyUp={this.NameSearch.bind(this)} placeholder="Search for names.."/>
          </div>
                <table id="myTable" className="table table-striped">
                  <tr className="header">
                    <th >Gender</th>
                    <th >Name</th>
                    <th >Email</th>
                  </tr>
                  <tbody>
                  {
                      this.state.userlist.users.map( (item, i)=>{
                        return( 
                          <tr key={i}>
                            <td>{item.gender}</td>
                            <td>{item.name.first}</td>
                            <td>{item.email}</td>
                          </tr>
                        )
                      }) 
                  }
                  </tbody>
                </table> 
                  <div>
                    <button className="btn btn-success" onClick={this.paginationClickHandler}  id="prev">&#x276C;&#x276C; Prev</button> &nbsp; 
                    <button className="btn btn-success" onClick={this.paginationClickHandler}  id="next">Next &#x276D;&#x276D;</button>
                  </div> 
          </div>
      );
  }
}

export default UserDataTable;
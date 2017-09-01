import React from 'react';
import Menu from './Menu';
import axios from 'axios';

class TreeView extends React.Component {
  constructor(){
     super();
     this.printChild = this.printChild.bind(this);
     var userTreeViewList = {
        tree: [
          {
            "node": {
              "id": "1",
              "description": "test1",
              "children": [
                  {
                   "node": {
                        "id": "1_1",
                        "description": "test1_1",
                        "children": [
                            {
                             "node": {
                                  "id": "1_1_1",
                                  "description": "test1_1_1",
                                  "children": [
                                      {
                                       "node": {
                                            "id": "1_1_1_1",
                                            "description": "test1_1_1_1",
                                            "children": [
                                            
                                            ]
                                        }
                                      }
                                  ]
                              }
                            }
                        ]
                    }
                  },
                  {
                    "node": {
                      "id": "1_2",
                      "description": "test1_2",
                        "children": []
                    }
                  }
              ]
            }
          },
          {
            "node": {
              "id": "2",
              "description": "test2",
              "children": [
                  {
                   "node": {
                        "id": "2_1",
                        "description": "test2_1",
                        "children": [
                        
                        ]
                    }
                  }
              ]
            }
          }
        ]
      };
     this.state = {
       userTreeViewList: userTreeViewList, flag:false, tempUserTreeViewList:userTreeViewList
     }

  }
    
  
  printChild(children){
     console.log(children); 
     return(    
       children.map( (item, i)=> {
          return <ul>
          <li>{item.node.description}</li>
          {item.node.children.length>0 ? this.printChild(item.node.children): null}
          </ul>
       })  
     )
  }

  componentDidMount(){ 

    /*var URL = this.gerUrl();
    axios.get(URL).then((result)=>{
       this.setState({  userTreeViewList: {users: result.data.results, page: 1, pagesize: 20}  });*/
    //})
  }
 
  NameSearch(e){
    //var pattern=e.target.value;
    var pattern=this.refs.myInput.value;
    //if(this.state.flag ==true) this.setState({  userTreeViewList: {tree:this.state.tempUserTreeViewList}  });
    debugger;
    var filteredUsers=this.state.userTreeViewList.tree.filter(function(item){ 
      if(item.node.description.includes(pattern)) return item});
    this.setState({  userTreeViewList: {tree: filteredUsers}  });
    //this.state.flag=true; 
  }

  
   render() {
    debugger;
    console.log(this.state.userTreeViewList)
      if(this.state.userTreeViewList.tree.length === 0){

        return(<h1>Loading...</h1>);
      }
      return (
        <div>
          <div className="col-md-5">
            <input type="text" className="form-control" ref="myInput"  placeholder="Search for names.."/>
           <button className="btn btn-success" onClick={this.NameSearch.bind(this)}  id="prev">&#x276C;&#x276C; Prev</button> &nbsp; 
            
          </div>
          <ul>
            {
                this.state.userTreeViewList.tree.map( (item, i)=>{
                  return( 
                    <li key={i}>
                        {item.node.description}
                        {item.node.children.length > 0 ? this.printChild(item.node.children): null}
                    </li>
                  )
                }) 
            }
          </ul>         
      </div>
    );
  }
}

export default TreeView;
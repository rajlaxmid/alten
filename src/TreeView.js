import React from 'react';
import axios from 'axios';
let gTree = [];
class TreeView extends React.Component {
  constructor(){
     super();
     
     this.printChild = this.printChild.bind(this);
     this.recursiveSearch = this.recursiveSearch.bind(this);
     this.noResultFound = this.noResultFound.bind(this);
     this.processPattern = this.processPattern.bind(this);
     this.NameSearch = this.NameSearch.bind(this);

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
                          {
                           "node": {
                                "id": "2_1_1",
                                "description": "test2_1_1",
                                "children": [
                                
                                ]
                            }
                          }
                      ]
                    }
                  },
                  {
                    "node": {
                         "id": "2_2",
                         "description": "test2_2",
                         "children": [
                           {
                            "node": {
                                 "id": "2_2_1",
                                 "description": "test2_2_1",
                                 "children": [
                                 
                                 ]
                             }
                           }
                       ]
                     }
                   }
              ]
            }
          }
        ]
      };
     this.state = {
       userTreeViewList: userTreeViewList.tree, flag:false, tempUserTreeViewList: userTreeViewList.tree
     }

  }
    
  
  printChild(children){
     return(    
       children.map( (item, i)=> {
          return <ul>
          <li key={item.node.description+i}>{item.node.description}</li>
          {item.node.children.length>0 ? this.printChild(item.node.children): null}
          </ul>
       })  
     )
  }

  processPattern(){
    //it removes * from end of patten and returns
    var pattern= this.refs.myInput.value;
    var len = pattern.length
    if(pattern[len-1] === '*')
    pattern = pattern.substring(0, len-1);
    return pattern;
  }

  recursiveSearch(children){
    //it search recursively the children for the pattern, and returns if found 
    var pattern= this.processPattern();
    var tree = [];
    if(children && children.length > 0){
      children.forEach( (item) => {
         item.node.description.includes(pattern) ? gTree.push(item) : this.recursiveSearch(item.node.children);
      });
    } 
    return gTree;
  };
 
  NameSearch(){
    //on seachButton click this is called
    gTree = [];
    var pattern= this.processPattern();
    if(pattern)
    var filteredUsers = [];
    this.state.userTreeViewList.forEach( (item)=>{
      if(item.node.description.includes(pattern)){
        filteredUsers.push(item);
        
      }
      else if(item.node.children.length>0){
        var res = this.recursiveSearch(item.node.children); 
        if(res.length>0 ) 
          filteredUsers=res;
        
      }
    })
    

    this.setState({  userTreeViewList: this.state.userTreeViewList, tempUserTreeViewList: filteredUsers  });
  
  }

  noResultFound(){
    if(this.state.tempUserTreeViewList.length===0)
      return(
        <div className="alert alert-danger">
          <span>No result found</span>
        </div>
      )
  }

  
   render() {
    
    
      return (
        <div>
            <h3>Tree View Search</h3>
            <hr />
            <div className="row">
                <div className="col-md-5"> 
                      <div className="input-group">
                        <input type="text" 
                              ref="myInput" 
                              className="form-control" 
                              placeholder="Search for..." 
                        />
                        <span className="input-group-btn">
                          <button className="btn btn-success" type="button" onClick={this.NameSearch.bind(this)}>
                            <span className="glyphicon glyphicon-search"></span> Search
                          </button>
                        </span>
                      </div>
                      {this.noResultFound()}
                      
                </div>  
            </div>    


          
          <ul>
            {
                this.state.tempUserTreeViewList.map( (item, i)=>{
                  return( 
                    <li key={item.node.description+i}>
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

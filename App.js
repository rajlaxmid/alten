import React from 'react';
import Application from './src/Application';
import Menu from './src/Menu'


class App extends React.Component {
   render() {
      return (
         <div className="container">
            <Menu/>
            {this.props.children}
         </div>
      );
   }
}

export default App;
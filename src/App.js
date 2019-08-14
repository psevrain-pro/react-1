import React from 'react';
import logo from './logo.svg';
import Board from './Board.js';
import tour from './rules/rules.js'

import './App.css';

class App extends React.Component {

  constructor(props){
    super(props);
    const initData=[];
    for (let cpt=0; cpt<10*10;cpt++)
      initData.push(0);
    
    this.state = {
      data: initData,
      width: 10,
      height: 10,
      min: 3,
      max: 5
    };
  }


  clickRaz(){
    const newData = this.state.data.slice();
    newData.fill(0);
    this.setState({data: newData});
  }

  clickTour(){
    const apres =  tour(this.state.data, this.state.width,this.state.min,this.state.max );
    this.setState(
      {data: apres}
    );
  }

  clickCase(index){
    const newData = this.state.data.slice();
    newData[index] = 1-newData[index];
    this.setState({data: newData});
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          
          <Board data={this.state.data} width={this.state.width} height={this.state.height} onClick={(i)=>this.clickCase(i)}></Board>

          <button onClick={()=>this.clickTour()}>+1 tour</button>
          <button onClick={()=>this.clickRaz()}>R à Z</button>

        </header>
      </div>
    );
  }
}

export default App;

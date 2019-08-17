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
      max: 5,
      turns: 0,
      changes: 0
    };

    this.inputWidth = React.createRef();
    this.inputHeight = React.createRef();
    this.inputMin = React.createRef();
    this.inputMax = React.createRef();

  }


  initGame(){
    
    //get values
    const width= this.inputWidth.current.value;
    const height= this.inputHeight.current.value;
    const min= this.inputMin.current.value;
    const max= this.inputMax.current.value;

    const initData=new Array(width*height);
    initData.fill(0);

    this.setState ({
      data: initData,
      width: width,
      height: height,
      min: min,
      max: max,
      turns:0, 
      changes : 0
    });

  }

  clickTour(){
    const {data, changes} =  tour(this.state.data, this.state.width,this.state.min,this.state.max );
    const turns = 1 + this.state.turns;
    this.setState(
      {
        data: data,
        turns: turns,
        changes : changes
      }
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
            le jeu de la vie
          </p>
        </header>
        <div className="App-body">
          <div className="Parametres-box">
            <div>Largeur : <input defaultValue={this.state.width} ref={this.inputWidth} /></div>    
            <div>Hauteur : <input defaultValue={this.state.height} ref={this.inputHeight} /></div>      
            <div>Voisins min : <input defaultValue={this.state.min} ref={this.inputMin} /></div>   
            <div>Voisins max : <input defaultValue={this.state.max} ref={this.inputMax} /></div>
            <div>
              <button onClick={()=>this.initGame()}>Recommencer</button>
            </div>

          </div>

          <div>
            <Board data={this.state.data} width={this.state.width} height={this.state.height} onClick={(i)=>this.clickCase(i)}></Board>
          </div>
          <div>
            <div>Nombre de tours : {this.state.turns}</div>
            <div>Nombre de cellules : {this.state.data.reduce((a,b)=> a+b)}</div>
            <div>Ratio de changement : {this.state.changes} --> {this.state.changes*100/this.state.data.length}%</div>
            <button onClick={()=>this.clickTour()}>+1 tour</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

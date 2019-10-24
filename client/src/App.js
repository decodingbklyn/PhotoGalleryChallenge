import React, {Component} from 'react'
import Gallery from './Components/Gallery/Gallery'
import './App.css'


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      textFilter: '',
      isGrey: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    
  }
  
  handleChange(e){
      this.setState({
        textFilter: e.target.value
      })
      console.log(this.state.textFilter)
    }

  handleClick(){
    if(this.state.isGrey === false ){
      this.setState({
        isGrey: true
      })
    } else {
      this.setState({
        isGrey: false
      })
    }

  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <h1>Photo Gallery Challenge</h1>
          <button onClick={this.handleClick}>Greyscale All Images</button>
          <input type='text'onChange={this.handleChange} value={this.state.textFilter}/>
        </header>
          <Gallery isGrey={this.state.isGrey} />
      </div>
    );
  }
}

export default App;

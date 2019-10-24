import React, {Component} from 'react'
import Gallery from './Components/Gallery/Gallery'
import './App.css'


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      filter: false,
      isGrey: false, 
      dimensions: {
        height: '',
        width: ''
      }
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
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

  handleSelect(e){
    e.preventDefault()
    const width = parseInt(document.querySelector('.form-width').value)
    const height = parseInt(document.querySelector('.form-height').value)

    switch ((width && height) || (width || height)) {
      case width && height:
          this.setState({
            filter: true,
            dimensions: {
              width: width, 
              height: height
            }
          })
        break;
      case height:
          this.setState({
            filter: true,
            dimensions: {
              height: height
            }
          })
        break;
      case width:
          this.setState({
            filter: true,
            dimensions: {
              width: width,
            }
          })
        break;
      default:
          const error_msg =  'Please select a dimension to filter!'
          const errorContainer = document.createElement('p')
          document.querySelector('.form').append(error_msg, errorContainer)
        break;
    }
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <h1>Photo Gallery Challenge</h1>
          <button onClick={this.handleClick}>Greyscale All Images</button>
          <div className="form__wrapper">
            <div className="form__header">
              <p>Filter by Dimensions:</p>
            </div>
            <form className="form" onSubmit={this.handleSelect}>
              <div className="form-width__container">
                <select className="form-width">
                  <option default>Select a width</option>
                  <option>100</option>
                  <option>200</option>
                  <option>300</option>
                  <option>400</option>
                </select>
              </div>
              <div className="form-height__container">
                <select className="form-height">
                  <option default>Select a height</option>
                  <option>100</option>
                  <option>200</option>
                  <option>300</option>
                  <option>400</option>
                </select>
              </div>
              <button>Submit</button>
            </form>
            </div>
        </header>
          <Gallery isGrey={this.state.isGrey} dimensions={this.state.dimensions} useFilter={this.state.filter}/>
      </div>
    );
  }
}

export default App;

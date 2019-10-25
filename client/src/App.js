import React, {Component} from 'react'
import Gallery from './Components/Gallery/Gallery'
import Submit from './Components/SubmitBtn/Submit'
import './App.css'


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      filter: false,
      isGrey: false,
      reset: false,
      error: false,
      isGreyText: 'Grey All Images', 
      dimensions: {
        height: '',
        width: ''
      }
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleReset = this.handleReset.bind(this)
  }

  handleClick(){
    if(this.state.isGrey === false ){
      this.setState({
        isGrey: true, 
        isGreyText: 'Color All Images'
      })
    } else {
      this.setState({
        isGrey: false,
        isGreyText: 'Grey All Images'
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
            reset: false,
            error: false,
            filter: true,
            dimensions: {
              width: width, 
              height: height
            }
          })
          document.querySelector('.error').style.display = 'none'
        break;
      case height:
          this.setState({
            reset: false,
            error: false,
            filter: true,
            dimensions: {
              height: height
            }
          })
          document.querySelector('.error').style.display = 'none'

        break;
      case width:
          this.setState({
            reset: false,
            error: false,
            filter: true,
            dimensions: {
              width: width,
            }
          })
          document.querySelector('.error').style.display = 'none'
        break;
      default:
          this.setState({
            error: true
          })
          document.querySelector('.error').style.display = 'block'
        break;
    }
  }

  handleReset(e){
    e.preventDefault()
    if(!this.state.reset){
      this.setState({
        reset: true
      })      
    } 
  }
 formSelectOptions(){
   let options = []
    for(var i = 50; i <= 400; i += 50){
      options.push(<option>{i}</option>)
    }
    return options
  }
  
  render(){
    return (
      <div className="App">
        <header className="App-header">
          <h1>Photo Gallery Challenge</h1>
          <div className="form__wrapper">
            <form className="form" onSubmit={this.handleSelect}>
              <div className="form__header">
                <p>Filter by Dimensions:</p>
              </div>
              <div className="form-input__wrapper">
                <div className="form-width__container">
                  <select className="form-width">
                    <option default>Select a width</option>
                    { this.formSelectOptions()  }
                  </select>
                </div>
                <div className="form-height__container">
                  <select className="form-height">
                    <option default>Select a height</option>
                    { this.formSelectOptions()  }
                  </select>
                </div>
                <Submit className='form-submit__btn'/>
              </div>
            </form>
            <div className='options__container'>
              <h3 className='options__header' >Options: </h3>
              <button className='color-change-btn' 
                      onClick={this.handleClick}>
                      {this.state.isGreyText}
              </button>
              <button className='reset-btn' onClick={this.handleReset} value='reset'>Reset</button>
            </div>
          </div>
        </header>
          <Gallery isGrey={this.state.isGrey} 
                  dimensions={this.state.dimensions} 
                  useFilter={this.state.filter}
                  reset={this.state.reset}
                  />
      </div>
    );
  }
}

export default App;

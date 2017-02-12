import ReactDOM from 'react-dom'
import React, { Component, PropTypes } from 'react'

export default class FacebookLikeButton extends React.Component{

  constructor(props) {
    super(props)
    this.state = { initalized : false }
  }

  componentDidMount(){
    this.init()
  }

  init () {
    if(this.state.initalized){
      return
    }

    let fbbutton = ReactDOM.findDOMNode(this.refs.fbbutton)
    let fbscript = document.createElement('script')
    fbscript.src = '//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.5&appId=230650050380161'
    fbscript.id = 'facebook-jssdk'
    fbscript.onload = this.renderWidget.bind(this)
    fbbutton.parentNode.appendChild(fbscript)

    this.setState({initalized: true });
  }

  componentWillUnmount(){
    let elem = document.getElementById('facebook-jssdk')
    if(elem !== undefined && elem !== null){
      elem.parentNode.removeChild(elem);
    }
  }

  renderWidget(){
      /*
         need to detect if it has already been parsed.
         if coming from react router it may need reparsing.
      */
      setTimeout(function () {
        let elem = document.getElementById('fbbutton')
        if(elem.getAttribute('fb-xfbml-state') === null){
          FB.XFBML.parse();
        }
      }, 1000)
  }

  render(){
    return (

      <div id='fbbutton'
           ref="fbbutton"
           className="fb-like"
           data-href={this.props.url}
           data-layout="standard"
           data-action="like"
           data-show-faces="true"
           data-share="true">
      </div>
    );

  }
}

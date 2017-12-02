const React = require('react');
const Component = React.Component;
const Gif = require('./Gif');
const $ = require('jquery');

let imageArray = [
  'https://media3.giphy.com/media/26FPCXdkvDbKBbgOI/200w.gif',
  'https://media3.giphy.com/media/v6aOjy0Qo1fIA/200w.gif',
  'https://media3.giphy.com/media/W3QKEujo8vztC/200w.gif',
  'https://media2.giphy.com/media/vFKqnCdLPNOKc/200w.gif',
  'https://media3.giphy.com/media/6uMqzcbWRhoT6/200w.gif'
];

const getInitialState = () => {
  
  return {
    leftGif: imageArray[Math.floor(Math.random()*imageArray.length)],
    rightGif: imageArray[Math.floor(Math.random()*imageArray.length)]
  }
}

$.ajax(
  'https://api.giphy.com/v1/gifs/search?api_key=MW5czB76HwkBu7TtxFZ4brmlICTLCLNA&q=cat&limit=100&offset=0&rating=G&lang=en',
  {
    type: 'GET',
    success: (data) => {
      console.log(data);
      data.data.forEach(elem => {
        imageArray.push(elem.images.fixed_width.gif);
      });
      console.log(imageArray);
    }
  }
);


class App extends Component {
  constructor(props) {
    super(props);
    this.state = getInitialState();
  }

  render() {
    const gifElements = [ 
      <Gif key={0} gif={this.state.leftGif} />,
      <Gif key={1} gif={this.state.rightGif} />
    ]
    console.log('in the render function');
    return (
      <div>
        <div id="gifWrapper">
          {gifElements}
        </div>
        <div id="buttonWrapper">
          <button id="leftButton">Choose left</button>
          <button id="rightButton">Choose right</button>
        </div>
      </div>
    )
  }
}


module.exports = App;
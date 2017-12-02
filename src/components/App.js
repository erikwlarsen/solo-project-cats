const React = require('react');
const Component = React.Component;
const Gif = require('./Gif');
const ListElement = require('./ListElement');
const axios = require('axios');


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leftGif: 'https://i.imgur.com/jdIxvV4.gif',
      rightGif: 'https://i.imgur.com/jdIxvV4.gif',
      listElements: []
    }

    this.handleClick = (side) => {
      axios.get('http://localhost:3000/gif')
      .then((response, error) => {
        if(error) console.log(error);
        if (side === 'left') this.setState({ rightGif: response.data});
        else if (side === 'right') this.setState({ leftGif: response.data})
      });

      let gifToSend;
      if (side === 'left') gifToSend = this.state.leftGif;
      else if (side === 'right') gifToSend = this.state.rightGif;

      axios.post('http://localhost:3000/plus', {
        gifLink: gifToSend
      })
      .then((response, error) => {
        // console.log(response.data);
      });
    }

    this.getList = () => {
      axios.get('http://localhost:3000/list')
      .then((response, error) => {
        this.setState({ listElements: response.data });
      });
    }
  }
  
  componentDidMount() {
    let leftGif;
    let rightGif;
    axios.get('http://localhost:3000/gif')
      .then((response, error) => {
        if(error) console.log(error);
        else leftGif = response.data;
        this.setState({ leftGif });
      });
    axios.get('http://localhost:3000/gif')
      .then((response, error) => {
        if(error) console.log(error);
        else rightGif = response.data;
        this.setState({ rightGif });
      });
  }

  render() {
    const gifElements = [ 
      <Gif key={0} side={'left'} gif={this.state.leftGif} getList={this.getList} handleClick={this.handleClick} />,
      <Gif key={1} side={'right'} gif={this.state.rightGif} getList={this.getList} handleClick={this.handleClick} />
    ]

    const listElements = [];
    
    this.state.listElements.forEach((elem, index) => {
      listElements.push(
        <ListElement key={'list' + index} still={elem.smallFixedImageLink} rank={index + 1} counter={elem.counter} />
      );
    });

    return (
      <div>
        <div id="gifWrapper">
          {gifElements}
        </div>
        <div id="buttonWrapper">
          <button onClick={() => this.handleClick('left')} id="leftButton">Choose left</button>
          <button onClick={() => this.handleClick('right')} id="rightButton">Choose right</button>
        </div>
        <div id="listWrapper">
          {listElements}
        </div>
      </div>
    )
  }
}


module.exports = App;
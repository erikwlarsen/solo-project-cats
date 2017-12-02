const React = require('react');
const Component = React.Component;
// const axios = require('axios');

// const Gif = (props) => {
//   return (
//     <img src={props.gif} width={600} height={600}/>
//   )
// }

class Gif extends Component {
  constructor(props) {
    super(props);
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.gif !== nextProps.gif) return true;
    else return false;
  }

  componentDidUpdate() {
    this.props.getList();
  }

  render() {
    return (
      <img src={this.props.gif} width={600} onClick={() => this.props.handleClick(this.props.side)} height={600}/>
    )
  }
}


module.exports = Gif;
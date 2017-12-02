const React = require('react');
const Component = React.Component;

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
      <img className="gif" src={this.props.gif} width={600} onClick={() => this.props.handleClick(this.props.side)} height={600}/>
    )
  }
}


module.exports = Gif;
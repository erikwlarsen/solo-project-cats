const React = require('react');
const Component = React.Component;

class ListElement extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div id="listElementWrapper">
        <span>{this.props.counter}</span>
        <img src={this.props.still} />
      </div>
    )
  }
}


module.exports = ListElement;
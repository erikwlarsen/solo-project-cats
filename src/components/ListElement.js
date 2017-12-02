const React = require('react');
const Component = React.Component;

class ListElement extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="listElementWrapper">
        <div className="counter">{this.props.counter} wins</div>
        <img className="listImage" src={this.props.still} onClick={() => this.props.listClick(this.props.imageLink)} width={200} height={200} />
      </div>
    )
  }
}

module.exports = ListElement;
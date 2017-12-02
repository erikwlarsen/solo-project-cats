const React = require('react');
const Component = React.Component;

const Gif = (props) => {
  return (
    <img src={props.gif} width={400}/>
  )
}


module.exports = Gif;
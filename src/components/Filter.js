import React from 'react';
import ReactDOM from 'react-dom';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
 
class Filter extends React.Component {
  constructor(props) {
    super(props);
 
    this.state = {
      value: { min: 100, max: 1000 },
    };

    this.handleChange =  this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({ value }, () => this.props.handleChange(value))
  }
 
  render() {
    return (
          
            <InputRange
                maxValue={1000}
                minValue={100}
                value={this.state.value}
                onChange={value => this.handleChange(value)}
            />
        
    );
  }
}

export default Filter;
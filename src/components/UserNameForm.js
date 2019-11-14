import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

export default class UserNameForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.name ? props.name : '',
      error: ''
    };

    this.onNameChange = this.onNameChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onNameChange(e) {
    const name = e.target.value;
    this.setState({ name });
  };
  onSubmit(e) {
    e.preventDefault();

    if (!this.state.name) {
      this.setState(() => ({ error: 'Please provide a name.' }));
    } else {
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
        name: this.state.name
      });
    }
  };
  render() {
    return (
      <form className="form" onSubmit={this.onSubmit}>
        {this.state.error && <p className="form__error">{this.state.error}</p>}
        <input
          type="text"
          placeholder="Name"
          autoFocus
          className="text-input"
          value={this.state.name}
          onChange={this.onNameChange}
        />
        <div>
          <button className="button">Save Name</button>
        </div>
      </form>
    )
  }
}

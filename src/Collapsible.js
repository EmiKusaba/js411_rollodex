import React from 'react';

class Collapsible extends React.Component {
  render() {
    const buttonText = (this.props.user.showDetails ? "Hide" : "Show") + " Details";
    let details = null;
    if(this.props.user.showDetails) {
      details = (
        <div>
          <ul>
            <li key="age">Age: {this.props.user.age}</li>
            <li key="email">Email: {this.props.user.email}</li>
            <li key="phone">Phone: {this.props.user.phone}</li>
          </ul>
        </div>
      );
    }
    return (
      <div>
        <p>{this.props.user.name}</p>
        <p><img src={this.props.user.picture} /></p>
        <button className="details" 
                onClick={this.props.onClick}>
          {buttonText}
        </button>
        {details}
      </div>
    );
  }
}

export default Collapsible;
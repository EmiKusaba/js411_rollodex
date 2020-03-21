import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      users: [],
    };

    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch("https://randomuser.me/api?results=25")
      .then(response => response.json())
      .then(json => json.results.map(user => (
        {
          name: `${user.name.first} ${user.name.last}`,
          picture: user.picture.thumbnail,
          email: user.email,
          phone: user.phone,
          age: user.dob.age,
          showDetails: false,
        }
      )))
      .then(users => this.setState({
        users: users,
        isLoading: false
      }))
      .catch(error => console.log(`parsing failed ${error}`));
  }

  handleClick(i) {
    const users = this.state.users.slice();
    const user = users[i];
    user.showDetails = !user.showDetails;
    this.setState({
      users: users,
    });
  }

  render() {
    const { isLoading, users } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1>Fetch API</h1>
        </header>
        <div className={`content ${isLoading ? 'is-Loading' : ''}`}>
          <div className="panel-group">
            {
              !isLoading && users.length > 0 ? users.map((user, index) => {
                return <Collapsible key={index}
                                    index={index}
                                    user={user}
                                    onClick={e => this.handleClick(index)}
                        />
              }) : null
            }
          </div>
        </div>
      </div>
    );
  }
}

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

export default App;
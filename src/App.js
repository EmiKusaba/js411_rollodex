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
        }
      )))
      .then(users => this.setState({
        users: users,
        isLoading: false
      }))
      .catch(error => console.log(`parsing failed ${error}`));
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
                const { name, picture } = user;
                return <Collapsible index={index}
                                    name={name}
                                    picture={picture}
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
    return (
      <div key={this.props.index}>
        <p>{this.props.name}</p>
        <p><img src={this.props.picture} /></p>
      </div>
    );
  }
}

export default App;
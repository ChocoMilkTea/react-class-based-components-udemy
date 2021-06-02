import { Component, Fragment } from 'react';

import Users from './Users';
import UsersContext from '../store/users-context';
import classes from './UserFinder.module.css';

class UserFinder extends Component {
  static contextType = UsersContext;

  constructor() {
    super();
    this.state = {
      filteredUsers: [],
      searchTerm: ''
    };
  }

  searchChangeHandler(event) {
    this.setState({
      searchTerm: event.target.value
    });
  }

  componentDidMount() {
    this.setState({
      filteredUsers: this.context.users
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchTerm !== this.state.searchTerm) {
      this.setState({
        filteredUsers: this.context.users.filter((user) => (
          user.name.includes(this.state.searchTerm)
        ))
      });
    }
  }

  render() {
    return (
      <Fragment>
        <div className={classes.finder}>
          <input type='search' className={classes.finder} onChange={this.searchChangeHandler.bind(this)} />
        </div>
        <Users users={this.state.filteredUsers} />
      </Fragment>
    )
  }
}

export default UserFinder;
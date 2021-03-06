import React from 'react';
import PropTypes from 'prop-types';
import imgLaptop from './static/man-laptop-v1.svg';
import RegistrationForm from './RegistrationForm';
import UserList from './UserList';
import { validateRegData } from './utils';
import './scss/Main.scss';

export default class Main extends React.Component {
    fileInput = React.createRef();

    state = {
      users: [],
      isLoading: '',
      positions: [],
      urlNextUsersPage: '',
      user: {
        name: '',
        email: '',
        phone: '',
        position: '',
        photo: '',
      },
      errors: {
        name: '',
        email: '',
        phone: '',
        position: '',
        photo: '',
      },
    }

    componentDidMount() {
      this.getUsersRequest();
      this.getPositionsRequest();
    }

    get urlForDesctop() {
      const baseUrl = 'https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=';
      const isMobile = window.innerWidth < 768;
      const usersPerPage = isMobile ? 3 : 6;
      return `${baseUrl}${usersPerPage}`;
    }

    getPositionsRequest = () => {
      fetch('https://frontend-test-assignment-api.abz.agency/api/v1/positions')
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            positions: data.positions,
          });
        });
    }

    getUsersRequest = (url = this.urlForDesctop) => {
      if (this.state.urlNextUsersPage === null) {
        return;
      }
      this.setState({
        isLoading: true,
      });
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          let newState;
          if (data.success) {
            newState = {
              users: data.users,
              isLoading: false,
              urlNextUsersPage: data.links.next_url,
            };
          } else if (data.message === 'Page not found') {
            newState = {
              isLoading: false,
              urlNextUsersPage: null,
            };
          }
          this.setState(newState);
        });
    }

    handleChangeInput = (event, name) => {
      const newState = { ...this.state };
      newState.user[name] = event.target.value;
      this.setState(newState);
    }

    handleChangePosition = (event) => {
      const newState = { ...this.state };
      newState.user.position = event.target.value;
      this.setState(newState);
    };

    handleChangePhoto = () => {
      const newState = { ...this.state };
      const fileField = this.fileInput.current.files[0];

      if (!fileField) {
        newState.user.photo = '';
        newState.errors.photo = 'Upload your photo';
      } else if (fileField.size > 5120000) {
        newState.user.photo = fileField.name;
        newState.errors.photo = 'Maximum size exceeded';
      } else {
        newState.user.photo = fileField.name;
        newState.errors.photo = '';
      }
      this.setState(newState);
    };

    handleShowMoreUsers = () => {
      this.getUsersRequest(this.state.urlNextUsersPage);
    }

    getToken = () => fetch('https://frontend-test-assignment-api.abz.agency/api/v1/token')
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          return { token: data.token };
        }
        return { error: 'error' };
      })
      .catch((error) => ({ error }))

    creatUser = (token) => {
      const formData = new FormData();
      const fileField = this.fileInput.current.files[0];
      const {
        name, email, phone, position,
      } = this.state.user;
      formData.append('position_id', position);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('photo', fileField);

      return fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users', {
        method: 'POST',
        body: formData,
        headers: {
          Token: token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.success) {
            const newState = { ...this.state };
            newState.errors.email = data.message;
            newState.errors.phone = data.message;
            this.setState(newState);
          }
          return data.success;
        });
    }

    handleRegistration = () => {
      const { error: errValid, errors } = validateRegData(this.state);
      if (errValid) {
        this.setState({
          errors,
        });
        return false; // boolean is returned for correct activation of the dialog box
      }

      return this.getToken()
        .then(({ token, error: tokenErr }) => {
          if (tokenErr) {
            alert(tokenErr);
            return { error: 'Token hasn\'t got' };
          }
          return this.creatUser(token);
        });
    }

    render() {
      const {
        positions, errors, urlNextUsersPage, user,
      } = this.state;

      return (
        <div className="main">
          <div className="main__header">
            <div className="main__header_text1">
              <span>TEST ASSIGNMENT</span>
              {' '}
              FOR FRONTEND DEVELOPER POSITION
            </div>
            <div className="main__header_text2">
              We kindly remind you that your test assignment should be submitted
              as a link to github/bitbucket repository. Please be patient, we consider
              and respond to every application that meets minimum requirements.
              We look forward to your submission. Good luck! The photo has to scale
              in the banner area on the different screens
            </div>
            <div className="main__header_text2-alt">
              We kindly remind you that your test assignment should be submitted
              as a link to github/bitbucket repository.
            </div>
            <div>
              <button type="button" onClick={this.props.focusRegistration}>
                <span>Sing up now</span>
              </button>
            </div>
          </div>
          <div className="main__body">
            <div className="main__head_text">
              Let&apos;s get acquainted
            </div>
            <div className="main__body_container">
              <div className="main__body_container_img">
                <img src={imgLaptop} alt="laptop" />
              </div>
              <div className="main__body_container_content">
                <div className="main__body_container_content_text1">
                  I am cool frontend developer
                </div>
                <div className="main__body_container_content_text2">
                  We will evaluate how clean your approach to writing CSS and Javascript
                  code is. You can use any CSS and javascript 3rd party libraries without
                  any restriction.
                </div>
                <div className="main__body_container_content_text3">
                  If 3rd party css/javascriot libraries are added to the project via bower/npm/yarn
                  you will get bonus points. If you use any task runner (gulp/webpack) you will get
                  bonus points as well. Slice service directory page PSD mockup into
                  HTML5/CSS3.
                </div>
                <div>
                  <button type="button" onClick={this.props.focusRegistration}>
                    Sing up now
                  </button>
                </div>
              </div>
            </div>
            <div className="main__body_users">
              <div className="main__body_users_text1">
                Our cheerful users
              </div>
              <div className="main__body_users_text2">
                Attention! Sorting users by registration date
              </div>
              <div className="main__body_users_users">
                <UserList users={this.state.users} />
              </div>
              <div className={this.state.isLoading ? 'main__body_users_button_disabled' : 'main__body_users_button'}>
                <button
                  type="button"
                  onClick={this.handleShowMoreUsers}
                  style={{ display: urlNextUsersPage === null ? 'none' : '' }}
                  disabled={this.state.isLoading}
                >
                  <span>Show more</span>
                </button>
              </div>
            </div>
            <RegistrationForm
              errors={errors}
              positions={positions}
              inputRef={this.props.inputRef}
              handleChangePosition={this.handleChangePosition}
              handleChangePhoto={this.handleChangePhoto}
              fileInput={this.fileInput}
              user={user}
              handleRegistration={this.handleRegistration}
              getUsersRequest={this.getUsersRequest}
              handleChangeInput={this.handleChangeInput}
            />
            <div className="main__footer">
              <hr />
              @ abz.agency specially for the test task
            </div>
          </div>
        </div>
      );
    }
}

Main.propTypes = {
  focusRegistration: PropTypes.func,
  inputRef: PropTypes.object,
};

import React from 'react';
import imgLaptop from './static/man-laptop-v1.svg';
import Avatar from './Avatar';
import ProgressCentered from './ProgressCentered';
import ButtonAndDialog from './ButtonAndDialog';
import './scss/Main.scss'

export default class extends React.Component {

emailPattrn = "^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|'(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*')@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)])$)";
    registrationInput = [
        {
            name: 'Name',
            id: 'name',
            type: 'text',
            placeholder: 'Your name',
            pattern: '',
            helperText: '',
            minlength: '2',
            maxlength: '60',
        },
        {
            name: 'Email',
            type: 'email',
            id: 'email',
            placeholder: 'Your email',
            pattern: this.emailPattrn,
            helperText: '',
            minlength: '2',
            maxlength: '100',
        },
        {
            name: 'Phone',
            type: 'tel',
            id: 'phone',
            placeholder: '+380 XX XXX XX XX',
            pattern: "^[+]{0,1}380([0-9]{9})$",
            helperText: 'Enter phone number in open format',
            minlength: '13',
            maxlength: '13',
        }
    ];

    state = {
        users: [],
        isLoding: '',
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
        }
    }

    componentDidMount() {
        this.getUsersRequest();
        this.getPositionsRequest();
    };

    getPositionsRequest = () => {
        fetch('https://frontend-test-assignment-api.abz.agency/api/v1/positions')
            .then((response) => {
            return response.json();
            })
            .then((data) => {
                this.setState({
                    positions: data.positions,
                })
            })
    }

    getUsersRequest = (url = 'https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6') => {
        if (this.state.urlNextUsersPage === null) {
            return;
        }
        this.setState({
            isLoading: true,
        });
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if(data.success) {
                    console.log(data)
                    this.setState({
                        users: data.users,
                        isLoading: false,
                        urlNextUsersPage: data.links.next_url,
                    });
                } else {
                    alert(data.message);
                    this.setState({
                        isLoading: false,
                    });
                }
            }) 
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

    handleChangePhoto = (event) => {
        const newState = { ...this.state };
        newState.errors = '';
        this.setState(newState);
        const fileField = document.querySelector('input[type="file"]');
        if (!fileField.files[0]) {
            const newState = { ...this.state };
            newState.user.photo = '';
            newState.errors.photo = 'Upload your photo';
            this.setState(newState);
            return;
        } else if (fileField.files[0].size > 5120000) {
            const newState = { ...this.state };
            newState.user.photo = fileField.files[0].name;
            newState.errors.photo = 'Maximum size exceeded';
            this.setState(newState);
        } else {
            const newState = { ...this.state };
            newState.user.photo = fileField.files[0].name;
            newState.errors.photo = '';
            this.setState(newState);
        }
    };

    getToken = () => {
        return fetch('https://frontend-test-assignment-api.abz.agency/api/v1/token')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data.token)
                return {token: data.token};
            })
            .catch((error) => console.log(error))
    }

    creatUser = (token) => {
        const formData = new FormData();
        // file from input type='file'
        const fileField = document.querySelector('input[type="file"]');
        const { name, email, phone, position } = this.state.user;
        formData.append('position_id', position);
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('photo', fileField.files[0]);

        console.log(token);
        console.log(formData);
        return (fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users', {
            method: 'POST',
            body: formData,
            headers: {
                'Token': token, 
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                if(data.success) {
                    return true;
                } else {
                    // proccess server errors
                }
            })
            .catch(function(error) {
                // proccess network errors
            }));
    }

    hendleClickRegistration = () => {
        const newState = { ...this.state };
        let error = false;
            
        if(this.state.user.name.length < 2 || this.state.user.name.length > 60) {
            newState.errors.name = 'User name should contain 2-60 characters';
            this.setState(newState);
            error = true;
        } else {
            newState.errors.name = '';
            this.setState(newState);
        }
        
        if(!(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(this.state.user.email))) {
            newState.errors.email = 'Invalid email.';
            this.setState(newState);
            error = true;
        } else {
            newState.errors.email = '';
            this.setState(newState);
        }
        
        if (!(/^[+]{0,1}380([0-9]{9})$/.test(this.state.user.phone))) {
            newState.errors.phone = 'The phone format is invalid.';
            this.setState(newState);
            error = true;
        } else {
            newState.errors.phone = '';
            this.setState(newState);
        }
        
        if (!this.state.user.position) {
            newState.errors.position = 'Position not checked.';
            this.setState(newState);
            error = true;
        } else {
            newState.errors.position = '';
            this.setState(newState);
        }

        if (!this.state.user.photo) {
            newState.errors.photo = 'No file chosen';
            this.setState(newState);
            error = true;
        } else {
            newState.errors.photo = '';
            this.setState(newState);
        }
        
        if (!error){
            this.getToken()
                .then((res) => {this.creatUser(res.token)});
            return true;
        }
    }

    usersLoading = () => {
        if (this.state.isLoading) {
            return <ProgressCentered />
        } else {
            return (this.state.users.map((user) => (
                <div className='main__body_users_card' key={user.id}>
                    <Avatar userImg={user.photo} />
                    <div className='main__body_users_card_name'>{user.name}</div>
                    <nav>{user.position}</nav>
                    <nav>{user.email}</nav>
                    <nav>{user.phone}</nav>
                </div>
            )))
        }
    }

    render() {
        const { positions, errors } = this.state;

        console.log(this.state);

        return (
            <div className="main">
                <div className='main__header'>
                    <div className='main__header_text1'>
                        TEST ASSIGMENT <br/> FOR FRONTEND <br/> DEVELOPER POSITION
                    </div>
                    <div className='main__header_text2'>
                        We kindly remind you that your test assigment shouls be submitted 
                        as a link github/bitbucket repository. Please be patient,we consider
                        and respond to every application that meet minimum requirements.
                        We look forward to your submission. Good luck! The photo has to scale
                        in the banner area on the different screens
                    </div>
                    <div>
                        <button>
                            Sign up now
                        </button>
                    </div>
                </div>
                <div className='main__body'>
                    <div className='main__head_text'>
                        Let's get acquainted
                    </div>
                    <div className='main__body_container'>
                        <div className='main__body_container_img'>
                            <img src={imgLaptop} alt='laptop' />
                        </div>
                        <div className='main__body_container_content'>
                            <div className='main__body_container_content_text1'>
                                I am cool frontend developer
                            </div>
                            <div>
                                We will evaluate how clean your approach to writing CSS and Javascript
                                code is. You can use any CSS and javascript 3rd party libraries without anyrestriction.
                            </div>
                            <div>
                                If 3rd party css/javascriot libraries are added to the project via bower/npm/yarn
                                you will get bonus points as well. Slice sevice directory page PSD mockup into 
                                HTML5/CSS3.
                            </div>
                            <div>
                                <button>
                                    Sign up now
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='main__body_users'>
                        <div className='main__head_text'>
                            Our cheerful users
                        </div>
                        <div className='main__body_users_text2'>
                            Attention! Sorting users by registration date
                        </div>
                        <div className='main__body_users_users'>
                            {this.usersLoading()}
                            {/*{users.map((user) => (
                                <div className='main__body_users_card' key={user.id}>
                                    <Avatar userImg={user.photo} />
                                    <div className='main__body_users_card_name'>{user.name}</div>
                                    <nav>{user.position}</nav>
                                    <nav>{user.email}</nav>
                                    <nav>{user.phone}</nav>
                                </div>
                            ))}*/}
                        </div >
                        <div className='main__body_users_button'>
                            <button 
                                onClick={() => this.getUsersRequest(this.state.urlNextUsersPage)}
                                style={{ display: this.state.urlNextUsersPage === null?'none':'' }}
                            >
                                Show more
                            </button>
                        </div>
                    </div>
                    <div className='main__registration'>
                        <div className='main__head_text'>
                            Register to get a work
                        </div>
                        <div className='main__registration_text'>
                            Attention! After successful registration and alert, update the
                            list of users in the block from the top
                        </div>
                        <div>
                            <form>
                                {this.registrationInput.map((input) => (
                                    <div key={input.id} className={errors[input.id]?'main__registration_input':''}> 
                                        <label>
                                            {input.name}<br/>
                                            <input 
                                                type={input.type} 
                                                placeholder={input.placeholder}
                                                pattern={input.pattern}
                                                minLength={input.minlength}
                                                maxLength={input.maxlength}
                                                onChange={(event) => this.handleChangeInput(event, input.id)}
                                                required
                                            /><br/>
                                            <span>{errors[input.id]?errors[input.id]:input.helperText}</span> 
                                        </label>
                                    </div>
                                ))}
                                <div className={errors.position?'main__registration_position_error':'main__registration_position'}>
                                    <label>
                                        <p>Select your position</p>
                                        {positions.map((position) =>(
                                            <label className='main__registration_position_radio' key={position.id}>
                                                <input type='radio' name='position' value={position.id} onChange={this.handleChangePosition} /> 
                                                <span>{position.name}</span><br/>
                                            </label>
                                        ))}
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        Photo<br/>
                                        <div className={errors.photo?'main__registration_form-error':'main__registration_form'}>
                                            <div className='main__registration_button'>Browse</div>
                                            <input 
                                                id="upload"
                                                type="file"
                                                name="upload"
                                                placeholder='No file chisen'
                                                onChange={this.handleChangePhoto}
                                                accept="image/jpeg"
                                            />
                                            <span className='main__registration_form_text'>{this.state.user.photo?this.state.user.photo:'Upload your photo'}</span>
                                        </div>
                                        <section>{errors.photo?errors.photo:''}</section>
                                    </label>
                                </div>                               
                                <div>
                                    <center>
                                        <ButtonAndDialog 
                                            hendleClickRegistration={this.hendleClickRegistration}
                                            getUsersRequest={this.getUsersRequest}
                                        />
                                    </center>
                                </div>
                            </form>
                        </div>
                        <div className='main__footer'>
                            <hr/>
                            abz.agency specially for the test task
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

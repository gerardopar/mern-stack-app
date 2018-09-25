import React, { Component } from 'react'
//redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

//components
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup'; 

class CreateProfile extends Component {
    constructor(props){
        super(props);

        this.state = {
            displaySocialInput: false,
            handle: '',
            company: '',
            website: '',
            location: '',
            status: '',
            skills: '',
            githubusername: '',
            bio: '',
            twitter: '',
            facebook: '',
            linkedin: '',
            youtube: '',
            instagram: '',
            errors: {}
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e){
        e.preventDefault();
        console.log('submit');
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        const { errors } = this.state;

        const options = [
            { label: '* Select Professional Status', value: 0 },
            { label: 'Developer', value: 'Developer' },
            { label: 'Junior Developer', value: 'Junior Developer' },
            { label: 'Senior Developer', value: 'Senior Developer' },
            { label: 'Manager', value: 'Manager' },
            { label: 'Student or Learning', value: 'Student or Learning' },
            { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
            { label: 'Intern', value: 'Intern' },
            { label: 'Other', value: 'Other' }
        ];

        return ( 
            <div className="create-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Create Your Profile</h1>
                            <p className="lead text-center">
                                Let's get some information to make your profile stand out
                            </p>
                            <small className="d-block pb-3">* = required fields</small>
                            <form onSubmit={this.onSubmit}>
                            <TextFieldGroup
                            placeholder="* Profile Handle"
                            name="handle"
                            value={this.state.handle}
                            onChange={this.onChange}
                            error={errors.handle}
                            info="A unique handle for your profile URL. Your full name, company name,
                            nickname"
                            />
                            <SelectListGroup
                            placeholder="Status"
                            name="status"
                            value={this.state.status}
                            onChange={this.onChange}
                            options={options}
                            error={errors.status}
                            info="Give us an idea of where you are at in your career"
                            />
                            <TextFieldGroup
                            placeholder="Company"
                            name="company"
                            value={this.state.company}
                            onChange={this.onChange}
                            error={errors.company}
                            info="Could be your iwn company or one you work for"
                            />
                            <TextFieldGroup
                            placeholder="* Profile Handle"
                            name="handle"
                            value={this.state.handle}
                            onChange={this.onChange}
                            error={errors.handle}
                            info="A unique handle for your profile URL. Your full name, company name,
                            nickname"
                            />
                            <TextFieldGroup
                            placeholder="* Profile Handle"
                            name="handle"
                            value={this.state.handle}
                            onChange={this.onChange}
                            error={errors.handle}
                            info="A unique handle for your profile URL. Your full name, company name,
                            nickname"
                            />
                            <TextFieldGroup
                            placeholder="* Profile Handle"
                            name="handle"
                            value={this.state.handle}
                            onChange={this.onChange}
                            error={errors.handle}
                            info="A unique handle for your profile URL. Your full name, company name,
                            nickname"
                            />
                            </form>

                            
                        </div>
                    </div>
                </div>
            </div>
)}}

CreateProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, undefined)(CreateProfile)

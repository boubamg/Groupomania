import React, { Component } from 'react'
//import { Form, FormGroup, Label, Button, Input, Row, Container, Col } from 'reactstrap';
import userAPI from '../../../Api/userAPI'
import {Redirect} from 'react-router-dom'
import SignUp from '../../Form/Signup_form'
import { Fragment } from 'react'
//import './Connexion.css'


class Signup extends Component {

    state = {
        // init empty data
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
        redirection: false,
        formIsValid: true,
        errors: {}
    }

    handleChange = (event) => {
        let { name, value} = event.target
        this.setState({ [name] : value })
    }

    verification = () => {
        const { firstname, lastname, email, password, confirmPassword, errors, formIsValid} = this.state

        if(!/^[A-Za-z]{2,}$/.test(firstname)){
            this.setState({formIsValid: false})
            errors["firstname"] = "Le prénom est incorrect";
        }
        if(!/^[A-Za-z]{2,}$/.test(lastname)){
            this.setState({formIsValid: false})
            errors["lastname"] = "Le nom est incorrect";
        }
        if(!/^[A-Za-z0-9._-]+@[A-Za-z0-9._-]+\.[A-Za-z]{2,}$/.test(email)){
            this.setState({formIsValid: false})
            errors["email"] = "L'email est incorrect";
        }
        if(!password || password.length < 8 ){
            this.setState({formIsValid: false})
            errors["password"] = "Le mot de passe doit contenir au moins 8 caractères";
        }
        if(confirmPassword !== password) {
            this.setState({formIsValid: false})
            errors["confirmPassword"] = "La confirmation du mot de passe est incorrect"
        }

        this.setState({errors})
        return formIsValid;
    }

    handleSubmit = (event) => {
        event.preventDefault()

        const { firstname, lastname, email, password} = this.state

        if(this.verification()) {
            userAPI.signup(firstname, lastname ,email, password)
            .then(() => {
                this.setState({redirection: true})
            })
            .catch(error => {
                console.log(error);
            });
        } else {
            console.log("Form has errors")
        }

        this.setState({formIsValid: true})
       
    }

    render () {

        const {firstname, lastname, email, password, confirmPassword, redirection, errors} = this.state;

        if(localStorage.getItem('token')){
            return <Redirect to='/post' />
        }
        
        if(redirection){
            return <Redirect to='/'/>;
        }

        let errorArray = Object.keys(errors)
        .map(id => (
            <p className="errors" key={id}>
                {errors[id]}
            </p>
        ))

        return (

            <Fragment>
                <SignUp
                firstnameValue={firstname}
                lastnameValue={lastname}
                email={email}
                passwordValue={password}
                cpasswordValue={confirmPassword}
                Change={this.handleChange}
                Submit={this.handleSubmit}
                errors={errorArray}
                />
            </Fragment>
            

        )
    }
}

export default Signup
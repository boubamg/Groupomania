import React, { Component } from 'react'

import SignIn from '../../Form/Login_form'
import userAPI from '../../../Api/userAPI'
import {Redirect} from 'react-router-dom'
import './Connexion.css'

class loginForm extends Component {

    state = {
        email: "",
        password: "",
        admin: false,
        formIsValid: true,
        errors : {},
        redirection: false
    }

    handleChange = event => {
        const {name,value} = event.target;
        this.setState({[name]: value})
    }

    verification = () => {
        const {email, password, errors, formIsValid} = this.state;
        if(!/^[A-Za-z0-9_.-]+@[A-Za-z0-9_.-]+\.[A-Za-z]{2,}$/.test(email)){
        errors['email'] = "L'email est invalide";
        this.setState({formIsValid: false})
        }

        if(!password || password.length < 8 ){
            errors["password"] = "Le mot de passe est invalide";
            this.setState({formIsValid: false})
        }
        this.setState({errors})
        return formIsValid;
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const {email, password} = this.state

        if(this.verification()){
            userAPI.login(email, password)
            .then(response => { 
                if(response.data.isAdmin){
                    this.setState({admin: true})
                }
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('userId', response.data.userId)
                
                // redirect
                this.setState({redirection: true})
            })
            .catch(err => console.log(err))
        } else {
            console.log("Form has errors")
        }

        this.setState({formIsValid: true})
    }

    render () {

        if(localStorage.getItem('token')){
            return <Redirect to='/post' />
        }
        
        if(this.state.redirection){
            return <Redirect to='/post'/>;

        }

        let {email, password, errors} = this.state

        let errorArray = Object.keys(errors)
        .map(id => (
            <p className="errors" key={id}>
                {errors[id]}
            </p>
        ))

        return (

            <SignIn
            emailValue={email}
            passwordValue={password}
            Change={this.handleChange} 
            Submit={this.handleSubmit}
            errors={errorArray}
            />
        )
    }
}

export default loginForm
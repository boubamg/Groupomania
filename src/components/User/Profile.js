import React from "react";
import API from '../../Api/userAPI'
import { Redirect } from 'react-router-dom'
import ProfileComponent from './Profile/Profile'

import UpdateProfileForm from './updateProfile'


class Profile extends React.Component {

    state = {
        user: {},
        redirect: false,
        reqHeader: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }

  componentDidMount() {
  
    API.getProfile(this.state.reqHeader)
    .then(user => {
        this.setState({
            user: user.data
        })
    })
    .catch(err => console.log(err))
  }

  handleDelete = () => {
    API.deleteAccount(this.state.reqHeader)
    .then(() => {
        console.log("Account was deleted")
        localStorage.clear()
        this.setState({redirect: true})
    })
    .catch(err => {
        console.log(err)
    })
}

  render() {

    const {user, redirect} = this.state

    if(!localStorage.getItem('token')){
        return <Redirect to='/' />
    }

    if(redirect){
        return <Redirect to='/' />
    }

    return ( 
      <ProfileComponent
        profilePicture={user.profilePicture}
        lastname={user.lastname} 
        firstname={user.firstname}
        email={user.email}
        biography={user.biography}
        component={<UpdateProfileForm />}
        handleDelete={this.handleDelete}
      />
    )
  }
}

export default Profile;

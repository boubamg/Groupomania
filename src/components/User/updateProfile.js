import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import API from '../../Api/userAPI'
import UpdateProfileForm from '../Form/updateProfile_form'


class updateProfile extends Component {

    state = {
        biography: "",
        profilePicture: null,
        fileName: "",
        reqHeader: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }

    handleChange = (e) => {
        let {name, value} = e.target
        this.setState({ [name]: value })
    }

    handleSubmit = (e) => {
        

        let data = new FormData()
        data.append("biography", this.state.biography)
        data.append("profilePicture", this.state.profilePicture)

        API.putProfile(data, this.state.reqHeader)
        .then()
        .catch(err => {
            console.log(err)
        })
    }

    profilePictureChange = (e) => {
        this.setState({ profilePicture: e.target.files[0], fileName: e.target.files[0].name})

        
    }

    render () {

        let { biography, fileName } = this.state

        if(!localStorage.getItem('token')){
            return <Redirect to='/' />
        }

        return (
            <Fragment>
                <UpdateProfileForm
                biographyValue={biography}
                biographyChange={this.handleChange}
                profilePictureChange={this.profilePictureChange} 
                Submit={this.handleSubmit}
                fileName={fileName}
                />
                
            </Fragment>
            
        )
    }
}

export default updateProfile
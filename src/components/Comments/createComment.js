import React, { Component } from 'react'
import CommentForm from '../Form/Comment_form'
import commentAPI from '../../Api/commentAPI'


class createComment extends Component {

    state = {
        comment: "",
        reqHeader: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    handleSubmit = (event) => {
        event.preventDefault()

        commentAPI.postComments(this.props.id, this.state.comment, this.state.reqHeader)
        .then(() => this.setState({comment: ""}))
        .catch(err => console.log(err))
    }

    render () {
        return (
           <CommentForm 
            commentValue={this.state.comment}
            commentChange={this.handleChange}
            commentSubmit={this.handleSubmit}
           />
        )
    }
}

export default createComment
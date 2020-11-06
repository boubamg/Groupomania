import React, { Component, Fragment } from 'react'
import articlesAPI from '../../Api/articlesAPI'
import { Redirect } from 'react-router-dom'
import ArticleForm from '../Form/Article_form'

class updateArticle extends Component {

    state = {
        errors : [],
        content: '',
        attachment: null,
        fileName: '',
        redirect: false,
        reqHeader: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }

    handleChange = (event) => {
        const { name, value} = event.target
        this.setState({ [name]: value })
    }

    handleFileChange = (e) => {  
        this.setState({ attachment: e.target.files[0] , fileName: e.target.files[0].name});
    }

    handleSubmit = (event) => {
        event.preventDefault();

        let data = new FormData();
        data.append("content", this.state.content);
        data.append("attachment", this.state.attachment);

        const queryString =  window.location.href;
        let id = queryString.split('/update/')[1]

        console.log(id)

        articlesAPI.putArticle(id, data, this.state.reqHeader)
            .then(() => {
                console.log("Article mis à jour")
                this.setState({ redirect: true })
            })
            .catch(err => console.log(err))
    }

    render () {

        if(!localStorage.getItem('token')){
            return <Redirect to='/' />
        }

        if(this.state.redirect){
            return  <Redirect to='/post'/>
        }

        return (
            <Fragment>
                <ArticleForm 
                Submit={this.handleSubmit}
                contentValue={this.state.content}
                contentChange={this.handleChange}
                attachmentChange={this.handleFileChange}
                fileName={this.state.fileName}
                buttonContent="Mettre à jour"
                /> 
            </Fragment>
        )
    }
}

export default updateArticle
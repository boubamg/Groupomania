import React, { Component } from 'react'
import articlesAPI from '../../Api/articlesAPI'
import { Redirect } from 'react-router-dom'
import ArticleForm from '../Form/Article_form'


class createArticle extends Component {

    state = {
        errors : [],
        content: '',
        attachment: null,
        fileName: "",
        redirect: false,
        reqHeader: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }

    handleSubmit = () => {

        let data = new FormData();
        data.append("content", this.state.content);
        data.append("attachment", this.state.attachment);

        articlesAPI.postArticles(data, this.state.reqHeader)
            .then(() => {
                console.log("Article ajouté")
               this.setState({ redirect: true })
            })
            .catch(err => console.log(err))
    }

    handleChange = (event) => {
        const { name, value} = event.target
        this.setState({ [name]: value })
    }

    handleFileChange = (e) => {  
        this.setState({ attachment: e.target.files[0] , fileName: e.target.files[0].name});
    }

    render () {

        if(!localStorage.getItem('token')){
            return <Redirect to='/' />
        }

        if(this.state.redirect){
            return  <Redirect to='/post'/>
        }

        return (
           <ArticleForm 
           contentValue={this.state.content}
           contentChange={this.handleChange}
           attachmentChange={this.handleFileChange}
           fileName={this.state.fileName}
           Submit={this.handleSubmit}
           buttonContent="Publier"
           /> 
        )
    }
}

export default createArticle
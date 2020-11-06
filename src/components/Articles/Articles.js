import React, { Component, Fragment } from 'react'
import articleAPI from '../../Api/articlesAPI'
import Article from './Article/Article';
import CreateArticleForm from './createArticle'
import { Redirect, withRouter } from 'react-router-dom';
import CreateComment from '../Comments/createComment'


class allArticles extends Component {

    state = {
        posts: {},
        isLoaded: false,
        update: false,
        updateArticle: null,
        error : null,
        isAdmin: false,
        id: "",
        reqHeader: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
    }

    componentDidMount(){

        articleAPI.getArticles(this.state.reqHeader)
        .then(articles => {
            
            this.setState({
                posts: articles.data.article,
                isAdmin: articles.data.isAdmin })
        })
        .catch(err => console.log(err))
    }

    handleLikeClick = (id) => {
        articleAPI.likeArticle(id, this.state.reqHeader)
        .then((res) => {
            console.log(res)
            let posts = [...this.state.posts]
            let post = posts.find(post => post.id === id)
            if(res.status === 201){
                post.likes += 1
            } else {
                post.likes -= 1
            }
            this.setState({posts})
        })
        .catch((err) => console.log(err))
    }

    handleDeletePost = (id) => {
        articleAPI.deleteArticle(id, this.state.reqHeader)
        .then(() => {
            let posts = [...this.state.posts]
            let deletePost = posts.find(posts => posts.id === id)
            var removeIndex = posts.map(function(item) { return item.id; }).indexOf(deletePost.id);
            posts.splice(removeIndex, 1);
            this.setState({posts})
            console.log("Article supprimé")
        })
        .catch(err => console.log(err))
    }

    handleUpdatePost = (id) => {
        this.setState({update: true, updateArticle: id})
    }

    render () {

        const {posts, update, updateArticle, isAdmin} = this.state


        if(update){
            return <Redirect to={'/post/update/' + updateArticle } />
        }

        const liste = Object.keys(posts)
        .map(id => (
            <Article 
            key={posts[id].id}
            profilePicture={posts[id].User.profilePicture}
            name={posts[id].User.firstname + ' ' + posts[id].User.lastname}
            likes={posts[id].likes}
            content={posts[id].content} 
            attachment={posts[id].attachment}
            handleLikeClick={() => this.handleLikeClick(posts[id].id)}
            handleDelete={() => this.handleDeletePost(posts[id].id)}
            handleUpdate={() => this.handleUpdatePost(posts[id].id)}
            commentFormComponent={<CreateComment id={posts[id].id} />}
            creator={posts[id].UserId}
            articleId={posts[id].id}
            isAdmin={isAdmin}
            />
        ))

        return (
            <Fragment>
                <CreateArticleForm />
                {liste}
            </Fragment>
        )
    }
}

export default withRouter(allArticles)
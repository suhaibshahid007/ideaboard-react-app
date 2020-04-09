import React, { Component } from 'react'
import axios from 'axios'

class IdeaForm extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            title: props.idea.title, 
            body:  props.idea.body
        }
    }
    handleChange = (e) =>{
        this.setState({[e.target.name]: e.target.value})
    }
    handleBlur = () => {
        const idea = {
            title: this.state.title,
            body: this.state.body
        }
        axios.put(
            `http://localhost:3001/api/v1/ideas/${this.props.idea.id}`,
            {
                idea: idea
            }
        )   
        .then(response => {
            console.log(response)
            this.props.updateIdea(response.data)
        })
        .catch(error => console.log(error));
    }
    render(){
        return(
            <div className="tile" key={this.props.idea.id}>
                <form onBlur={this.handleBlur}>
                    <input className="input" type="text" name="title" value={this.state.title}
                        onChange={this.handleChange} placeholder="Enter a Titile" />
                    <textarea className="input" name="body" value= {this.state.body} 
                        onChange={this.handleChange} placeholder="Describe your idea"/>

                </form>
            </div>
        );
    }
}

export default IdeaForm;
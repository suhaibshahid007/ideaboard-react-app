import React from 'react'
import axios from 'axios'
import Idea from '../components/Idea'
import update from 'immutability-helper'
import IdeaForm from './IdeaForm'

class IdeaContainer extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            ideas: [],
            editingIdeaId: null
        }

    }

    componentDidMount(){
        axios.get('http://localhost:3001/api/v1/ideas')
        .then(response => {
            console.log(response)
            debugger
            this.setState({ideas: response.data})
        })
        .catch(error => console.log(error))
    }

    addNewIdea = () => {
        axios.post(
            'http://localhost:3001/api/v1/ideas',
            {idea:
                {
                    title: '',
                    body: ''
                }
            } 
        )
        .then(response => {
            console.log(response)
            const ideas = update(this.state.ideas, {
                $splice: [[0, 0, response.data ]]
            })
            this.setState({
                ideas: ideas,
                editingIdeaId: response.data.id
            })
        })
        .catch(error => console.log(error))
    }

    render() {
        debugger    
        return(
            <div>
                <div>
                    <button className="newIdeaButton"
                        onClick={this.addNewIdea}>
                        New Idea
                    </button>
                </div>    
            
                {this.state.ideas.map((idea) => {
                    if (this.state.editingIdeaId === idea.id)
                    {
                        return(<IdeaForm idea={idea} key={idea.id} />)
                    }
                    else{
                        return (<Idea idea={idea} key={idea.id} />)
                    }
                })}
            </div>
        );
    }
}

export default IdeaContainer;

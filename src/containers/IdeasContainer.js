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
            editingIdeaId: null,
            notification: ''
        }

    }

    resetNotification = (ideas) =>{
        this.setState({ ideas: ideas, editingIdeaId: null, notification: 'All Changes Saved'  }, ()=>{
            window.setTimeout(() =>{
              this.setState({ notification: '' })
            }, 1000)
          });
    }

    enableEditing = (id) =>{
        this.setState({editingIdeaId: id})
    }

    componentDidMount(){
        debugger
        axios.get(process.env.REACT_APP_API_URL + '/api/v1/ideas')
        .then(response => {
            console.log(response)
            debugger
            this.setState({ideas: response.data})
        })
        .catch(error => console.log(error))
    }

    addNewIdea = () => {
        axios.post(
            process.env.REACT_APP_API_URL + '/api/v1/ideas',
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

    updateIdea = (idea) =>{
        const ideaIndex = this.state.ideas.findIndex((x) => x.id === idea.id)
        const ideas = update(this.state.ideas, {
            [ideaIndex]: {$set: idea}
        })
        this.resetNotification(ideas)
    }

    deleteIdea = (id) =>{
        axios.delete(process.env.REACT_APP_API_URL + `/api/v1/ideas/${id}`)
        .then(response => {
            debugger
            const ideaIndex = this.state.ideas.findIndex(x => x.id === id)
            const ideas = update(this.state.ideas, {$splice: [[ideaIndex, 1]]})
            this.setState({ideas: ideas})
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

                    <span className="notification">
                        {this.state.notification}
                    </span>
                </div>    
            
                {this.state.ideas.map((idea) => {
                    if (this.state.editingIdeaId === idea.id)
                    {
                        return(<IdeaForm idea={idea} key={idea.id}
                            updateIdea = {this.updateIdea}
                            resetNotification = {this.resetNotification}
                        />)
                    }
                    else{
                        return (<Idea idea={idea} key={idea.id} onClick={this.enableEditing} onDelete={this.deleteIdea}/>)
                    }
                })}
            </div>
        );
    }
}

export default IdeaContainer;

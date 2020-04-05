import React from 'react'

const Idea = ({idea}) => {
    return(
        <div className="tile" key={idea.id}>
            <h4>{idea.title}</h4>
            <p>{idea.body}</p>
        </div>
    )
}

export default Idea
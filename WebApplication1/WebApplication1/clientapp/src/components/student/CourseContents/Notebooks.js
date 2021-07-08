import React from 'react'

const Notebooks = (props) => {
    let { id } = props.classId
    console.log(props);
    return (
        <div>
            {id}
        </div>
    )
}

export default Notebooks

import React from 'react'

function Currency(props) {
    return (
        <div className="currency">
            <div className="code">{props.code}</div>
            <div className="name">{props.name}</div>
        </div>
    )
}

export default Currency

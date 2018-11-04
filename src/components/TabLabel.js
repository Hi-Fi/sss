import React from 'react';

var closeStyle = {
    color: 'red',
    float: 'right',
    paddingLeft: '10px'
}

export default function TabLabel(props) {
    return <div>{props.name} <div style={closeStyle} onClick={props.closeFunction}>X</div>
        </div>;
}

import React from 'react';
import * as style from './style';

function TextField(props) {
    const { disabled, value, error } = props;
    if (disabled) {
        // console.log('disabled is : ',props.disabled);
        // console.log('--------------------end of disabled-------------------------');
        return (
            <>
                <h2>This is Disabled Input</h2>
                <input style={style.disableInput} type="text" defaultValue="Disabled Input" disabled />
            </>
        );
    }
    if (value) {
        // console.log('value is : ',props.value);
        // console.log('--------------------end of value-------------------------');
        return (
            <>
                <h2>A Valid Input</h2>
                <input style={style.validInput} type="text" defaultValue={props.value} />
            </>
        );
    }
    if (error) {
        // console.log('error is : ',props.error);
        // console.log('--------------------end of error-------------------------');
        return (
            <>
                <h2>An Input with errors</h2>
                <input style={style.error} type="text" defaultValue="101" />
                <p style={{ color: 'red' }}> Could not be greater than </p>
            </>
        );
    }
}
export default TextField;
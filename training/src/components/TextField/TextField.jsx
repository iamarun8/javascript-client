import React from 'react';
import * as style from './style';

function TextField(props) {
    const { disabled, value, error } = props;
    console.log('value is : ',props.value);
    console.log('disabled is : ',props.disabled);
    console.log('error is : ',props.error);
    if (disabled) {
        return (
            <>
                <h2>This is Disabled Input</h2>
                <input style={style.disableInput} type="text" disabled={disabled} />
            </>
        );
    }
    if (value) {
        return (
            <>
                <h2>A Valid Input</h2>
                <input style={style.validInput} type="text" defaultValue={value} />
            </>
        );
    }
    if (error) {
        return (
            <>
                <h2>An Input with errors</h2>
                <input style={style.error} type="text" value="101" />
                <p style={{ color: 'red' }}> Could not be greater than </p>
            </>
        );
    }
}
export default TextField;
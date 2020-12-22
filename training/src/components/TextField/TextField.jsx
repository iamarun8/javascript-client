import React from 'react';
import * as style from './style';
import PropTypes from 'prop-types';

function TextField(props) {
    const { disabled, value, error } = props;
    if (disabled) {
        // console.log('disabled is : ',props.disabled);
        // console.log('--------------------end of disabled-------------------------');
        return (
            <>
                <h2 style={style.h}>This is Disabled Input</h2>
                <input style={style.disableInput} type="text" defaultValue="Disabled Input" disabled={disabled} />
            </>
        );
    }
    if (value) {
        // console.log('value is : ',props.value);
        // console.log('--------------------end of value-------------------------');
        return (
            <>
                <h2 style={style.h}>A Valid Input</h2>
                <input style={style.validInput} type="text" defaultValue={value} />
            </>
        );
    }
    if (error) {
        // console.log('error is : ',props.error);
        // console.log('--------------------end of error-------------------------');
        return (
            <>
                <h2 style={style.h}>An Input with errors</h2>
                <input style={style.error} type="text" defaultValue={error} />
                <p style={{ color: 'red' }}> Could not be greater than </p>
            </>
        );
    }
}

TextField.propTypes = {
    disabled: PropTypes.bool,
    value: PropTypes.string,
    error: PropTypes.string,
};
TextField.defaultProps = {
    disabled: '',
    value: '',
    error: '',
};

export default TextField;
import React from 'react';
import PropTypes from 'prop-types';
import { Error, Input } from './style';

const TextField = (props) => {
    const { value, error, onChange, onBlur} = props;
    console.log('value')
    if (error) {
        return (
            <>
                <Input type="text" onBlur={onBlur} value={value} error={error} onChange={onChange} />
                <Error>{error}</Error>
            </>
        );
    }
    return (
        <Input type="text" error={error} onChange={onChange} />
    );
};

export default TextField;
TextField.propTypes = {
    error: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired
};
TextField.defaultProps = {
    disabled: false,
    error: true,
};
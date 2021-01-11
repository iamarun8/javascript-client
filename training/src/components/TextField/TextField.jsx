import React from 'react';
import PropTypes from 'prop-types';
import { Error, Input } from './style';

const TextField = (props) => {
    const { value, error, onChange, onBlur, disabled} = props;
    if (error) {
        return (
            <>
                <Input type="text" onBlur={onBlur} defaultValue={value} disabled={disabled} error={error} onChange={onChange} />
                <Error>{error}</Error>
            </>
        );
    }
    return (
        <Input type="text" error={error} onChange={onChange} onBlur={onBlur} />
    );
};

export default TextField;
TextField.propTypes = {
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    disabled: PropTypes.bool,
};
TextField.defaultProps = {
    disabled: false,
    onBlur: () => {},
};
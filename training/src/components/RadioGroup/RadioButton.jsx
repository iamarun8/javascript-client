import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Input, Err } from './style';

function RadioButton(props) {
    const {error, onChange, options, onBlur} = props;
    return (
        <>
            { options && options.length && options.map(({ value, label }) => (
                <Fragment key={label}>
                    <Input type="radio" name="sport" value={value} onChange={onChange} error={error} onBlur={onBlur} />
                    { label}
                    <br />
                </Fragment>
            ))}
            <Err>{error}</Err>
        </>
    );
}
export default RadioButton
RadioButton.propTypes = {
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.object),
    onBlur: PropTypes.string.isRequired
};
RadioButton.defaultProps = {
    error: '',
    options: [],
};
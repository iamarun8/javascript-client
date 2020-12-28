import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Input } from './style';

function RadioButton(props) {
    const {error, onChange, options} = props;
    return (
        <>
            { options && options.length && options.map(({ value, label }) => (
                <Fragment key={label}>
                    <Input type="radio" name="sport" value={value} onChange={onChange} error={error} />
                    { label}
                    <br />
                </Fragment>
            ))}
        </>
    );
}
export default RadioButton
RadioButton.propTypes = {
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.object),
};
RadioButton.defaultProps = {
    error: '',
    options: [],
};
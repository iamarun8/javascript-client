import React from 'react';
import { TextField } from '../../components';

function TextFieldDemo() {
    return (
        <>
            <div style={{ border: '2px solid black' }}>
                <TextField disabled="true" />
                <TextField value="Accessible" />
                <TextField error="error field" />
            </div>
        </>
    );
}
export default TextFieldDemo;
import React from 'react';
import { TextField } from '../../components';
import { Slider } from '../../components/Slider';
import { Banner, DEFAULT_BANNER_IMAGE } from '../../configs/constants';

function TextFieldDemo() {
    return (
        <>
            <div style={{ backgroundColor: 'lightgray', width: '100%'}}>
                <Slider alt="No Image" duration="2000" height="300" random banner={Banner} defaultbanner={DEFAULT_BANNER_IMAGE} />
            </div>

            <div>
                <TextField disabled={true} />
                <TextField value="Accessible" />
                <TextField error="error field" />
            </div>
        </>
    );
}
export default TextFieldDemo;
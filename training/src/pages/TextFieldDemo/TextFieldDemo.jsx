import React from 'react';
import { TextField } from '../../components';
import { Slider } from '../../components/Slider';
import { banners, DEFAULT_BANNER_IMAGE } from '../../configs/constants';

function TextFieldDemo() {
    return (
        <>
            <div style={{ backgroundColor: 'lightgray', width: '100%'}}>
                <Slider alt="No Image" duration={2000} height={200} random banner={banners} defaultbanner={DEFAULT_BANNER_IMAGE} />
            </div>

            <div>
                <p><b>This is a Disabled Input</b></p>
                <TextField disabled value="Disabled Input" error />
                <p><b> A Valid Input</b></p>
                <TextField value="Accessible" />
                <p><b>An Input with Errors </b></p>
                <TextField error="Could not be more than" value="101" />
            </div>
        </>
    );
}
export default TextFieldDemo;
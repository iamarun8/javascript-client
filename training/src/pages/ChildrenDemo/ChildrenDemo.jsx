import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import Math from '../../components/Math/Math';
import Theme from '../../theme';

function ChildrenDemo() {
    return (
        <>
            <ThemeProvider theme={Theme} />
            <Math first={7} second={4} operator="+">
                {
                    (first, second, result) => (<p> Sum of {first} and {second} is equal to {result} </p>)
                }
            </Math>
            <Math first={7} second={3} operator="-">
                {
                    (first, second, result) => (<p> Subtraction of {first} and {second} is {result} </p>)
                }
            </Math>
            <Math first={7} second={0} operator="/">
                {
                    (first, second, result) => (<p> Division of {first} and {second} is equal to {result} </p>)
                }
            </Math>
            <Math first={7} second={4} operator="^">
                {
                    (first, second, result) => (<p> {first} and {second} is solve by {result} </p>)
                }
            </Math><Math first={3} second={4} operator="+">
                {
                    (first, second, result) => (<p> When we add {first} with {second} then we get {result} </p>)
                }
            </Math>
        </>
    );
}
export default ChildrenDemo;
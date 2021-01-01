import styled, { css } from 'styled-components';

const Input = styled.input`
color: solid gray;
overflow: hidden;
padding: 0.7%;
border-radius: 5px;
border: 1px solid gray;
width: 98%;
${(props) => props.error
        && css`
border: 1px solid gray;
color: black;
`};
}
${(props) => (props.value && !props.disabled && !props.error)
        && css`
        border: 1px solid orange;
        color: black;
`};
}
`;
const Div = styled.div`
2%;
`;
const Error = styled.p`
color: red;
`;
export { Div, Error, Input };
import PropTypes from 'prop-types';

const Math = (props) => {
    const { first, second, operator, children } = props;
    let { result } = props;
    console.log('result', result);
    console.log('childern', children);  
    console.log('first',first);  
    console.log('second', second );  


    switch (operator) {
        case '+': result = first + second;
            break;
        case '-': result = first - second;
            break;
        case '/': result = first / second;
            break;
        case '*': result = first * second;
            break;
        default:
            result = 'Invalid Operator';
            break;
    }
    if (children) {
        return children(first, second, result);
    }
};
Math.propTypes = {
    first: PropTypes.number.isRequired,
    second: PropTypes.number.isRequired,
    operator: PropTypes.string.isRequired,
    children: PropTypes.func,
    result: PropTypes.number.isRequired,
};
Math.defaultProps = {
    children: undefined,
};
export default Math;
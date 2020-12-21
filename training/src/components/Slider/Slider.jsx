import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PUBLIC_IMAGE_FOLDER, DEFAULT_BANNER_IMAGE, total } from '../../configs/constants';
import { getRandomNumber, getNextRoundRobin } from '../../lib/utils/math';

class Slider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: -1,

        };
    }

    componentDidMount = () => {
        const { random, duration } = this.props;
        let { current } = this.state;
        this.id = setInterval(() => {
            if (random) {
                current = getRandomNumber(total);
            } else {
                current = getNextRoundRobin(current, total);
            }
            this.setState({ current });
        }, duration);
    }

    componentWillUnmount = () => {
        clearInterval(this.id);
    }

    render() {
        const { current } = this.state;
        const {
            altText, height, duration, banner, defaultbanner,
        } = this.props;
        const src = (current === -1 || banner.length === 0) ? `${PUBLIC_IMAGE_FOLDER}${defaultbanner}` : `${PUBLIC_IMAGE_FOLDER}${banner[current]}`;
        return (
            <>
                <div align="center">
                    <img src={src} alt={altText} height={height} duration={duration} />
                </div>
            </>
        );
    }
}
Slider.propTypes = {
    altText: PropTypes.string,
    banner: PropTypes.arrayOf(PropTypes.string),
    defaultbanner: PropTypes.string,
    duration: PropTypes.number,
    height: PropTypes.number,
    random: PropTypes.bool,
};
Slider.defaultProps = {
    altText: 'default banner',
    banner: [],
    defaultbanner: DEFAULT_BANNER_IMAGE,
    duration: 2000,
    height: 200,
    random: false,
};
export default Slider;
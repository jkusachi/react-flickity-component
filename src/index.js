import React, {Component} from 'react';
import PropTypes from 'prop-types';

const isBrowser = (typeof window !== 'undefined');

export default class FlickityComponent extends Component {

  state = {
    selectedIndex: 0,
  };

  constructor() {
    super();
    this.imagesLoaded = this.imagesLoaded.bind(this);
    this.updateSelected = this.updateSelected.bind(this);
  }

  componentDidMount() {
    const carousel = this.carousel;
    const {options} = this.props;

    this.flkty = new Flickity(carousel, options)
    this.flkty.on('cellSelect', this.updateSelected)
    this.imagesLoaded()
  }

  componentWillUnmount() {
    if (this.flkty) {
      this.flkty.off('cellSelect', this.updateSelected)
      this.flkty.destroy()
    }
  }

  imagesLoaded() {
    const { disableImagesLoaded } = this.props;
    if (disableImagesLoaded) return
    imagesloaded(
      this.carousel,
      function (instance) {
        this.flkty.reloadCells()
      }.bind(this)
    );
  }

  updateSelected() {
    const {onSwipe} = this.props;
    var index = this.flkty.selectedIndex
    this.setState({
      selectedIndex: index
    });
    onSwipe(index);
  }

  render() {
    const {children, className, elementType} = this.props;

    return React.createElement(elementType, {
      className,
      ref: (v => { this.carousel = v; }),
    }, children);
  }
}

FlickityComponent.propTypes = {
  disableImagesLoaded: PropTypes.bool,
  options: PropTypes.object,
  className: PropTypes.string,
  elementType: PropTypes.string,
  children: PropTypes.array,
  onSwipe: PropTypes.func
};

FlickityComponent.defaultProps = {
  disableImagesLoaded: false,
  options: {},
  onSwipe() {},
  className: '',
  elementType: 'div'
};

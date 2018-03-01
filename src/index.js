import React, {Component} from 'react';
import PropTypes from 'prop-types';

const isBrowser = (typeof window !== 'undefined');

export default class FlickityComponent extends Component {

  constructor(props) {
    super(props);
    this.imagesLoaded = this.imagesLoaded.bind(this);
    this.updateSelected = this.updateSelected.bind(this);
  }

  componentDidMount() {
    const {
      options,
      initOnServer,
      deactivate,
    } = this.props;

    if ((isBrowser || initOnServer)) {
      const Flickity = require('flickity');
      this.flkty = new Flickity(this.carousel, options);
      this.flkty.on('cellSelect', this.updateSelected);
      this.imagesLoaded();
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      options,
      deactivate,
    } = nextProps;

    if (this.flkty) {
      if (options) {
        this.flkty.option(options);
      }

      if (deactivate && this.flkty.isActive) {
        this.flkty.deactivate();
      } else {
        this.flkty.activate();
      }
    }
  }

  componentWillUnmount() {
    if (this.flkty) {
      this.flkty.off('cellSelect', this.updateSelected);
      this.flkty.destroy();
    }
  }

  imagesLoaded() {
    const { disableImagesLoaded } = this.props;
    if (disableImagesLoaded) {
      return;
    }

    imagesloaded(
      this.carousel,
      function (instance) {
        this.flkty.reloadCells();
      }.bind(this)
    );
  }

  updateSelected() {
    const { onSwipe } = this.props;
    const index = this.flkty.selectedIndex;

    onSwipe(index);
  }

  render() {
    const {children, className, elementType} = this.props;

    return React.createElement(elementType, {
      className,
      ref: (carousel) => {
        this.carousel = carousel;
      },
    }, children);
  }
}

FlickityComponent.propTypes = {
  disableImagesLoaded: PropTypes.bool,
  options: PropTypes.object,
  className: PropTypes.string,
  elementType: PropTypes.string,
  children: PropTypes.array,
  onSwipe: PropTypes.func,
  initOnServer: PropTypes.bool,
  deactivate: PropTypes.bool,
};

FlickityComponent.defaultProps = {
  disableImagesLoaded: false,
  options: {},
  onSwipe() {},
  className: '',
  elementType: 'div',
  initOnServer: false,
  deactivate: false,
};

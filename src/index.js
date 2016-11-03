
import React, { Component } from 'react';

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
    const { options } = this.props;

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
    const { onSwipe } = this.props;
    var index = this.flkty.selectedIndex
    this.setState({
      selectedIndex: index
    });
    onSwipe(index);
  }

  render() {
    const { children, className, elementType } = this.props;

    return React.createElement(elementType, {
      className,
      ref: (v => { this.carousel = v; }),
    }, children);
  }
}

FlickityComponent.propTypes = {
  disableImagesLoaded: React.PropTypes.bool,
  options: React.PropTypes.object,
  className: React.PropTypes.string,
  elementType: React.PropTypes.string,
  children: React.PropTypes.array,
  onSwipe: React.PropTypes.func
};

FlickityComponent.defaultProps = {
  disableImagesLoaded: false,
  options: {},
  onSwipe() {},
  className: '',
  elementType: 'div'
};


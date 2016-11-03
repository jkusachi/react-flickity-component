'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var isBrowser = typeof window !== 'undefined';

var FlickityComponent = function (_Component) {
  _inherits(FlickityComponent, _Component);

  function FlickityComponent() {
    _classCallCheck(this, FlickityComponent);

    var _this = _possibleConstructorReturn(this, (FlickityComponent.__proto__ || Object.getPrototypeOf(FlickityComponent)).call(this));

    _this.state = {
      selectedIndex: 0
    };

    _this.imagesLoaded = _this.imagesLoaded.bind(_this);
    _this.updateSelected = _this.updateSelected.bind(_this);
    return _this;
  }

  _createClass(FlickityComponent, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var carousel = this.carousel;
      var options = this.props.options;


      this.flkty = new Flickity(carousel, options);
      this.flkty.on('cellSelect', this.updateSelected);
      this.imagesLoaded();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.flkty) {
        this.flkty.off('cellSelect', this.updateSelected);
        this.flkty.destroy();
      }
    }
  }, {
    key: 'imagesLoaded',
    value: function imagesLoaded() {
      var disableImagesLoaded = this.props.disableImagesLoaded;

      if (disableImagesLoaded) return;
      imagesloaded(this.carousel, function (instance) {
        this.flkty.reloadCells();
      }.bind(this));
    }
  }, {
    key: 'updateSelected',
    value: function updateSelected() {
      var onSwipe = this.props.onSwipe;

      var index = this.flkty.selectedIndex;
      this.setState({
        selectedIndex: index
      });
      onSwipe(index);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          children = _props.children,
          className = _props.className,
          elementType = _props.elementType;


      return _react2.default.createElement(elementType, {
        className: className,
        ref: function ref(v) {
          _this2.carousel = v;
        }
      }, children);
    }
  }]);

  return FlickityComponent;
}(_react.Component);

exports.default = FlickityComponent;


FlickityComponent.propTypes = {
  disableImagesLoaded: _react2.default.PropTypes.bool,
  options: _react2.default.PropTypes.object,
  className: _react2.default.PropTypes.string,
  elementType: _react2.default.PropTypes.string,
  children: _react2.default.PropTypes.array,
  onSwipe: _react2.default.PropTypes.func
};

FlickityComponent.defaultProps = {
  disableImagesLoaded: false,
  options: {},
  onSwipe: function onSwipe() {},

  className: '',
  elementType: 'div'
};
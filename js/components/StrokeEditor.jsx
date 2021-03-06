/*
 * Copyright 2015-present Boundless Spatial Inc., http://boundlessgeo.com
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and limitations under the License.
 */

import React from 'react';
import ColorPicker from 'react-color';
import classNames from 'classnames';
import {intlShape, defineMessages, injectIntl} from 'react-intl';
import TextField from 'material-ui/TextField';
import Label from './Label';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import pureRender from 'pure-render-decorator';

const messages = defineMessages({
  strokewidthlabel: {
    id: 'strokeeditor.strokewidthlabel',
    description: 'Label for the stroke width input',
    defaultMessage: 'Stroke width'
  },
  strokecolorlabel: {
    id: 'strokeeditor.strokecolorlabel',
    description: 'Label for stroke color picker',
    defaultMessage: 'Stroke color'
  }
});

/**
 * Style editor for stroke properties (color and width).
 */
@pureRender
class StrokeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      strokeColor: this.props.initialStrokeColor,
      strokeWidth: this.props.initialStrokeWidth
    };
  }
  getChildContext() {
    return {muiTheme: getMuiTheme()};
  }
  _onChangeStrokeWidth(evt) {
    this.setState({strokeWidth: parseFloat(evt.target.value)}, function() {
      this.props.onChange(this.state);
    });
  }
  _onChangeStroke(color) {
    this.setState({strokeColor: color}, function() {
      this.props.onChange(this.state);
    });
  }
  render() {
    const {formatMessage} = this.props.intl;
    return (
      <div className={classNames('sdk-component stroke-editor', this.props.className)}>
        <TextField className="stroke-width" defaultValue={this.state.strokeWidth} floatingLabelText={formatMessage(messages.strokewidthlabel)} onChange={this._onChangeStrokeWidth.bind(this)} /><br/>
        <div className="stroke-color">
          <Label>{formatMessage(messages.strokecolorlabel)}:</Label>
          <ColorPicker type='chrome' onChangeComplete={this._onChangeStroke.bind(this)} color={this.state.strokeColor.rgb} />
        </div>
      </div>
    );
  }
}

StrokeEditor.propTypes = {
  /**
   * Callback that is called when a change is made.
   */
  onChange: React.PropTypes.func.isRequired,
  /**
   * Css class name to apply on the root element of this component.
   */
  className: React.PropTypes.string,
  /**
   * Initial stroke color.
   */
  initialStrokeColor: React.PropTypes.object,
  /**
   * Initial stroke width.
   */
  initialStrokeWidth: React.PropTypes.number,
  /**
  * i18n message strings. Provided through the application through context.
  */
  intl: intlShape.isRequired
};

StrokeEditor.defaultProps = {
  initialStrokeColor: {
    rgb: {
      r: 0,
      g: 0,
      b: 0,
      a: 1
    },
    hex: '#000000'
  },
  initialStrokeWidth: 1
};

StrokeEditor.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired
};

export default injectIntl(StrokeEditor);

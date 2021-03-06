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
import ol from 'openlayers';
import Snackbar from 'material-ui/Snackbar';
import FeatureStore from '../stores/FeatureStore';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import classNames from 'classnames';
import LayerSelector from './LayerSelector';
import SelectActions from '../actions/SelectActions';
import FilterService from '../services/FilterService';
import FilterHelp from './FilterHelp';
import {Toolbar} from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import RaisedButton from './Button';
import {defineMessages, injectIntl, intlShape} from 'react-intl';
import './QueryBuilder.css';
import pureRender from 'pure-render-decorator';

const messages = defineMessages({
  layerlabel: {
    id: 'querybuilder.layerlabel',
    description: 'Label for the layer combo box',
    defaultMessage: 'Layer'
  },
  filterlabel: {
    id: 'querybuilder.filterlabel',
    description: 'Label for the filter expression input field',
    defaultMessage: 'Filter'
  },
  filterbuttontext: {
    id: 'querybuilder.filterbuttontext',
    description: 'Text for the filter button',
    defaultMessage: 'Selected items based on your criteria'
  },
  errortext: {
    id: 'querybuilder.errortext',
    description: 'error text to shown when filter does not validate',
    defaultMessage: 'Invalid filter, should be for instance foo == "Bar"'
  },
  countmsg: {
    id: 'querybuilder.countmsg',
    description: 'text to show for displaying the number of features matched',
    defaultMessage: '{count, plural, =0 {No features} one {# feature} other {# features}} matched by filter.'
  },
  newbuttontitle: {
    id: 'querybuilder.newbuttontitle',
    description: 'Title for the new selection button',
    defaultMessage: 'New selection'
  },
  newbuttontext: {
    id: 'querybuilder.newbuttontext',
    description: 'Text for the new selection button',
    defaultMessage: 'New'
  },
  addbuttontitle: {
    id: 'querybuilder.addbuttontitle',
    description: 'Title for the add to current selection button',
    defaultMessage: 'Add to current selection'
  },
  addbuttontext: {
    id: 'querybuilder.addbuttontext',
    description: 'Text for the add to current selection button',
    defaultMessage: 'Add'
  },
  selectintitle: {
    id: 'querybuilder.selectintitle',
    description: 'Title for the refine current selection button',
    defaultMessage: 'Refine current selection'
  },
  selectintext: {
    id: 'querybuilder.selectintext',
    description: 'Text for the refine current selection button',
    defaultMessage: 'Refine'
  }
});

/**
 * A component that allows users to perform queries on vector layers. Queries can be new queries, added to existing queries or users can filter inside of an existing query a.k.a. drill-down.
 *
 * ```xml
 * <QueryBuilder map={map} />
 * ```
 */
@pureRender
class QueryBuilder extends React.Component {
  constructor(props, context) {
    super(props);
    FeatureStore.bindMap(this.props.map);
    this.state = {
      muiTheme: context.muiTheme || getMuiTheme(),
      showCount: false,
      errorText: null
    };
  }
  getChildContext() {
    return {muiTheme: getMuiTheme()};
  }
  _onLayerSelectChange(layer) {
    this._layer = layer;
  }
  _onSubmit(evt) {
    evt.preventDefault();
  }
  _filterLayerList(lyr) {
    return lyr.get('isSelectable');
  }
  _setQueryFilter(evt) {
    const {formatMessage} = this.props.intl;
    var expression;
    if (evt) {
      expression = evt.target.value;
    } else {
      expression = this.refs.queryExpression.getValue();
    }
    if (!expression) {
      this._queryFilter = null;
      this.setState({errorText: null});
    } else {
      try {
        this._queryFilter = FilterService.filter(expression);
        this.setState({errorText: null});
      } catch (e) {
        this._queryFilter = null;
        this.setState({errorText: formatMessage(messages.errortext)});
      }
    }
  }
  _doQuery(selectIn) {
    var selection = [];
    this._setQueryFilter();
    if (this._queryFilter === null) {
      return;
    }
    var features = FeatureStore.getState(this._layer).features.getFeatures();
    for (var i = 0, ii = features.length; i < ii; ++i) {
      var properties = features[i].getProperties();
      if (this._queryFilter(properties)) {
        features[i].selected = true;
        selection.push(features[i]);
      }
    }
    var count;
    if (selectIn === true) {
      count = FeatureStore.selectFeaturesInCurrentSelection(this._layer, selection);
    } else {
      SelectActions.selectFeatures(this._layer, selection, true);
      count = selection.length;
    }
    this.setState({
      showCount: true,
      open: true,
      count: count
    });
  }
  _addSelection() {
    this._doQuery();
  }
  _newSelection() {
    this._doQuery();
  }
  _inSelection() {
    this._doQuery(true);
  }
  _handleRequestClose() {
    this.setState({
      open: false
    });
  }
  getStyles() {
    const muiTheme = this.state.muiTheme;
    const rawTheme = muiTheme.rawTheme;
    return {
      root: {
        background: rawTheme.palette.canvasColor
      }
    };
  }
  render() {
    const styles = this.getStyles();
    const {formatMessage} = this.props.intl;
    var count;
    if (this.state.showCount === true) {
      count = (<Snackbar
        open={this.state.open}
        message={formatMessage(messages.countmsg, {count: this.state.count})}
        autoHideDuration={2000}
        onRequestClose={this._handleRequestClose.bind(this)}
      />);
    }
    return (
      <div style={styles.root} className={classNames('sdk-component query-builder', this.props.className)}>
        <LayerSelector {...this.props} onChange={this._onLayerSelectChange.bind(this)} id='layerSelector' ref='layerSelector' filter={this._filterLayerList} map={this.props.map} /><br/>
        <TextField floatingLabelText={formatMessage(messages.filterlabel)} errorText={this.state.errorText} ref='queryExpression' onChange={this._setQueryFilter.bind(this)} /><FilterHelp intl={this.props.intl} /><br/>
        <Toolbar>
          <RaisedButton label={formatMessage(messages.newbuttontext)} tooltip={formatMessage(messages.newbuttontitle)} onTouchTap={this._newSelection.bind(this)} />
          <RaisedButton label={formatMessage(messages.addbuttontext)} tooltip={formatMessage(messages.addbuttontitle)}onTouchTap={this._addSelection.bind(this)} />
          <RaisedButton label={formatMessage(messages.selectintext)} tooltip={formatMessage(messages.selectintitle)} onTouchTap={this._inSelection.bind(this)} />
        </Toolbar>
        {count}
      </div>
    );
  }
}

QueryBuilder.propTypes = {
  /**
   * The ol3 map whose layers can be used for the querybuilder.
   */
  map: React.PropTypes.instanceOf(ol.Map).isRequired,
  /**
   * i18n message strings. Provided through the application through context.
   */
  intl: intlShape.isRequired,
  /**
   * Css class name to apply on the root element of this component.
   */
  className: React.PropTypes.string
};

QueryBuilder.contextTypes = {
  muiTheme: React.PropTypes.object
};

QueryBuilder.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired
};

export default injectIntl(QueryBuilder);

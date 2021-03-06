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
global.React = React;

import ReactDOM from 'react-dom';
global.ReactDOM = ReactDOM;

import ol from 'openlayers';
global.ol = ol;

import {IntlProvider} from 'react-intl';
global.IntlProvider = IntlProvider;

import injectTapEventPlugin from 'react-tap-event-plugin';
global.injectTapEventPlugin = injectTapEventPlugin;

import getMuiTheme from 'material-ui/styles/getMuiTheme';
global.getMuiTheme = getMuiTheme;

import AppBar from 'material-ui/AppBar';
global.AppBar = AppBar;

import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
global.Toolbar = Toolbar;
global.ToolbarGroup = ToolbarGroup;

import IconMenu from 'material-ui/IconMenu';
global.IconMenu = IconMenu;

import MenuItem from 'material-ui/MenuItem';
global.MenuItem = MenuItem;

import {Tabs, Tab} from 'material-ui/Tabs';
global.Tabs = Tabs;
global.Tab = Tab;

import AddLayer from './components/AddLayer.jsx';
global.AddLayer = AddLayer;

import Bookmarks from './components/Bookmarks.jsx';
global.Bookmarks = Bookmarks;

import Button from './components/Button.jsx';
global.Button = Button;

import Chart from './components/Chart.jsx';
global.Chart = Chart;

import Edit from './components/Edit.jsx';
global.Edit = Edit;

import EditPopup from './components/EditPopup.jsx';
global.EditPopup = EditPopup;

import FeatureTable from './components/FeatureTable.jsx';
global.FeatureTable = FeatureTable;

import Geocoding from './components/Geocoding.jsx';
global.Geocoding = Geocoding;

import GeocodingResults from './components/GeocodingResults.jsx';
global.GeocodingResults = GeocodingResults;

import Geolocation from './components/Geolocation.jsx';
global.Geolocation = Geolocation;

import Globe from './components/Globe.jsx';
global.Globe = Globe;

import HomeButton from './components/HomeButton.jsx';
global.HomeButton = HomeButton;

import ImageExport from './components/ImageExport.jsx';
global.ImageExport = ImageExport;

import InfoPopup from './components/InfoPopup.jsx';
global.InfoPopup = InfoPopup;

import LayerList from './components/LayerList.jsx';
global.LayerList = LayerList;

import LoadingPanel from './components/LoadingPanel.jsx';
global.LoadingPanel = LoadingPanel;

import Login from './components/Login.jsx';
global.Login = Login;

import MapConfig from './components/MapConfig.jsx';
global.MapConfig = MapConfig;


import MapConfigTransformService from './services/MapConfigTransformService.js';
global.MapConfigTransformService = MapConfigTransformService;

import MapConfigService from './services/MapConfigService.js';
global.MapConfigService = MapConfigService;

import MapPanel from './components/MapPanel.jsx';
global.MapPanel = MapPanel;

import Measure from './components/Measure.jsx';
global.Measure = Measure;

import Navigation from './components/Navigation.jsx';
global.Navigation = Navigation;

import Playback from './components/Playback.jsx';
global.Playback = Playback;

import QGISLegend from './components/QGISLegend.jsx';
global.QGISLegend = QGISLegend;

import QGISPrint from './components/QGISPrint.jsx';
global.QGISPrint = QGISPrint;

import QueryBuilder from './components/QueryBuilder.jsx';
global.QueryBuilder = QueryBuilder;

import Rotate from './components/Rotate.jsx';
global.Rotate = Rotate;

import Select from './components/Select.jsx';
global.Select = Select;

import ToolActions from './actions/ToolActions.js';
global.ToolActions = ToolActions;

import WFST from './components/WFST.jsx';
global.WFST = WFST;

import Zoom from './components/Zoom.jsx';
global.Zoom = Zoom;

import ZoomSlider from './components/ZoomSlider.jsx';
global.ZoomSlider = ZoomSlider;

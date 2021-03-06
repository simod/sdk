/* global afterEach, beforeEach, describe, it */

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';
import {assert} from 'chai';
import raf from 'raf';
import ol from 'openlayers';
import intl from '../mock-i18n';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AddLayer from '../../js/components/AddLayer';

raf.polyfill();
injectTapEventPlugin();

var tapDataInjector = function(x, y) {
  return {
    touches: [{
      pageX: x,
      pageY: y,
      clientX: x,
      clientY: y
    }]
  };
};

describe('AddLayer', function() {
  var target, map, layer;
  var width = 360;
  var height = 180;

  beforeEach(function(done) {
    target = document.createElement('div');
    var style = target.style;
    style.position = 'absolute';
    style.left = '-1000px';
    style.top = '-1000px';
    style.width = width + 'px';
    style.height = height + 'px';
    document.body.appendChild(target);
    layer = new ol.layer.Tile({
      id: 'foo',
      isWFST: true,
      title: 'My Layer',
      source: new ol.source.OSM()
    });
    map = new ol.Map({
      target: target,
      layers: [layer],
      view: new ol.View({
        center: [0, 0],
        zoom: 1
      })
    });
    map.once('postrender', function() {
      done();
    });
  });

  afterEach(function() {
    map.setTarget(null);
    document.body.removeChild(target);
  });


  it('generates the correct drop zone', function(done) {
    var container = document.createElement('div');
    ReactDOM.render((
      <AddLayer intl={intl} map={map}/>
    ), container);
    var button = container.querySelector('button');
    TestUtils.SimulateNative.touchStart(button, tapDataInjector(0, 0));
    TestUtils.SimulateNative.touchEnd(button, tapDataInjector(0, 0));
    var dropzones = document.querySelectorAll('div.dropzone');
    assert.equal(dropzones.length, 1);
    window.setTimeout(function() {
      ReactDOM.unmountComponentAtNode(container);
      done();
    }, 500);
  });

});

/* global afterEach, beforeEach, describe, it */

import React from 'react';
import ReactDOM from 'react-dom';
import {assert} from 'chai';
import raf from 'raf';
import ol from 'openlayers';
import intl from '../mock-i18n';
import TestUtils from 'react-addons-test-utils';
import 'phantomjs-polyfill-object-assign';
import HomeButton from '../../js/components/HomeButton';

raf.polyfill();

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

describe('HomeButton', function() {
  var target, map;
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
    map = new ol.Map({
      target: target,
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


  it('zooms to the correct location when home button is pressed', function() {
    var container = document.createElement('div');
    ReactDOM.render((
      <HomeButton intl={intl} map={map}/>
    ), container);
    var button = container.querySelector('button');
    map.getView().setZoom(5);
    map.getView().setCenter([100, 100]);
    assert.equal(map.getView().getZoom(), 5);
    assert.equal(map.getView().getCenter()[0], 100);
    TestUtils.SimulateNative.touchStart(button, tapDataInjector(0, 0));
    TestUtils.SimulateNative.touchEnd(button, tapDataInjector(0, 0));
    assert.equal(map.getView().getZoom(), 1);
    assert.equal(map.getView().getCenter()[0], 0);
    ReactDOM.unmountComponentAtNode(container);
  });

});

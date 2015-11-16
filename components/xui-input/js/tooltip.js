/* globals Polymer */
   'use strict';

  /**
   * XUI Tooltip element used for adding up tooltips onto xui-input
   *
   * @class  XUITooltip
   * @constructor
   * 
   * @example
   *   <xui-tooltip title="Tooltip Title">Tooltip Description</xui-input>
   */

Polymer({
  is: 'xui-tooltip',
  properties:
  {

    /**
     * XUI Tooltip title
     *
     * @attribute  title
     * @type  String
     * @default   ""
     */
    title: {
    type: String,
    value: ''
    },
  }
});

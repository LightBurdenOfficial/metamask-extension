import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { getValueFromWeiHex } from '../../../../../helpers/utils/conversions.util';
import { LBCh } from '../../../../../helpers/constants/common';

export default class SendRowErrorMessage extends Component {
  static propTypes = {
    errors: PropTypes.object,
    errorType: PropTypes.string,
    lbchBalance: PropTypes.string,
  };

  static contextTypes = {
    t: PropTypes.func,
  };

  getDecimalValue(props) {
    const { lbchBalance: hexValue } = props;
    const decimalValueString = getValueFromWeiHex({
      value: hexValue,
      fromCurrency: LBCh,
      toCurrency: LBCh,
      numberOfDecimals: 6,
    });

    return Number(decimalValueString) || 0;
  }

  render() {
    const { errors, inErrorLBCh, errorType, lbchBalance } = this.props;

    const errorMessage = errors[errorType];

    return errorMessage ? (
      <div
        className={classnames('send-v2__error', {
          'send-v2__error-amount': errorType === 'amount',
        })}
      >
        {this.context.t(errorMessage)}{' '}
        {lbchBalance !== null && inErrorLBCh
          ? `${this.context.t(errors.lbchBalances)} ${this.getDecimalValue(
              this.props,
            )} ${LBCh}`
          : ''}
      </div>
    ) : null;
  }
}

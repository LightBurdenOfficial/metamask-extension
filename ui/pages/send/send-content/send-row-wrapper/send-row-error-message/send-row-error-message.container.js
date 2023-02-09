import { connect } from 'react-redux';
import {
  getSendErrors,
  getSendAsset,
  getLBChSpendableBalanceInString,
  sendLBChAmountIsInError,
} from '../../../../../ducks/send';
import { ASSET_TYPES } from '../../../../../../shared/constants/transaction';
import SendRowErrorMessage from './send-row-error-message.component';

export default connect(mapStateToProps)(SendRowErrorMessage);

function mapStateToProps(state, ownProps) {
  return {
    errors: getSendErrors(state),
    inErrorLBCh: sendLBChAmountIsInError(state),
    errorType: ownProps.errorType,
    lbchBalance:
      getSendAsset(state).type === ASSET_TYPES.NATIVE
        ? getLBChSpendableBalanceInString(state)
        : null,
  };
}

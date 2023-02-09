import { connect } from 'react-redux';
import { getSelectedIdentity } from '../../../selectors';
import {
  getLBChAddress,
  isLBChAddressShow,
} from '../../../ducks/metamask/metamask';
import SelectedAccount from './selected-account.component';

const mapStateToProps = (state) => {
  return {
    selectedIdentity: getSelectedIdentity(state),
    lbchAddress: getLBChAddress(state, getSelectedIdentity(state).address),
    isLBChAddressShow: isLBChAddressShow(state),
  };
};

export default connect(mapStateToProps)(SelectedAccount);

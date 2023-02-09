import { debounce } from 'lodash';
import { connect } from 'react-redux';
import {
  lookupEnsName,
  initializeEnsSlice,
  resetEnsResolution,
} from '../../../../ducks/ens';
import {
  getLBChAddressBook,
  isLBChAddressShow,
} from '../../../../ducks/metamask/metamask';
import EnsInput from './ens-input.component';

function mapStateToProps(state) {
  const lbchAddressBook = getLBChAddressBook(state);
  const isLBChAddressShowCheck = isLBChAddressShow(state);
  const {
    metamask: {
      provider: { chainId },
    },
  } = state;

  return {
    chainId,
    lbchAddressBook,
    isLBChAddressShowCheck,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    lookupEnsName: debounce((ensName) => dispatch(lookupEnsName(ensName)), 150),
    initializeEnsSlice: () => dispatch(initializeEnsSlice()),
    resetEnsResolution: debounce(() => dispatch(resetEnsResolution()), 300),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EnsInput);

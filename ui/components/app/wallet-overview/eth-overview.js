import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';
import { useHistory } from 'react-router-dom';

import Identicon from '../../ui/identicon';
import { I18nContext } from '../../../contexts/i18n';
import {
  SEND_ROUTE,
  BUILD_QUOTE_ROUTE,
} from '../../../helpers/constants/routes';
import Tooltip from '../../ui/tooltip';
import UserPreferencedCurrencyDisplay from '../user-preferenced-currency-display';
import { PRIMARY, SECONDARY } from '../../../helpers/constants/common';
import { showModal } from '../../../store/actions';
import {
  isBalanceCached,
  getShouldShowFiat,
  getCurrentKeyring,
  getSwapsDefaultToken,
  getIsSwapsChain,
  getIsBuyableChain,
  getNativeCurrencyImage,
  getSelectedAccountCachedBalance,
} from '../../../selectors/selectors';
import SwapIcon from '../../ui/icon/swap-icon.component';
import BuyIcon from '../../ui/icon/overview-buy-icon.component';
import SendIcon from '../../ui/icon/overview-send-icon.component';
import { setSwapsFromToken } from '../../../ducks/swaps/swaps';
import IconButton from '../../ui/icon-button';
import { isHardwareKeyring } from '../../../helpers/utils/hardware';
import { MetaMetricsContext } from '../../../contexts/metametrics';
import { EVENT, EVENT_NAMES } from '../../../../shared/constants/metametrics';
import Spinner from '../../ui/spinner';
import { startNewDraftTransaction } from '../../../ducks/send';
import { ASSET_TYPES } from '../../../../shared/constants/transaction';
import WalletOverview from './wallet-overview';

const EthOverview = ({ className }) => {
  const dispatch = useDispatch();
  const t = useContext(I18nContext);
  const trackEvent = useContext(MetaMetricsContext);
  const history = useHistory();
  const keyring = useSelector(getCurrentKeyring);
  const usingHardwareWallet = isHardwareKeyring(keyring?.type);
  const balanceIsCached = useSelector(isBalanceCached);
  const showFiat = useSelector(getShouldShowFiat);
  const balance = useSelector(getSelectedAccountCachedBalance);
  const isSwapsChain = useSelector(getIsSwapsChain);
  const isBuyableChain = useSelector(getIsBuyableChain);
  const primaryTokenImage = useSelector(getNativeCurrencyImage);
  const defaultSwapsToken = useSelector(getSwapsDefaultToken);

  return (
    <WalletOverview
      loading={!balance}
      balance={
        <Tooltip
          position="top"
          title={t('balanceOutdated')}
          disabled={!balanceIsCached}
        >
          <div className="eth-overview__balance">
            <div className="eth-overview__primary-container">
              {balance ? (
                <UserPreferencedCurrencyDisplay
                  className={classnames('eth-overview__primary-balance', {
                    'eth-overview__cached-balance': balanceIsCached,
                  })}
                  data-testid="eth-overview__primary-currency"
                  value={balance}
                  type={PRIMARY}
                  ethNumberOfDecimals={4}
                  hideTitle
                />
              ) : (
                <Spinner
                  color="var(--color-secondary-default)"
                  className="loading-overlay__spinner"
                />
              )}
              {balanceIsCached ? (
                <span className="eth-overview__cached-star">*</span>
              ) : null}
            </div>
            {showFiat && balance && (
              <UserPreferencedCurrencyDisplay
                className={classnames({
                  'eth-overview__cached-secondary-balance': balanceIsCached,
                  'eth-overview__secondary-balance': !balanceIsCached,
                })}
                data-testid="eth-overview__secondary-currency"
                value={balance}
                type={SECONDARY}
                ethNumberOfDecimals={4}
                hideTitle
              />
            )}
          </div>
        </Tooltip>
      }
      buttons={
        <>
          <IconButton
            className="eth-overview__button"
            data-testid="eth-overview-send"
            Icon={
              <img
                src="./images/icons/eth_send.svg"
                alt=""
                style={{ height: 26, width: 20 }}
              />
            }
            label={t('send')}
            onClick={() => {
              trackEvent({
                event: EVENT_NAMES.NAV_SEND_BUTTON_CLICKED,
                category: EVENT.CATEGORIES.NAVIGATION,
                properties: {
                  token_symbol: 'ETH',
                  location: 'Home',
                  text: 'Send',
                },
              });
              dispatch(
                startNewDraftTransaction({ type: ASSET_TYPES.NATIVE }),
              ).then(() => {
                history.push(SEND_ROUTE);
              });
            }}
          />
        </>
      }
      className={className}
      icon={<Identicon diameter={32} image={primaryTokenImage} />}
    />
  );
};

EthOverview.propTypes = {
  className: PropTypes.string,
};

EthOverview.defaultProps = {
  className: undefined,
};

export default EthOverview;
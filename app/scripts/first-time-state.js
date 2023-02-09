import {
  LBCh_SYMBOL,
  LBCh_MAINNET_CHAIN_ID,
  LBCh_MAINNET_DISPLAY_NAME,
  LBCh_MAINNET_RPC_URL,
  LBCh_TESTNET_CHAIN_ID,
  LBCh_TESTNET_DISPLAY_NAME,
  LBCh_TESTNET_RPC_URL,
  LBCh_REGTEST_CHAIN_ID,
  LBCh_REGTEST_DISPLAY_NAME,
  LBCh_REGTEST_RPC_URL,
} from '../../shared/constants/network';
/**
 * @typedef {object} FirstTimeState
 * @property {object} config Initial configuration parameters
 * @property {object} NetworkController Network controller state
 */

/**
 * @type {FirstTimeState}
 */
const initialState = {
  config: {},
  PreferencesController: {
    frequentRpcListDetail: [
      {
        rpcUrl: 'http://localhost:8545',
        chainId: '0x539',
        ticker: 'LBCh',
        nickname: 'Localhost 8545',
        rpcPrefs: {},
      },
      /*
      {
        rpcUrl: LBCh_MAINNET_RPC_URL,
        chainId: LBCh_MAINNET_CHAIN_ID,
        ticker: LBCh_SYMBOL,
        nickname: LBCh_MAINNET_DISPLAY_NAME,
        rpcPrefs: {
          blockExplorerUrl: 'https://explorer.lightburden.net/',
        },
      },
      {
        rpcUrl: LBCh_TESTNET_RPC_URL,
        chainId: LBCh_TESTNET_CHAIN_ID,
        ticker: LBCh_SYMBOL,
        nickname: LBCh_TESTNET_DISPLAY_NAME,
        rpcPrefs: {
          blockExplorerUrl: 'https://testnet-explorer.lightburden.net/',
        },
      },
      /*
      {
        rpcUrl: LBCh_REGTEST_RPC_URL,
        chainId: LBCh_REGTEST_CHAIN_ID,
        ticker: LBCh_SYMBOL,
        nickname: LBCh_REGTEST_DISPLAY_NAME,
        rpcPrefs: {
          blockExplorerUrl: 'http://localhost:8545',
        },
      },
      */
    ],
  },
};

export default initialState;

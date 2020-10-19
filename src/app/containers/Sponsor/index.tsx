import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { translations } from '../../../locales/i18n';
import styled from 'styled-components/macro';
import { media } from '../../../styles/media';
import { Input, Button, Modal } from '@cfxjs/react-ui';
import { cfx, faucet, faucetAddress } from '../../../utils/cfx';
import { util as cfxUtil } from 'js-conflux-sdk/dist/js-conflux-sdk.umd.min.js';
import SkelontonContainer from '../../components/SkeletonContainer';
import { isCfxAddress, getEllipsStr } from '../../../utils';
import { useConfluxPortal } from '@cfxjs/react-hooks';
import { useParams } from 'react-router-dom';
interface RouteParams {
  contractAddress: string;
}
const defaultStr = '--';
export function Sponsor() {
  const { t } = useTranslation();
  const { contractAddress } = useParams<RouteParams>();
  const [storageSponsorAddress, setStorageSponsorAddress] = useState('');
  const [currentStorageFee, setCurrentStorageFee] = useState(defaultStr);
  const [providedStorageFee, setProvidedStorageFee] = useState(defaultStr);
  const [avialStorageFee, setAvialStorageFee] = useState(defaultStr);
  const [gasFeeAddress, setGasFeeAddress] = useState('');
  const [currentGasFee, setCurrentGasFee] = useState(defaultStr);
  const [providedGasFee, setProvidedGasFee] = useState(defaultStr);
  const [avialGasFee, setAvialGasFee] = useState(defaultStr);
  const [upperBound, setUpperBound] = useState(defaultStr);
  const [gasBound, setGasBound] = useState(defaultStr);
  const [storageBound, setStorageBound] = useState(defaultStr);
  const [loading, setLoading] = useState(false);
  const [canApply, setCanApply] = useState(false);
  const [applyText, setApplyText] = useState('');
  const [inputAddressVal, setInputAddressVal] = useState('');
  const [shownDialog, setShownDialog] = useState(false);
  const [errorMsgForApply, setErrorMsgForApply] = useState('');
  const [txHash, setTxHash] = useState('');
  const { portalInstalled, address, login, confluxJS } = useConfluxPortal();
  const getSponsorInfo = async address => {
    setLoading(true);
    const sponsorInfo = await cfx.provider.call('cfx_getSponsorInfo', address);
    console.log('sponsorInfo', sponsorInfo);
    await fetchIsAppliable(address);
    const faucetParams = await faucet.getFaucetParams();
    console.log('faucetParams', faucetParams);
    const amountAccumulated = await faucet.getAmountAccumulated(address);
    setLoading(false);
    if (sponsorInfo && faucetParams && amountAccumulated) {
      setStorageSponsorAddress(
        getEllipsStr(sponsorInfo.sponsorForCollateral, 12, 4),
      );
      setGasFeeAddress(getEllipsStr(sponsorInfo.sponsorForGas, 12, 4));
      setCurrentStorageFee(
        getDecimalFromDrip(sponsorInfo.sponsorBalanceForCollateral),
      );
      setCurrentGasFee(getDecimalFromDrip(sponsorInfo.sponsorBalanceForGas));
      setProvidedStorageFee(
        getDecimalFromDrip(amountAccumulated.collateral_amount_accumulated),
      );
      setUpperBound(
        cfxUtil.unit.fromDripToGDrip(parseInt(faucetParams.upper_bound, 16)),
      );
      setGasBound(getDecimalFromDrip(faucetParams.gas_bound));
      setStorageBound(getDecimalFromDrip(faucetParams.collateral_bound));
      setAvialStorageFee(
        getDecimalFromDrip(
          (
            Number(faucetParams.collateral_total_limit) -
            Number(amountAccumulated.collateral_amount_accumulated)
          ).toString(),
        ),
      );
      setProvidedGasFee(
        getDecimalFromDrip(amountAccumulated.gas_amount_accumulated),
      );
      setAvialGasFee(
        getDecimalFromDrip(
          (
            Number(faucetParams.gas_total_limit) -
            Number(amountAccumulated.gas_amount_accumulated)
          ).toString(),
        ),
      );
    }
  };
  const resetParams = () => {
    setStorageSponsorAddress('');
    setCurrentStorageFee(defaultStr);
    setProvidedStorageFee(defaultStr);
    setAvialStorageFee(defaultStr);
    setGasFeeAddress('');
    setCurrentGasFee(defaultStr);
    setProvidedGasFee(defaultStr);
    setAvialGasFee(defaultStr);
    setUpperBound(defaultStr);
    setGasBound(defaultStr);
    setStorageBound(defaultStr);
    setCanApply(false);
  };
  const addressInputChanger = e => {
    setInputAddressVal(e.target.value);
  };

  const searchClick = async () => {
    if (isCfxAddress(inputAddressVal)) {
      getSponsorInfo(inputAddressVal);
    } else {
      resetParams();
    }
  };
  const fetchIsAppliable = async (address: string) => {
    const { flag, message } = await faucet.isAppliable(address);
    if (!flag) {
      //can not apply sponsor this contract
      switch (message) {
        case 'ERROR_GAS_SPONSORED_FUND_UNUSED':
        case 'ERROR_GAS_OVER_GAS_TOTAL_LIMIT':
        case 'ERROR_COLLATERAL_SPONSORED_FUND_UNUSED':
        case 'ERROR_COLLATERAL_OVER_COLLATERAL_TOTAL_LIMIT':
          setErrorMsgForApply(t(translations.sponsor.errReachToMax));
          break;
        case 'ERROR_GAS_FAUCET_OUT_OF_MONEY':
        case 'ERROR_COLLATERAL_FAUCET_OUT_OF_MONEY':
          setErrorMsgForApply(t(translations.sponsor.errInsufficientFee));
          break;
        case 'ERROR_GAS_CANNOT_REPLACE_THIRD_PARTY_SPONSOR':
          setErrorMsgForApply(t(translations.sponsor.errReplaceThird));
          break;
        default:
          setErrorMsgForApply('');
          break;
      }
      if (!portalInstalled) {
        setCanApply(true);
      } else {
        setCanApply(false);
      }
    } else {
      setCanApply(true);
      setErrorMsgForApply('');
    }
    return { flag, message };
  };

  const applyToTx = async (addressStr: string) => {
    const { flag } = await fetchIsAppliable(addressStr);
    if (flag) {
      const { data } = await faucet.apply(addressStr);
      const txParams = {
        from: address,
        to: faucetAddress,
        data,
      };
      const txHash = await confluxJS.sendTransaction(txParams);
      return txHash;
    }
  };
  const applyClick = async () => {
    if (!portalInstalled) {
      useConfluxPortal.openHomePage();
    } else {
      if (address) {
        //Portal has already installed and the portal has already got the account
        if (isCfxAddress(inputAddressVal)) {
          const txHash = await applyToTx(inputAddressVal);
          setTxHash(txHash);
          setShownDialog(true);
          setCanApply(false);
          setErrorMsgForApply('');
        }
      } else {
        login();
      }
    }
  };
  const closeDialog = () => {
    setShownDialog(false);
  };

  const getDecimalFromDrip = (dripStr: string) => {
    if (dripStr) {
      return cfxUtil.unit.fromDripToCFX(parseInt(dripStr, 16));
    }
    return '';
  };

  useEffect(() => {
    if (portalInstalled) {
      setApplyText(t(translations.general.apply));
    } else {
      setCanApply(true);
      setApplyText(t(translations.sponsor.connectToApply));
    }
    // eslint-disable-next-line
  }, [portalInstalled]);

  useEffect(() => {
    setInputAddressVal(contractAddress);
    if (isCfxAddress(contractAddress)) {
      getSponsorInfo(contractAddress);
    }
    // eslint-disable-next-line
  }, [contractAddress]);

  return (
    <>
      <Helmet>
        <title>{t(translations.metadata.title)}</title>
        <meta
          name="description"
          content={t(translations.metadata.description)}
        />
      </Helmet>
      <Wrapper>
        <Header>{t(translations.sponsor.title)}</Header>
        <SearchContainer>
          <Input
            className="inputComp"
            onChange={addressInputChanger}
            value={inputAddressVal}
            placeholder={t(translations.sponsor.searchAddress)}
          ></Input>
          <Button
            variant="solid"
            color="primary"
            className="searchBtn"
            onClick={searchClick}
          >
            {t(translations.general.search)}
          </Button>
        </SearchContainer>
        <BlockContainer>
          <div className="innerContainer">
            <div className="sponsorAddress">
              <span className="label">
                {t(translations.sponsor.storageSponsor)}
              </span>
              <SkelontonContainer shown={loading}>
                <span className="address">{storageSponsorAddress}</span>
              </SkelontonContainer>
            </div>
            <div className="currentLabel">
              {t(translations.sponsor.currentAvialStorageFee)}
            </div>
            <div className="currentFeeContainer">
              <SkelontonContainer shown={loading}>
                <span className="fee">{currentStorageFee}</span>
                <span className="unit">CFX</span>
              </SkelontonContainer>
            </div>
            <div className="feeContainer storage">
              <div className="line"></div>
              <div className="item">
                <div className="label">
                  {t(translations.sponsor.providedStorage)}
                </div>
                <div className="innterItem">
                  <SkelontonContainer shown={loading}>
                    <span>{providedStorageFee}</span>
                    <span className="unit">CFX</span>
                  </SkelontonContainer>
                </div>
              </div>
              <div className="item">
                <div className="label">
                  {t(translations.sponsor.availStorage)}
                </div>
                <div className="innterItem">
                  <SkelontonContainer shown={loading}>
                    <span className="fee">{avialStorageFee}</span>
                    <span className="unit">CFX</span>
                    <span className="secondFee">{storageBound}</span>
                    <span className="secondUnit">
                      CFX/{t(translations.sponsor.applicationUnit)}
                    </span>
                  </SkelontonContainer>
                </div>
              </div>
            </div>
          </div>
          <div className="innerContainer">
            <div className="sponsorAddress">
              <span className="label">
                {t(translations.sponsor.gasFeeSponsor)}
              </span>
              <SkelontonContainer shown={loading}>
                <span className="address">{gasFeeAddress}</span>
              </SkelontonContainer>
            </div>
            <div className="currentLabel">
              {t(translations.sponsor.currentAvialGasFee)}
            </div>
            <div className="currentFeeContainer">
              <SkelontonContainer shown={loading}>
                <span className="fee">{currentGasFee}</span>
                <span className="unit">CFX</span>
              </SkelontonContainer>
            </div>
            <div className="upperBoundContainer">
              <SkelontonContainer shown={loading}>
                <span className="label">
                  {t(translations.sponsor.upperBound)}:&nbsp;
                </span>
                <span className="fee">{upperBound}</span>&nbsp;
                <span className="unit">Gdrip/{t(translations.sponsor.tx)}</span>
              </SkelontonContainer>
            </div>
            <div className="feeContainer gas">
              <div className="line"></div>
              <div className="item">
                <div className="label">
                  {t(translations.sponsor.providedGas)}
                </div>
                <div className="innterItem">
                  <SkelontonContainer shown={loading}>
                    <span>{providedGasFee}</span>
                    <span className="unit">CFX</span>
                  </SkelontonContainer>
                </div>
              </div>
              <div className="item">
                <div className="label">{t(translations.sponsor.availGas)}</div>
                <div className="innterItem">
                  <SkelontonContainer shown={loading}>
                    <span className="fee">{avialGasFee}</span>
                    <span className="unit">CFX</span>
                    <span className="secondFee">{gasBound}</span>
                    <span className="secondUnit">CFX/application</span>
                  </SkelontonContainer>
                </div>
              </div>
            </div>
          </div>
        </BlockContainer>
        <ApplyContainer>
          <Button
            variant="solid"
            color="primary"
            className="applyBtn"
            disabled={!canApply}
            onClick={applyClick}
          >
            {applyText}
          </Button>
          <img
            src="/success.png"
            alt="success"
            className={`successImg ${address ? 'shown' : 'hidden'}`}
          />
          <span className={`accountAddress ${address ? 'shown' : 'hidden'}`}>
            {getEllipsStr(address, 6, 4)}
          </span>
        </ApplyContainer>
        <ErrorMsgContainer className={`${errorMsgForApply ? '' : 'hidden'}`}>
          <img src="/warning.png" alt="warning" className="icon" />
          <span className="text">{errorMsgForApply}</span>
        </ErrorMsgContainer>
        <NoticeContainer>
          <div className="title">{t(translations.sponsor.notice)}:</div>
          <div className="content">
            <div>1. {t(translations.sponsor.noticeFirst)}</div>
            <div>2. {t(translations.sponsor.noticeSecond)}</div>
            <div>3. {t(translations.sponsor.noticeThird)}</div>
            <div>
              4. {t(translations.sponsor.noticeFourthOne)} &nbsp;
              <a
                href="https://portal.conflux-chain.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://portal.conflux-chain.org/
              </a>
              &nbsp; {t(translations.sponsor.noticeFourthTwo)}
            </div>
          </div>
        </NoticeContainer>
        <Modal
          closable
          open={shownDialog}
          onClose={closeDialog}
          wrapClassName="transactionModalContainer"
        >
          <Modal.Content>
            <div className="contentContainer">
              <img
                src="/success_big.png"
                alt="success"
                className="successImg"
              />
              <div className="submitted">
                {t(translations.sponsor.submitted)}.
              </div>
              <div className="txContainer">
                <span className="label">{t(translations.sponsor.txHash)}:</span>
                <a
                  href={`https://testnet.confluxscan.io/transactionsdetail/${txHash}`}
                  target="_blank"
                  className="content"
                  rel="noopener noreferrer"
                >
                  {getEllipsStr(txHash, 12, 0)}
                </a>
              </div>
            </div>
          </Modal.Content>
        </Modal>
      </Wrapper>
    </>
  );
}
const Wrapper = styled.div`
  padding-bottom: 3.5714rem;
  .modalContainer {
    display: flex;
    justify-content: center;
  }
  .btn.searchBtn {
    height: 2.1429rem;
    line-height: 2.1429rem;
    width: 6rem;
    min-width: initial;
  }
  .btn.applyBtn {
    height: 2.1429rem;
    line-height: 2.1429rem;
  }
  .shown {
    display: initial;
  }
  .hidden {
    display: none;
  }
`;
const Header = styled.div`
  color: #0f1327;
  font-weight: bold;
  padding-top: 2.2857rem;
  margin-bottom: 1.7143rem;
  font-size: 1.7143rem;
  ${media.s} {
    padding-top: 1rem;
    margin-bottom: 1.6667rem;
    font-size: 1.5rem;
  }
`;
const SearchContainer = styled.div`
  background: #ffffff;
  box-shadow: 12px 8px 24px -12px rgba(20, 27, 50, 0.12);
  border-radius: 5px;
  padding: 0.5714rem 1.1429rem;
  display: inline-block;
  ${media.s} {
    width: 100%;
    box-sizing: border-box;
  }
  .input-container.inputComp {
    width: 34.8571rem;
    height: 1.5714rem;
    ${media.s} {
      width: 100%;
    }
  }
  .inputComp {
    .input-wrapper {
      margin: 0;
      height: 1.5714rem;
      line-height: initial;
      border: none;
      color: #97a3b4;
      ${media.s} {
        width: 18.3333rem;
      }
    }
  }
`;
const BlockContainer = styled.div`
  display: flex;
  background: #f5f6fa;
  margin-top: 1.7143rem;
  ${media.s} {
    flex-direction: column;
  }
  .innerContainer {
    flex: 1;
    box-sizing: border-box;
    flex-basis: 26.2857rem;
    flex-grow: 0;
    flex-shrink: 0;
    box-sizing: content-box;
    background: #ffffff;
    box-shadow: 12px 8px 24px -12px rgba(20, 27, 50, 0.12);
    border-radius: 5px;
    padding: 1.7143rem 1.1429rem 1.1429rem 1.1429rem;
    ${media.s} {
      flex-basis: initial;
    }
    .sponsorAddress {
      display: flex;
      align-items: center;
      .label {
        font-size: 0.8571rem;
        font-weight: 500;
        color: #97a3b4;
      }
      .address {
        font-size: 0.7143rem;
        font-weight: normal;
        color: #0054fe;
        margin-left: 0.5714rem;
      }
    }
    .currentLabel {
      margin-top: 0.7143rem;
      font-size: 20px;
      font-weight: 500;
      color: #0f1327;
    }
    .currentFeeContainer {
      margin-top: 0.5714rem;
      .fee {
        font-weight: bold;
        color: #0054fe;
        font-size: 1.7143rem;
        line-height: 1.7143rem;
      }
      .unit {
        margin-left: 0.2857rem;
        font-weight: 500;
        color: #74798c;
        font-size: 0.8571rem;
      }
    }
    .upperBoundContainer {
      margin-top: 0.8571rem;
      color: #97a3b4;
      font-size: 0.7143rem;
    }
    .feeContainer {
      margin-top: 1.9286rem;
      .line {
        height: 1px;
        background-color: #f1f1f1;
      }
      .item {
        margin-top: 1.0714rem;
        .label {
          font-size: 0.7143rem;
          font-weight: 500;
          color: #97a3b4;
        }
        .innterItem {
          font-size: 0.8571rem;
          color: #002e74;
          margin-top: 0.3571rem;
          .fee {
            color: #0054fe;
          }
          .unit {
            margin-left: 0.1429rem;
          }
          .secondFee {
            margin-left: 1.4286rem;
            font-size: 0.7143rem;
            color: #97a3b4;
          }
          .secondUnit {
            margin-left: 0.1429rem;
            font-size: 0.7143rem;
            color: #97a3b4;
          }
        }
        &:last-child {
          margin-top: 0.8571rem;
        }
      }
      &.storage {
        margin-top: 4.1429rem;
      }
      &.gas {
        margin-top: 2.2857rem;
      }
    }
    &:last-child {
      margin-left: 1.1429rem;
      ${media.s} {
        margin-left: 0px;
        margin-top: 1.3333rem;
      }
    }
  }
`;
const ApplyContainer = styled.div`
  margin-top: 1.7143rem;
  display: flex;
  align-items: center;
  .successImg {
    margin-left: 0.5714rem;
    width: 1.1429rem;
  }
  .accountAddress {
    margin-left: 0.3571rem;
    color: #97a3b4;
    font-size: 1.1429rem;
  }
`;
const ErrorMsgContainer = styled.div`
  margin-top: 0.5714rem;
  line-height: 1.5714rem;
  .icon {
    width: 1rem;
  }
  .text {
    margin-left: 0.2857rem;
    font-size: 1rem;
    font-weight: normal;
    color: #fa953c;
  }
`;
const NoticeContainer = styled.div`
  margin-top: 3.2857rem;
  .title {
    font-size: 1.1429rem;
    font-weight: bold;
    color: #0f1327;
  }
  .content {
    margin-top: 0.8571rem;
    font-weight: normal;
    color: #7e8598;
    line-height: 1.5714rem;
    font-size: 1rem;
  }
`;

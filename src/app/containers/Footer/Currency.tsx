import React from 'react';
import { Select } from 'app/components/Select';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';
import styled from 'styled-components/macro';
import { trackEvent } from 'utils/ga';
import { ScanEvent } from 'utils/gaConstants';
import { LOCALSTORAGE_KEYS } from 'utils/constants';
import { useGlobal } from 'utils/hooks/useGlobal';

export function Currency() {
  const { t } = useTranslation();
  const { data, setGlobalData } = useGlobal();

  const handleCurrencyChange = currency => {
    localStorage.setItem(LOCALSTORAGE_KEYS.currency, currency);
    trackEvent({
      category: ScanEvent.preference.category,
      action: ScanEvent.preference.action.changeCurrency,
      label: data.currency,
    });
    setGlobalData({
      ...data,
      currency,
    });
  };
  const options = [
    { value: 'USD', name: t(translations.footer.currency.usd) },
    { value: 'CNY', name: t(translations.footer.currency.cny) },
    { value: 'GBP', name: t(translations.footer.currency.gbp) },
    { value: 'KRW', name: t(translations.footer.currency.krw) },
    { value: 'RUB', name: t(translations.footer.currency.rub) },
    { value: 'EUR', name: t(translations.footer.currency.eur) },
  ];
  return (
    <StyledWrapper>
      <svg
        width="17px"
        height="16px"
        viewBox="0 0 17 16"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        className="currency-svg"
      >
        <g
          id="Home"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g
            id="货币切换"
            transform="translate(-915.000000, -1339.000000)"
            fill="currentColor"
            fillRule="nonzero"
          >
            <g id="编组-2" transform="translate(0.000000, 1254.000000)">
              <g id="Footer" transform="translate(276.000000, 32.000000)">
                <g id="货币单位" transform="translate(639.763329, 53.000000)">
                  <path
                    d="M6.51072565,12.203123 C6.55742476,12.4081265 6.43487897,12.6167741 6.23741149,12.6687341 L5.11544356,12.9562506 L5.23258537,13.0384057 C6.24317507,13.7163057 7.43397632,14.0852122 8.68142221,14.0852122 C9.98479946,14.0852122 11.2266533,13.6825835 12.2665238,12.944344 C12.4447574,12.8178099 12.6918205,12.8597207 12.8183546,13.0379543 C12.9448887,13.2161879 12.902978,13.4632509 12.7247444,13.589785 C11.5520606,14.4223131 10.1503568,14.8767677 8.68142221,14.8767677 C7.23687117,14.8767677 5.85778281,14.4371883 4.69835318,13.6320988 L5.04087159,14.8568825 C5.08750707,15.0622468 4.9650249,15.2705336 4.76755742,15.3224935 C4.56939797,15.3743315 4.37092701,15.2498952 4.32388193,15.0448306 L3.7486846,12.9160822 C3.73682332,12.8644629 3.73549243,12.81068 3.74477712,12.7581782 C3.75298026,12.7116559 3.76925891,12.6669582 3.79335356,12.6255563 C3.84475412,12.5383725 3.92696371,12.4754204 4.02199876,12.4504711 L6.06705016,11.9254601 C6.26520961,11.8736222 6.46368057,11.9980585 6.51072565,12.203123 Z M15.026385,4.27642505 C15.1995369,4.40222724 15.2546875,4.62961761 15.1694652,4.81705134 L15.1242818,4.89452109 L13.3943976,7.27550242 C13.3780375,7.29802024 13.3599586,7.31854282 13.3404725,7.33702071 L13.3394152,7.66877905 L15.0941631,7.66961518 C15.3387334,7.66961518 15.536671,7.86752024 15.536671,8.11212309 C15.536671,8.35669345 15.3387334,8.55463098 15.0941631,8.55463098 L13.3394152,8.55377905 L13.3394152,9.20777905 L15.0941631,9.20868367 C15.3387334,9.20868367 15.536671,9.40658873 15.536671,9.65119159 C15.536671,9.89576194 15.3387334,10.0936995 15.0941631,10.0936995 L13.3394152,10.092779 L13.339551,11.7939316 C13.339551,12.038502 13.1416459,12.2364395 12.8970431,12.2364395 C12.6524402,12.2364395 12.4545352,12.038502 12.4545352,11.7939316 L12.4544152,10.092779 L10.6999232,10.0936995 C10.4553528,10.0936995 10.2574152,9.89579441 10.2574152,9.65119159 C10.2574152,9.40662123 10.4553203,9.20868367 10.6999232,9.20868367 L12.4544152,9.20777905 L12.4544152,8.55377905 L10.6999232,8.55463098 C10.4553528,8.55463098 10.2574152,8.35672591 10.2574152,8.11212309 C10.2574152,7.86755274 10.4553203,7.66961518 10.6999232,7.66961518 L12.4544152,7.66877905 L12.4538654,7.30625983 C12.4453442,7.29646185 12.437178,7.28620761 12.4294002,7.27550242 L10.699516,4.89452109 C10.5557612,4.69665952 10.599525,4.42019899 10.7974128,4.27642505 C10.9953006,4.13265113 11.2717349,4.17643401 11.4155089,4.37432185 L12.9104152,6.43377905 L14.408289,4.37432185 C14.552063,4.17643401 14.8284972,4.13265113 15.026385,4.27642505 Z M2.86942478,3.89971919 C3.11399514,3.89971919 3.31193267,4.09762425 3.31193267,4.34222707 L3.31243438,4.73932277 C3.88206198,4.85028704 4.38650502,5.17140036 4.6878765,5.63172962 C4.82182799,5.83613403 4.76437379,6.11053635 4.55996938,6.24448784 C4.35556498,6.37843933 4.08116265,6.32053018 3.94721113,6.11658075 C3.7311404,5.78644652 3.31846451,5.58158717 2.86948975,5.58158717 C2.19407781,5.58158717 1.64439573,6.03706128 1.64439576,6.59665487 C1.64439576,7.03614057 2.0250949,7.32653129 3.00171895,7.63248794 C3.48484775,7.77378369 4.97914464,8.21066968 4.97914464,9.51268343 C4.97914464,10.4237404 4.26381057,11.1868327 3.31250823,11.3706209 L3.31193267,11.7671112 C3.31193267,12.0117141 3.1140276,12.2096191 2.86942478,12.2096191 C2.62482193,12.2096191 2.42691687,12.011714 2.42691687,11.7671112 L2.42771034,11.3677226 C1.83533904,11.2542463 1.17069674,10.9355296 0.688894536,10.5165398 C0.504378129,10.3562334 0.484912601,10.0766316 0.645251434,9.89211519 C0.805590268,9.70759878 1.08558205,9.68901067 1.26967601,9.84847209 C1.70743939,10.2296262 2.41008358,10.5277836 2.86942478,10.5277836 C3.54483672,10.5277836 4.09409634,10.0723095 4.09409634,9.51271594 C4.09409634,9.23831358 3.95410045,8.83298196 2.74541726,8.47948257 C2.09506031,8.27595558 0.759347423,7.85765773 0.759347454,6.59668733 C0.759347454,5.68535491 1.47540915,4.92207659 2.42721874,4.7385833 L2.42691687,4.34222707 C2.42691687,4.09762422 2.62482193,3.89971919 2.86942478,3.89971919 Z M12.3062519,0.989419947 L12.8814493,3.11816842 C12.8933105,3.16978768 12.8946414,3.22357055 12.8853568,3.27607242 C12.8771536,3.32259474 12.860875,3.36729242 12.8367803,3.40869433 C12.7853798,3.49587813 12.7031702,3.55883015 12.6081351,3.58377946 L10.5630837,4.10879048 C10.3649243,4.1606284 10.1664533,4.03619209 10.1194082,3.83112758 C10.0727091,3.62612406 10.1952549,3.41747648 10.3927224,3.36551654 L11.5146903,3.078 L11.3975485,2.9958449 C10.3869588,2.31794487 9.19615755,1.94903843 7.94871166,1.94903843 C6.64533441,1.94903843 5.40348061,2.35166708 4.36361004,3.08990656 C4.18537642,3.21644066 3.93831338,3.17452992 3.81177928,2.99629631 C3.68524518,2.8180627 3.72715591,2.57099965 3.90538952,2.44446555 C5.07807331,1.61193746 6.4797771,1.15748292 7.94871166,1.15748292 C9.3932627,1.15748292 10.7723511,1.59706232 11.9317807,2.40215184 L11.5892623,1.17736811 C11.5426268,0.972003755 11.665109,0.763717011 11.8625765,0.711757047 C12.0607359,0.659919124 12.2592069,0.784355431 12.3062519,0.989419947 Z"
                    id="形状结合"
                  ></path>
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
      <Select
        value={data.currency}
        onChange={handleCurrencyChange}
        disableMatchWidth
        size="small"
        className="btnSelectContainer"
        dropdownClassName="currency-select"
        variant="text"
      >
        {options.map(o => {
          return (
            <Select.Option key={o.value} value={o.value}>
              {o.name}
            </Select.Option>
          );
        })}
      </Select>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.span`
  position: relative;
  display: inline-flex;
  color: #000000;

  &:hover {
    color: #0f23bd;

    .select.sirius-select.btnSelectContainer .value .option {
      color: #0f23bd !important;
    }
  }

  .currency-svg {
    margin-left: -1px;
    margin-top: -1px;
  }

  .select.sirius-select.btnSelectContainer {
    background: transparent;
    position: absolute;
    top: -0.6071rem;
    left: 0.2143rem;

    .value .option {
      font-weight: normal;
      &:not(:hover) {
        color: #000000;
      }
    }
  }
`;

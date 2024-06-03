/**
 *
 * TextLogo
 *
 */
import React from 'react';
import { translations } from 'locales/i18n';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import iconWarning from 'images/warning.png';
import { Image } from '@cfxjs/antd';
import { Tooltip } from '@cfxjs/sirius-next-common/dist/components/Tooltip';

interface IconProp {
  isActive?: boolean;
  hoverable?: boolean;
  onClick?: () => void;
}

export const DexIcon = function ({
  isActive = false,
  onClick,
  hoverable = false,
}: IconProp) {
  const { t } = useTranslation();
  const icon = (
    <StyledIconWrapper onClick={onClick} hoverable={hoverable}>
      <svg width="20px" height="20px" viewBox="0 0 20 20">
        <g id="Token-List/Project-Info" stroke="none" fill="none">
          <g
            id="Token-Detail/-Project-Info"
            transform="translate(-1193.000000, -257.000000)"
            fill={isActive ? '#7789D3' : '#DBDDE4'}
          >
            <g id="iconsx备份-6" transform="translate(1105.000000, 255.000000)">
              <g id="DEX" transform="translate(88.000000, 2.000000)">
                <path
                  d="M10,0 C15.5228475,0 20,4.4771525 20,10 C20,15.5228475 15.5228475,20 10,20 C4.4771525,20 0,15.5228475 0,10 C0,4.4771525 4.4771525,0 10,0 Z M13.0950888,7.00096272 C12.994315,6.99261914 12.873114,7.03850885 12.7314859,7.13863187 C12.6334356,7.21094293 12.5680688,7.30967535 12.5353854,7.43482912 C12.5108729,7.52869444 12.5124049,7.61395545 12.5399815,7.69061213 L12.5762397,7.76440071 L14.0224807,9.82526609 L12.3637975,12.2115313 C12.2711945,12.3450286 12.2398729,12.471573 12.2698327,12.5911644 C12.2997925,12.7107557 12.3692447,12.806707 12.4781894,12.879018 C12.7154468,13.0372371 12.9139683,13.0262497 13.0737538,12.8460557 L13.1318577,12.7705514 L14.6107821,10.6596245 L16.0978773,12.7622078 C16.1795858,12.879018 16.270827,12.9541103 16.3716009,12.9874846 C16.4723747,13.020859 16.599023,12.9874846 16.7515455,12.8873616 C16.8931737,12.792801 16.9735204,12.6940686 16.9925857,12.5911644 C17.0068847,12.5139862 17.0005012,12.4438479 16.9734353,12.3807496 L16.9394752,12.3199979 L15.1990835,9.8169225 L16.6534953,7.73936995 C16.7297566,7.62812216 16.7597164,7.51548377 16.7433747,7.40145478 C16.727033,7.28742579 16.6480481,7.18591218 16.50642,7.09691394 C16.3647918,7.00791571 16.2340582,6.98427555 16.114219,7.02599347 C16.0183477,7.05936781 15.9277057,7.12745146 15.842293,7.23024442 L15.779214,7.31384714 L14.6189529,8.98256405 L13.3851541,7.20538054 C13.2925511,7.07744558 13.1958627,7.00930631 13.0950888,7.00096272 Z M4.95283386,7.09691394 L3.44122606,7.09691394 C3.24512559,7.09691394 3.12256279,7.12889768 3.07353768,7.19286517 C3.03676884,7.24084078 3.01378831,7.30524282 3.0045961,7.38607129 L3,7.47237525 L3,12.5369311 C3,12.6593036 3.02587437,12.7524737 3.0776231,12.8164411 C3.11902209,12.8676151 3.20487052,12.8983195 3.33516839,12.9085543 L3.44122606,12.9123924 L4.99368812,12.9123924 C5.39678354,12.9123924 5.74813021,12.8428625 6.04772816,12.7038027 C6.3473261,12.564743 6.59789892,12.3672782 6.79944663,12.1114082 C7.00099434,11.8555383 7.15079331,11.5482163 7.24884354,11.1894422 C7.34689378,10.830668 7.3959189,10.4315666 7.3959189,9.99213778 C7.3959189,9.58052094 7.34825559,9.19810665 7.25292897,8.8448949 C7.15760235,8.49168316 7.010527,8.18575172 6.81170291,7.9271006 C6.61287882,7.66844948 6.35958238,7.46542226 6.05181358,7.31801893 C5.79533959,7.19518283 5.49820047,7.12352843 5.16039622,7.10305575 L4.95283386,7.09691394 Z M11.1545113,7.09691394 L8.62971769,7.09691394 C8.45540616,7.09691394 8.32467252,7.13028828 8.23751675,7.19703696 C8.16779214,7.2504359 8.12595737,7.33765417 8.11201245,7.45869177 L8.1067831,7.55581109 L8.1067831,12.4534952 C8.1067831,12.6314917 8.15308461,12.7524737 8.24568761,12.8164411 C8.31513986,12.8644168 8.40450856,12.8944015 8.51379372,12.9063954 L8.62971769,12.9123924 L11.1463404,12.9123924 C11.3533354,12.9123924 11.5004107,12.879018 11.5875665,12.8122693 C11.6747222,12.7455207 11.7183001,12.6231481 11.7183001,12.4451516 C11.7183001,12.2671552 11.6747222,12.1447826 11.5875665,12.0780339 C11.5178419,12.024635 11.4097687,11.9925956 11.263347,11.9819158 L11.1463404,11.9779109 L9.16899399,11.9779109 L9.16899399,10.3759427 L11.0646319,10.3759427 C11.2389434,10.3759427 11.3642298,10.3411777 11.4404911,10.2716479 C11.5167524,10.202118 11.5548831,10.0839172 11.5548831,9.91704552 C11.5548831,9.75017382 11.5167524,9.62919185 11.4404911,9.55409959 C11.3794821,9.49402578 11.287097,9.45798149 11.1633358,9.44596673 L11.0646319,9.4414612 L9.16899399,9.4414612 L9.16899399,8.03139541 L11.1463404,8.03139541 C11.3043102,8.03139541 11.426873,7.99663048 11.5140288,7.9271006 C11.6011846,7.85757073 11.6420388,7.73658876 11.6365916,7.56415468 C11.6311444,7.3917206 11.5889283,7.27073862 11.5099434,7.20120875 C11.4507047,7.14906135 11.3692515,7.11646922 11.2655838,7.10343237 L11.1545113,7.09691394 Z M4.7894168,7.96464673 C5.08901474,7.96464673 5.33686395,8.00914585 5.53296442,8.09814409 C5.72906489,8.18714232 5.88703472,8.31646788 6.00687389,8.48612077 C6.12671307,8.65577365 6.21114522,8.86575386 6.26017033,9.1160614 C6.30919545,9.36636894 6.33370801,9.65005081 6.33370801,9.96710702 C6.33370801,11.3521421 5.88703472,12.0446596 4.99368812,12.0446596 L4.06221089,12.0446596 L4.06221089,7.96464673 L4.7894168,7.96464673 Z"
                  id="形状结合"
                />
              </g>
            </g>
          </g>
        </g>
      </svg>
    </StyledIconWrapper>
  );
  return hoverable ? (
    <Tooltip
      title={t(
        translations.general.table.token.projectInfo.listedByDecentralized,
      )}
    >
      {icon}
    </Tooltip>
  ) : (
    icon
  );
};
export const CexIcon = function ({
  isActive = false,
  onClick,
  hoverable = false,
}: IconProp) {
  const { t } = useTranslation();

  const icon = (
    <StyledIconWrapper onClick={onClick} hoverable={hoverable}>
      <svg width="20px" height="20px" viewBox="0 0 20 20">
        <g id="Token-List/Project-Info" stroke="none" fill="none">
          <g
            id="Token-Detail/-Project-Info"
            transform="translate(-1210.000000, -257.000000)"
            fill={isActive ? '#7789D3' : '#DBDDE4'}
          >
            <g id="iconsx备份-6" transform="translate(1105.000000, 255.000000)">
              <g id="CEX" transform="translate(105.000000, 2.000000)">
                <path
                  d="M10,0 C15.5228475,0 20,4.4771525 20,10 C20,15.5228475 15.5228475,20 10,20 C4.4771525,20 0,15.5228475 0,10 C0,4.4771525 4.4771525,0 10,0 Z M5.62312475,7 C5.25416428,7 4.91060326,7.06784261 4.5924417,7.20352782 C4.27428014,7.33921303 3.9988966,7.53459973 3.76629109,7.78968792 C3.53368557,8.04477612 3.34920534,8.3568521 3.21285038,8.72591588 C3.07649543,9.09497965 3.00564432,9.5156038 3.00029707,9.98778833 C2.99494982,10.4599729 3.06179048,10.8819539 3.20081906,11.2537313 C3.33984765,11.6255088 3.53502239,11.9416554 3.78634329,12.202171 C4.03766418,12.4626866 4.33577355,12.660787 4.68067138,12.7964722 C5.02556921,12.9321574 5.39854012,13 5.7995841,13 C6.07764127,13 6.32762535,12.9620081 6.54953636,12.8860244 C6.77144737,12.8100407 6.95993804,12.7191316 7.11500838,12.6132972 C7.27007872,12.5074627 7.39039192,12.3989145 7.47594797,12.2876526 C7.56150402,12.1763908 7.6096293,12.0881954 7.62032381,12.0230665 C7.63101831,11.9308005 7.61497655,11.8412483 7.57219853,11.7544098 C7.5294205,11.6675712 7.44653808,11.5997286 7.32355126,11.550882 C7.19521718,11.4911805 7.06420948,11.5101764 6.93052815,11.6078697 C6.86101386,11.6621438 6.79149957,11.7150611 6.72198527,11.7666214 C6.65247098,11.8181818 6.57493581,11.8656716 6.48937976,11.9090909 C6.40382371,11.9525102 6.30489953,11.9891452 6.19260721,12.0189959 C6.08031489,12.0488467 5.94930719,12.0664858 5.7995841,12.0719132 C5.51083243,12.0773406 5.25683791,12.0217096 5.03760053,11.9050204 C4.81836315,11.7883311 4.63521973,11.6322931 4.48817026,11.4369064 C4.3411208,11.2415197 4.2301653,11.0176391 4.15530375,10.7652646 C4.08044221,10.5128901 4.04301144,10.2537313 4.04301144,9.98778833 C4.04301144,9.72184532 4.07643177,9.46540027 4.14327243,9.21845319 C4.2101131,8.97150611 4.30903728,8.75305292 4.44004498,8.56309362 C4.57105269,8.37313433 4.73414391,8.21981004 4.92931865,8.10312076 C5.12449339,7.98643148 5.34774121,7.92808684 5.59906211,7.92808684 C5.82364674,7.92808684 6.01213742,7.96200814 6.16453413,8.02985075 C6.31693085,8.09769335 6.44927536,8.16824966 6.56156768,8.24151967 C6.67386,8.31478969 6.77545781,8.37584803 6.86636111,8.42469471 C6.95726441,8.47354138 7.05084134,8.47625509 7.1470919,8.43283582 C7.20591169,8.41112619 7.25671059,8.38127544 7.29948862,8.34328358 C7.34226664,8.30529172 7.37167653,8.27272727 7.38771829,8.24559023 C7.3984128,8.2238806 7.41311775,8.18860244 7.43183313,8.13975577 C7.45054852,8.09090909 7.45455896,8.0312076 7.44386445,7.96065129 C7.43316995,7.87924016 7.38237104,7.78290366 7.29146774,7.67164179 C7.20056443,7.56037992 7.07490398,7.45454545 6.91448639,7.3541384 C6.75406879,7.25373134 6.56424131,7.16960651 6.34500393,7.10176391 C6.12576655,7.0339213 5.88514015,7 5.62312475,7 Z M13.1667622,7.06919946 C13.067838,7.06105834 12.9488616,7.10583446 12.809833,7.20352782 C12.7135824,7.27408412 12.6494154,7.37042062 12.6173319,7.49253731 C12.5932693,7.58412483 12.5947732,7.66731682 12.6218436,7.7421133 L12.6574363,7.81411126 L14.077132,9.82496608 L12.4488934,12.1533243 C12.3579901,12.2835821 12.3272434,12.4070556 12.3566533,12.5237449 C12.3860632,12.6404342 12.4542407,12.734057 12.5611857,12.8046133 C12.7940883,12.9589929 12.988966,12.9482721 13.1458187,12.7724509 L13.2028561,12.6987788 L14.6546353,10.6390773 L16.1144355,12.6906377 C16.1946443,12.8046133 16.2842107,12.8778833 16.3831349,12.9104478 C16.4820591,12.9430122 16.6063828,12.9104478 16.7561058,12.8127544 C16.8951344,12.7204885 16.9740064,12.624152 16.9927218,12.5237449 C17.0067583,12.4484396 17.000492,12.3800034 16.9739229,12.3184362 L16.9405861,12.2591588 L15.2321387,9.81682497 L16.6598553,7.78968792 C16.7347168,7.68113976 16.7641267,7.57123474 16.748085,7.45997286 C16.7320432,7.34871099 16.654508,7.24966079 16.5154794,7.16282225 C16.3764509,7.07598372 16.2481168,7.05291723 16.1304772,7.0936228 C16.0363656,7.12618725 15.9473873,7.19261872 15.8635423,7.29291723 L15.8016212,7.37449118 L14.6626562,9.0027137 L13.4515034,7.26865672 C13.3606001,7.14382632 13.2656863,7.07734057 13.1667622,7.06919946 Z M11.2618032,7.16282225 L8.78335137,7.16282225 C8.61223927,7.16282225 8.48390519,7.1953867 8.39834914,7.2605156 C8.3299043,7.31261872 8.2888374,7.39772049 8.27514843,7.5158209 L8.27001507,7.61058345 L8.27001507,12.3894166 C8.27001507,12.5630936 8.31546672,12.6811398 8.40637002,12.743555 C8.4745475,12.7903664 8.56227587,12.8196235 8.66955514,12.8313263 L8.78335137,12.8371777 L11.2537823,12.8371777 C11.456978,12.8371777 11.6013538,12.8046133 11.6869098,12.7394844 C11.7724659,12.6743555 11.8152439,12.5549525 11.8152439,12.3812754 C11.8152439,12.2075984 11.7724659,12.0881954 11.6869098,12.0230665 C11.618465,11.9709634 11.5123755,11.9397015 11.3686413,11.9292809 L11.2537823,11.9253731 L9.31272943,11.9253731 L9.31272943,10.3622795 L11.1735735,10.3622795 C11.3446856,10.3622795 11.4676725,10.3283582 11.542534,10.2605156 C11.6173955,10.192673 11.6548263,10.0773406 11.6548263,9.91451832 C11.6548263,9.75169607 11.6173955,9.63364993 11.542534,9.56037992 C11.4826448,9.50176391 11.3919554,9.4665943 11.2704658,9.4548711 L11.1735735,9.4504749 L9.31272943,9.4504749 L9.31272943,8.07462687 L11.2537823,8.07462687 C11.4088527,8.07462687 11.5291659,8.04070556 11.6147219,7.97286296 C11.700278,7.90502035 11.7403824,7.78697422 11.7350351,7.61872456 C11.7296879,7.4504749 11.6882467,7.33242877 11.6107115,7.26458616 C11.5525601,7.21370421 11.472602,7.18190299 11.370837,7.1691825 L11.2618032,7.16282225 Z"
                  id="形状结合"
                />
              </g>
            </g>
          </g>
        </g>
      </svg>
    </StyledIconWrapper>
  );

  return hoverable ? (
    <Tooltip
      title={t(
        translations.general.table.token.projectInfo.listedByCentralized,
      )}
    >
      {icon}
    </Tooltip>
  ) : (
    icon
  );
};
export const AuditIcon = function ({
  isActive = false,
  onClick,
  hoverable = false,
}: IconProp) {
  const { t } = useTranslation();
  const icon = (
    <StyledIconWrapper onClick={onClick} hoverable={hoverable}>
      <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1">
        <g id="Token-List/Project-Info" stroke="none">
          <g
            id="Token-Detail/-Project-Info"
            transform="translate(-1142.000000, -257.000000)"
            fill={isActive ? '#7789D3' : '#DBDDE4'}
          >
            <g id="iconsx备份-6" transform="translate(1105.000000, 255.000000)">
              <g id="审批" transform="translate(37.000000, 2.000000)">
                <path
                  d="M10,0 C15.5228475,0 20,4.4771525 20,10 C20,15.5228475 15.5228475,20 10,20 C4.4771525,20 0,15.5228475 0,10 C0,4.4771525 4.4771525,0 10,0 Z M13.7731456,14.3131003 L6.21724919,14.3131003 C6.02756709,14.3131003 5.87379937,14.4668681 5.87379937,14.6565502 C5.87379937,14.8462323 6.02756709,15 6.21724919,15 L6.21724919,15 L13.7731456,15 C13.9628277,15 14.1165955,14.8462323 14.1165955,14.6565502 C14.1165955,14.4668681 13.9628277,14.3131003 13.7731456,14.3131003 L13.7731456,14.3131003 Z M9.99519742,4 C8.61159729,4 7.44383745,5.02881707 7.2694979,6.40138948 C7.09515834,7.7739619 7.96863268,9.0620497 9.30829774,9.40794973 L9.30829774,9.40794973 L9.30829774,10.8786019 L5.18689968,10.8786019 C4.80753546,10.8786019 4.5,11.1861374 4.5,11.5655016 L4.5,11.5655016 L4.5,12.939301 C4.5,13.3186652 4.80753546,13.6262006 5.18689968,13.6262006 L5.18689968,13.6262006 L14.8034952,13.6262006 C15.1828594,13.6262006 15.4903948,13.3186652 15.4903948,12.939301 L15.4903948,12.939301 L15.4903948,11.5655016 C15.4903948,11.1861374 15.1828594,10.8786019 14.8034952,10.8786019 L14.8034952,10.8786019 L10.6820971,10.8786019 L10.6820971,9.40794973 C12.0217622,9.0620497 12.8952365,7.7739619 12.7208969,6.40138948 C12.5465574,5.02881707 11.3787975,4 9.99519742,4 Z"
                  id="形状结合"
                />
              </g>
            </g>
          </g>
        </g>
      </svg>
    </StyledIconWrapper>
  );
  return hoverable ? (
    <Tooltip title={t(translations.general.table.token.projectInfo.audit)}>
      {icon}
    </Tooltip>
  ) : (
    icon
  );
};
export const BlackListIcon = function ({
  isActive = false,
  onClick,
  hoverable = false,
}: IconProp) {
  const { t } = useTranslation();
  const icon = (
    <StyledIconWrapper>
      <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1">
        <g id="Token-List/Project-Info" stroke="none" fill="none">
          <g
            id="Token-Detail/-Project-Info"
            transform="translate(-1104.000000, -308.000000)"
            fill={isActive ? '#e74e4e' : '#DBDDE4'}
          >
            <g id="iconsx备份" transform="translate(1100.000000, 306.000000)">
              <g id="黑名单" transform="translate(4.000000, 2.000000)">
                <path
                  d="M10,0 C15.5228475,0 20,4.4771525 20,10 C20,15.5228475 15.5228475,20 10,20 C4.4771525,20 0,15.5228475 0,10 C0,4.4771525 4.4771525,0 10,0 Z M4,4 L4,4.01515152 C4,5.06060607 4.27272727,6.10606061 4.8030303,7.01515152 C4.27272727,7.92424243 4,8.95454545 4,10.0151515 C4,13.3181818 6.68181818,16 10,16 C13.3030303,16 15.9848485,13.3181818 16,10.0151515 C16,8.92424243 15.6969697,7.90909091 15.1969697,7.01515152 C15.7121212,6.10606061 16,5.07575759 16,4.01515152 C15.2424242,4.56060607 14.3787879,4.93939395 13.4545455,5.10606061 C12.469697,4.42424243 11.2878788,4.01515152 10,4.01515152 C8.75757575,4.01515152 7.56060607,4.3939394 6.54545455,5.10606061 C5.62121212,4.93939395 4.75757575,4.56060607 4,4 Z M6.59090909,8.28787879 L9.60606061,9.81818182 C9.18181818,10.6363636 8.16666668,10.969697 7.33333334,10.5454545 C6.5,10.1212121 6.16666668,9.10606061 6.59090909,8.28787879 Z M13.4090909,8.27272727 C13.8333333,9.12121212 13.5,10.1363636 12.6666667,10.5454545 C12.4242424,10.6666667 12.1666667,10.7272727 11.9090909,10.7272727 C11.2727273,10.7272727 10.6818182,10.3636364 10.3939394,9.8030303 L13.4090909,8.27272727 Z"
                  id="形状结合"
                />
              </g>
            </g>
          </g>
        </g>
      </svg>
    </StyledIconWrapper>
  );
  return hoverable ? (
    <Tooltip title={t(translations.general.table.token.projectInfo.blackList)}>
      {icon}
    </Tooltip>
  ) : (
    icon
  );
};
export const CoinMarketIcon = function ({
  isActive = false,
  onClick,
  hoverable = false,
}: IconProp) {
  const { t } = useTranslation();
  const icon = (
    <StyledIconWrapper onClick={onClick} hoverable={hoverable}>
      <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1">
        <g id="Token-List/Project-Info" stroke="none" fill="none">
          <g
            id="Token-Detail/-Project-Info"
            transform="translate(-1176.000000, -257.000000)"
            fill={isActive ? '#7789D3' : '#DBDDE4'}
          >
            <g id="iconsx备份-6" transform="translate(1105.000000, 255.000000)">
              <g id="coinmarket" transform="translate(71.000000, 2.000000)">
                <path
                  d="M10,0 C15.5228475,0 20,4.4771525 20,10 C20,15.5228475 15.5228475,20 10,20 C4.4771525,20 0,15.5228475 0,10 C0,4.4771525 4.4771525,0 10,0 Z M9.90697674,4 C6.65116279,4 4,6.68604651 4,10 C4,13.3023256 6.65116279,16 9.90697674,16 C11.4069767,16 12.8255814,15.4302326 13.9186047,14.3953488 C14.1395349,14.1860465 14.1511628,13.8488372 13.9418605,13.627907 C13.744186,13.4069767 13.4069767,13.3953488 13.1860465,13.5930233 C13.1860465,13.5930233 13.1860465,13.5930233 13.1744186,13.6046512 C12.2906977,14.4418605 11.1046512,14.9186047 9.88372093,14.9186047 C8.45348837,14.9186047 7.1744186,14.2906977 6.29069767,13.2906977 L6.29069767,13.2906977 L8.81395349,9.24418605 L8.81395349,11.1162791 L8.81848407,11.287404 C8.86020672,12.0494574 9.18217054,12.3077519 9.45348837,12.3837209 C9.74418605,12.4651163 10.1860465,12.4069767 10.6627907,11.6511628 L10.6627907,11.6511628 L12.0465116,9.40697674 L12.0900086,9.33807063 C12.1175711,9.29328165 12.1434109,9.25193798 12.1744186,9.22093023 L12.1744186,9.22093023 L12.1744186,10.3604651 L12.1803622,10.5506928 C12.2277418,11.299367 12.5563506,11.8971377 13.0930233,12.1976744 C13.6162791,12.5 14.2790698,12.4651163 14.8255814,12.127907 C15.4518272,11.717608 15.8073683,11.0265781 15.8177249,10.1944666 L15.8177249,10.1944666 L15.8139535,10 L15.8139535,9.97674419 L15.8090945,9.75333983 C15.6815119,6.56534091 13.0774313,4 9.90697674,4 Z M9.90697674,5.09302326 C12.5697674,5.09302326 14.744186,7.29069767 14.744186,10 L14.744186,10 L14.744186,10.0232558 L14.7450793,10.1936549 C14.7292564,10.6369509 14.5684755,10.9883721 14.2790698,11.1744186 C14.0697674,11.3023256 13.8255814,11.3255814 13.6395349,11.2209302 C13.4069767,11.0813953 13.2674419,10.7674419 13.2674419,10.3372093 L13.2674419,10.3372093 L13.2674419,9.02325581 L13.262395,8.870007 C13.2255329,8.32210917 12.9883721,7.93217054 12.6046512,7.8255814 C11.8953488,7.61627907 11.3604651,8.48837209 11.1627907,8.81395349 L11.1627907,8.81395349 L9.90697674,10.8255814 L9.90697674,8.34883721 L9.89826744,8.18488372 C9.85651163,7.71395349 9.6744186,7.43139535 9.36046512,7.3372093 C9.12790698,7.26744186 8.77906977,7.30232558 8.44186047,7.81395349 L8.44186047,7.81395349 L5.63953488,12.3023256 L5.52199573,12.0629725 C5.22595464,11.4171691 5.06976744,10.7131783 5.06976744,10 C5.06976744,7.29069767 7.24418605,5.09302326 9.90697674,5.09302326 Z"
                  id="形状结合"
                />
              </g>
            </g>
          </g>
        </g>
      </svg>
    </StyledIconWrapper>
  );
  return hoverable ? (
    <Tooltip
      title={t(translations.general.table.token.projectInfo.listedByCMC)}
    >
      {icon}
    </Tooltip>
  ) : (
    icon
  );
};
export const OxIcon = function ({
  isActive = false,
  onClick,
  hoverable = false,
}: IconProp) {
  const { t } = useTranslation();
  const icon = (
    <StyledIconWrapper onClick={onClick} hoverable={hoverable}>
      <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1">
        <g id="Token-List/Project-Info" stroke="none" fill="none">
          <g
            id="Token-Detail/-Project-Info"
            transform="translate(-1159.000000, -257.000000)"
            fill={isActive ? '#7789D3' : '#DBDDE4'}
          >
            <g id="iconsx备份-6" transform="translate(1105.000000, 255.000000)">
              <g id="Ox" transform="translate(54.000000, 2.000000)">
                <path
                  d="M10,0 C15.5228475,0 20,4.4771525 20,10 C20,15.5228475 15.5228475,20 10,20 C4.4771525,20 0,15.5228475 0,10 C0,4.4771525 4.4771525,0 10,0 Z M10.8451842,12.3571954 L10.6967207,12.3623964 C9.700407,12.4324466 8.8979225,13.2020526 8.78098898,14.1812572 L8.78098898,14.1812572 L7.664,14.181 L7.66483516,13.4624586 C7.66483516,13.1172249 7.49159664,12.944608 7.14511959,12.944608 L7.14511959,12.944608 L7.03604348,12.9510012 C6.76228383,12.9850984 6.62540401,13.1555842 6.62540401,13.4624586 L6.62540401,13.4624586 L6.625,14.181 L5.539,14.181 L5.53943116,13.4624586 C5.53943116,13.1172249 5.36619263,12.944608 5.01971558,12.944608 L5.01971558,12.944608 L4.91063947,12.9510012 C4.63687982,12.9850984 4.5,13.1555842 4.5,13.4624586 L4.5,13.4624586 L4.5,14.7764078 C4.5,15.1216415 4.67323853,15.2942584 5.01971558,15.2942584 L5.01971558,15.2942584 L5.042,15.293 L5.05850032,15.2942584 L8.81286361,15.2942584 C8.85948936,15.2942584 8.9047808,15.2885651 8.94734235,15.2752569 C9.27221625,15.9971557 9.99976744,16.5 10.8451842,16.5 C11.9933058,16.5 12.9240465,15.5725992 12.9240465,14.4285977 C12.9240465,13.2845962 11.9933058,12.3571954 10.8451842,12.3571954 L10.8451842,12.3571954 Z M10.8451842,13.4701877 C11.3764111,13.4701877 11.8070459,13.8992771 11.8070459,14.4285977 C11.8070459,14.9579183 11.3764111,15.3870077 10.8451842,15.3870077 C10.3139573,15.3870077 9.88332256,14.9579183 9.88332256,14.4285977 C9.88332256,13.8992771 10.3139573,13.4701877 10.8451842,13.4701877 Z M15.0184228,4.5 L5.04926955,4.5 C4.74507304,4.50499301 4.5,4.75223187 4.5,5.05649614 L4.5,5.05649614 L4.5,11.6707729 C4.50501099,11.9738778 4.75314027,12.2180714 5.05850032,12.2180714 L5.05850032,12.2180714 C5.3719276,12.2130784 5.61700065,11.9658395 5.61700065,11.6615753 L5.61700065,11.6615753 L5.61700065,5.61299227 L14.4599224,5.61299227 L14.4599224,14.1812661 L14.1108442,14.1813434 C13.8066632,14.1862591 13.5615902,14.433498 13.5615902,14.7377622 C13.5615902,15.0451027 13.8116432,15.2942584 14.1200905,15.2942584 L14.1200905,15.2942584 L15.0276535,15.2942584 C15.33185,15.2892654 15.5769231,15.0420265 15.5769231,14.7377622 L15.5769231,14.7377622 L15.5769231,5.04729849 C15.5719121,4.7441936 15.3237828,4.5 15.0184228,4.5 L15.0184228,4.5 Z M10.0384615,6.71538462 C9.67632162,6.71538462 9.365717,6.78617956 9.10664767,6.92776945 C8.84757835,7.06935933 8.63725863,7.2601457 8.47568851,7.50012856 C8.31411839,7.74011142 8.1957265,8.01849154 8.12051282,8.33526891 C8.04529915,8.65204628 8.00769231,8.98322263 8.00769231,9.32879794 C8.00769231,9.67437326 8.04808484,10.0019499 8.1288699,10.3115277 C8.20965495,10.6211056 8.33361823,10.8922863 8.50075973,11.1250696 C8.66790123,11.357853 8.87822096,11.5426398 9.1317189,11.67943 C9.38521684,11.8162203 9.6846787,11.8846154 10.0301045,11.8846154 C10.3755302,11.8846154 10.6763849,11.8150204 10.9326686,11.6758303 C11.1889522,11.5366402 11.4006648,11.3494536 11.5678063,11.1142704 C11.7349478,10.8790872 11.8603039,10.6055067 11.9438746,10.293529 C12.0274454,9.98155132 12.0692308,9.6527748 12.0692308,9.30719949 C12.0692308,8.96162417 12.0330168,8.63284765 11.9605888,8.32086994 C11.8881608,8.00889222 11.7711618,7.73411185 11.6095916,7.49652882 C11.4480215,7.25894579 11.2377018,7.06935933 10.9786325,6.92776945 C10.7195632,6.78617956 10.4061728,6.71538462 10.0384615,6.71538462 Z M10.0384615,7.52172702 C10.2167458,7.52172702 10.3671732,7.57572316 10.4897436,7.68371545 C10.612314,7.79170774 10.7125989,7.93209771 10.7905983,8.10488537 C10.8685977,8.27767302 10.9243115,8.47085922 10.9577398,8.68444397 C10.9911681,8.89802871 11.0078822,9.10801371 11.0078822,9.31439897 C11.0078822,9.51598457 10.9911681,9.71517034 10.9577398,9.91195629 C10.9243115,10.1087422 10.8699905,10.2863295 10.7947768,10.4447182 C10.7195632,10.6031069 10.6192783,10.7314978 10.4939221,10.8298907 C10.368566,10.9282837 10.2167458,10.9774802 10.0384615,10.9774802 C9.85460589,10.9774802 9.70139285,10.9294836 9.57882241,10.8334905 C9.45625198,10.7374973 9.35596708,10.6127062 9.27796771,10.4591172 C9.19996834,10.3055282 9.14425451,10.1291408 9.11082621,9.929955 C9.07739791,9.73076923 9.06068376,9.53038354 9.06068376,9.32879794 C9.06068376,9.11281337 9.07879076,8.89802871 9.11500475,8.68444397 C9.15121874,8.47085922 9.20832542,8.27767302 9.28632479,8.10488537 C9.36432415,7.93209771 9.46460905,7.79170774 9.58717949,7.68371545 C9.70974992,7.57572316 9.86017727,7.52172702 10.0384615,7.52172702 Z"
                  id="形状结合"
                />
              </g>
            </g>
          </g>
        </g>
      </svg>
    </StyledIconWrapper>
  );
  const tip = !isActive
    ? t(translations.general.table.token.projectInfo.notZeroAddress)
    : t(translations.general.table.token.projectInfo.zeroAddress);
  return hoverable ? <Tooltip title={tip}>{icon}</Tooltip> : icon;
};
export const SponsorIcon = function ({
  isActive = false,
  onClick,
  hoverable = false,
}: IconProp) {
  const { t } = useTranslation();
  const icon = (
    <StyledIconWrapper onClick={onClick} hoverable={hoverable}>
      <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1">
        <g id="Token-List/Project-Info" stroke="none" fill="none">
          <g
            id="Token-Detail/-Project-Info"
            transform="translate(-1108.000000, -257.000000)"
            fill={isActive ? '#7789D3' : '#DBDDE4'}
          >
            <g id="iconsx备份-6" transform="translate(1105.000000, 255.000000)">
              <g id="赞助" transform="translate(3.000000, 2.000000)">
                <path
                  d="M10,0 L10.2799048,0.00384179753 C15.6733292,0.152068282 20,4.57076009 20,10 C20,15.5228475 15.5228475,20 10,20 C4.4771525,20 0,15.5228475 0,10 C0,4.4771525 4.4771525,0 10,0 L10,0 Z M16.4380526,11.5487525 C16.1710898,11.3549343 15.9167164,11.320228 15.6749323,11.4446337 C14.5746972,12.2741416 13.906503,12.7899364 13.6703496,12.9920182 C13.3161195,13.2951407 13.1341624,13.4857438 12.8577324,13.4857438 L12.8577324,13.4857438 L9.91328676,13.4857438 C9.77855577,13.4261982 9.70330802,13.3180601 9.68754351,13.1613294 C9.67177899,13.0045988 9.74702675,12.8912128 9.91328676,12.8211713 C10.4041587,12.8250306 10.8093105,12.8273461 11.1287421,12.828118 L11.5435994,12.828118 C11.7773109,12.8273461 11.9253021,12.8250306 11.9875732,12.8211713 C12.2210898,12.8066992 12.4468753,12.4710591 12.4700372,12.3329443 C12.4931991,12.1948294 12.4904609,12.0114307 12.4359051,11.8123984 C12.3813492,11.613366 12.0703647,11.4595414 11.8578244,11.412544 C11.645284,11.3655467 7.99488998,11.412544 7.71692742,11.412544 C7.44426574,11.412544 7.02090924,11.7100039 6.80554491,11.8325351 C6.80135797,11.8349172 6.79724965,11.8372332 6.79322257,11.8394797 C6.65244349,11.9180113 6.27194461,12.2318859 5.65172593,12.7811035 L5.65172593,12.7811035 L4.29240129,12.7811035 C4.25499998,12.7794737 4.20871552,12.8053909 4.15354789,12.8588549 C4.09838027,12.9123189 4.07079646,12.9895274 4.07079646,13.0904805 L4.07079646,13.0904805 L4.07079646,15.3901554 C4.07079646,15.4990417 4.14466474,15.5534848 4.29240129,15.5534848 L4.29240129,15.5534848 L12.4136361,15.5534848 C12.6809762,15.5534848 12.9747244,15.4214806 13.2948806,15.1574722 C15.5046166,13.3913373 16.6362124,12.4606738 16.6896678,12.3654814 C16.769851,12.2226928 16.8384969,11.8394797 16.4380526,11.5487525 Z M9.14776575,4.46902655 C9.13467188,4.46902655 9.13467188,4.46902655 9.14776575,4.46902655 L9.13467188,4.46902655 C8.42760304,4.46902655 7.78600352,4.85047299 7.45865684,5.4607873 C7.14440402,6.07110161 7.19677949,6.80856474 7.61578324,7.35530466 L7.62887712,7.36801954 C8.50616624,8.41063982 10.1559935,9.87285119 10.2345567,9.9364256 C10.2869322,9.97457024 10.3393077,10 10.404777,10 C10.4702464,10 10.5226218,9.97457024 10.5749973,9.9364256 C10.6404666,9.87285119 12.3033878,8.41063982 13.1675831,7.38073442 C13.1675831,7.36801954 13.1806769,7.36801954 13.1806769,7.35530466 C13.5996807,6.80856476 13.6520562,6.07110162 13.3378033,5.4607873 C13.0235505,4.85047299 12.381951,4.46902655 11.6748822,4.46902655 L11.6617883,4.46902655 C11.1904091,4.46902655 10.7452176,4.64703489 10.404777,4.97762181 C10.0774303,4.64703489 9.61914497,4.46902655 9.14776575,4.46902655 Z"
                  id="Sponsored备份"
                />
              </g>
            </g>
          </g>
        </g>
      </svg>
    </StyledIconWrapper>
  );
  return hoverable ? (
    <Tooltip title={t(translations.general.table.token.projectInfo.sponsor)}>
      {icon}
    </Tooltip>
  ) : (
    icon
  );
};
export const VerifyIcon = function ({
  isActive = false,
  onClick,
  hoverable = false,
}: IconProp) {
  const { t } = useTranslation();
  const icon = (
    <StyledIconWrapper onClick={onClick} hoverable={hoverable}>
      {isActive ? (
        <svg
          width="20px"
          height="20px"
          viewBox="0 0 20 20"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>verified</title>
          <g
            id="Token-List/Project-Info"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
          >
            <g
              id="画板"
              transform="translate(-149.000000, -118.000000)"
              fill="#7789D3"
            >
              <g id="verified" transform="translate(149.000000, 118.000000)">
                <path
                  d="M10,0 C15.5228475,0 20,4.4771525 20,10 C20,15.5228475 15.5228475,20 10,20 C4.4771525,20 0,15.5228475 0,10 C0,4.4771525 4.4771525,0 10,0 Z M10.3172003,4 L9.6827997,4 L8.19061802,5.52792256 L5.98361876,5.52792256 L5.51005212,5.97468354 L5.51005212,8.14594192 L4,9.6827997 L4,10.3172003 L5.51005212,11.8540581 L5.51005212,14.0163812 L5.98361876,14.4631422 L8.19061802,14.4631422 L9.6827997,16 L10.3172003,16 L11.8540581,14.4631422 L13.9985108,14.4631422 L14.4452718,14.0163812 L14.4452718,11.8540581 L16,10.3172003 L16,9.6827997 L14.4720774,8.14594192 L14.4720774,5.96574832 L14.0253165,5.52792256 L11.8540581,5.52792256 L10.3172003,4 Z M12.2114669,8.20848846 L12.8458675,8.84288905 L9.47728965,12.2114669 L8.84288905,12.2114669 L7.29709605,10.6656739 L7.93149665,10.0312733 L9.16455696,11.2643336 L12.2114669,8.20848846 Z"
                  id="形状结合"
                ></path>
              </g>
            </g>
          </g>
        </svg>
      ) : (
        <svg
          width="20px"
          height="20px"
          viewBox="0 0 20 20"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>unVerified</title>
          <g
            id="Token-List/Project-Info"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
          >
            <g
              id="画板"
              transform="translate(-127.000000, -118.000000)"
              fill="#DBDDE4"
            >
              <g id="unVerified" transform="translate(127.000000, 118.000000)">
                <path
                  d="M10,0 C15.5228475,0 20,4.4771525 20,10 C20,15.5228475 15.5228475,20 10,20 C4.4771525,20 0,15.5228475 0,10 C0,4.4771525 4.4771525,0 10,0 Z M10.3172003,4 L9.6827997,4 L8.19061802,5.52792256 L5.98361876,5.52792256 L5.51005212,5.97468354 L5.51005212,8.14594192 L4,9.6827997 L4,10.3172003 L5.51005212,11.8540581 L5.51005212,14.0163812 L5.98361876,14.4631422 L8.19061802,14.4631422 L9.6827997,16 L10.3172003,16 L11.8540581,14.4631422 L13.9985108,14.4631422 L14.4452718,14.0163812 L14.4452718,11.8540581 L16,10.3172003 L16,9.6827997 L14.4720774,8.14594192 L14.4720774,5.96574832 L14.0253165,5.52792256 L11.8540581,5.52792256 L10.3172003,4 Z M10.4244229,11.8826508 L10.4244229,12.6760983 L9.63097543,12.6760983 L9.63097543,11.8826508 L10.4244229,11.8826508 Z M10.1250931,7.31496649 C10.3752792,7.31496649 10.5924051,7.3560685 10.77379,7.44005957 C10.9524944,7.51958302 11.1008191,7.62769918 11.2151899,7.76440804 C11.3286672,7.90022338 11.4117647,8.0556962 11.4644825,8.22903946 C11.5163068,8.40238273 11.5422189,8.58108712 11.5422189,8.76425912 C11.5422189,8.93492182 11.5136262,9.09575577 11.4546538,9.24676098 C11.3974684,9.39329859 11.3268801,9.53268801 11.2419955,9.66314222 C11.1580045,9.79091586 11.0659717,9.91332837 10.9650037,10.0294862 C10.8667163,10.1447506 10.7764706,10.2546538 10.693373,10.3618764 C10.6165658,10.4572696 10.5478255,10.5588857 10.487863,10.6656739 C10.437762,10.7520947 10.4106877,10.8499312 10.4092331,10.9498138 L10.4092331,11.3787044 L9.61578555,11.3787044 L9.61578555,10.8970961 C9.61578555,10.7469844 9.64348474,10.6084885 9.69977662,10.4825019 C9.75790009,10.3555638 9.82981459,10.2354067 9.91422189,10.1241996 C10,10.0107223 10.0929263,9.90081906 10.1894267,9.79538347 C10.2836304,9.69378594 10.3727919,9.58762701 10.4565897,9.47728965 C10.5396873,9.37006701 10.6084885,9.25748325 10.6603127,9.14043187 C10.7145561,9.02251387 10.742019,8.8940487 10.7407297,8.76425912 C10.7407297,8.6615041 10.7264334,8.56679077 10.6987342,8.48011914 L10.6987342,8.47922561 C10.6762954,8.39925224 10.6366514,8.32514837 10.5825763,8.26209978 C10.5306471,8.20008193 10.4644086,8.15162969 10.3895756,8.12092331 L10.3886821,8.12092331 C10.3060491,8.08427799 10.2163601,8.06627919 10.1259866,8.06820551 C10.0201122,8.06452733 9.91528226,8.09019366 9.82308265,8.14236783 C9.74388843,8.1916721 9.67599061,8.25713413 9.62382725,8.33447506 L9.62293373,8.33447506 C9.57065388,8.41420405 9.53200263,8.50207526 9.50856292,8.59448995 C9.48175726,8.69188384 9.46388682,8.78659717 9.45316456,8.87773641 L9.44869695,8.91615786 L8.64899479,8.91615786 L8.65167535,8.87058824 C8.66775875,8.57930007 8.73119881,8.32107223 8.84110201,8.09858526 C8.88756515,8.00208488 8.94564408,7.90737156 9.01355175,7.81444527 C9.08592703,7.71973194 9.1743857,7.63574088 9.27624721,7.56425912 C9.38257632,7.48920328 9.50409531,7.43023083 9.64169769,7.38555473 C9.79800075,7.33625158 9.96121828,7.3124176 10.1250931,7.31496649 Z"
                  id="形状结合"
                ></path>
              </g>
            </g>
          </g>
        </svg>
      )}
    </StyledIconWrapper>
  );
  const tip = !isActive
    ? t(translations.general.table.token.projectInfo.unverify)
    : t(translations.general.table.token.projectInfo.verify);
  return hoverable ? <Tooltip title={tip}>{icon}</Tooltip> : icon;
};
export const DetailIcon = function ({
  onClick,
  hoverable = true,
  warnings,
}: IconProp & { warnings?: Array<React.ReactChild> }) {
  const { t } = useTranslation();
  const isWarning = warnings?.length;
  const icon = isWarning ? (
    <Image width="20px" src={iconWarning} preview={false} />
  ) : (
    <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1">
      <g id="Token-List/Hoverlist-出现弹窗" stroke="none" fill="none">
        <g
          id="Project-Info-Plan-F"
          transform="translate(-1531.000000, -302.000000)"
          fill={isWarning ? '#fa8000' : '#7789D3'}
        >
          <g id="iconsx备份" transform="translate(1371.000000, 300.000000)">
            <g id="list" transform="translate(160.000000, 2.000000)">
              <path
                d="M10,0 C12.6521649,0 15.195704,1.0535684 17.0710678,2.92893219 C18.9464316,4.80429597 20,7.3478351 20,10 C20,15.5228475 15.5228475,20 10,20 C4.4771525,20 0,15.5228475 0,10 C0,4.4771525 4.4771525,0 10,0 Z M10,1.40350877 C5.25469348,1.4093087 1.4093087,5.25469348 1.40350877,10 C1.40350877,14.747711 5.25228899,18.5964912 10,18.5964912 C14.747711,18.5964912 18.5964912,14.747711 18.5964912,10 C18.5964912,5.25228899 14.747711,1.40350877 10,1.40350877 Z M11.4035088,12.4561404 C11.791077,12.4561404 12.1052632,12.7703265 12.1052632,13.1578947 C12.1052632,13.545463 11.791077,13.8596491 11.4035088,13.8596491 L6.14035088,13.8596491 C5.75278263,13.8596491 5.43859649,13.545463 5.43859649,13.1578947 C5.43859649,12.7703265 5.75278263,12.4561404 6.14035088,12.4561404 L11.4035088,12.4561404 Z M13.8596491,12.4561404 C14.2472174,12.4561404 14.5614035,12.7703265 14.5614035,13.1578947 C14.5614035,13.545463 14.2472174,13.8596491 13.8596491,13.8596491 C13.4720809,13.8596491 13.1578947,13.545463 13.1578947,13.1578947 C13.1578947,12.7703265 13.4720809,12.4561404 13.8596491,12.4561404 Z M13.8596491,8.94736842 C14.2472174,8.94736842 14.5614035,9.26155456 14.5614035,9.64912281 C14.5614035,10.0366911 14.2472174,10.3508772 13.8596491,10.3508772 L6.14035088,10.3508772 C5.75278263,10.3508772 5.43859649,10.0366911 5.43859649,9.64912281 C5.43859649,9.26155456 5.75278263,8.94736842 6.14035088,8.94736842 L13.8596491,8.94736842 Z M13.8596491,5.43859649 C14.2472174,5.43859649 14.5614035,5.75278263 14.5614035,6.14035088 C14.5614035,6.52791912 14.2472174,6.84210526 13.8596491,6.84210526 L6.14035088,6.84210526 C5.75278263,6.84210526 5.43859649,6.52791912 5.43859649,6.14035088 C5.43859649,5.75278263 5.75278263,5.43859649 6.14035088,5.43859649 L13.8596491,5.43859649 Z"
                id="形状结合"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
  let title: React.ReactChild = t(
    translations.general.table.token.projectInfo.projectInfo,
  ) as string;
  if (isWarning) {
    title = React.createElement('div', {}, warnings);
  }
  return (
    <Tooltip title={title}>
      <StyledIconWrapper onClick={onClick} hoverable={hoverable}>
        {icon}
      </StyledIconWrapper>
    </Tooltip>
  );
};

const StyledIconWrapper = styled.span<{
  hoverable?: boolean;
}>`
  cursor: ${props => (props.hoverable ? 'pointer' : 'inherit')};
  display: inline-flex;
`;

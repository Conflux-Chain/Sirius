/**
 *
 * NFTPreview
 *
 */
import React, { useEffect, useState } from 'react';
import { Popover, Image } from '@jnoodle/antd';
import tokenIdNotFound from 'images/token/tokenIdNotFound.jpg';
import { default as abi } from 'utils/contract/crc1155core.json';
import { cfx, formatAddress } from '../../../utils/cfx';
import styled from 'styled-components';
import { Text } from '../Text/Loadable';
import { translations } from '../../../locales/i18n';
import { useTranslation } from 'react-i18next';
import nftPreviewActive from 'images/token/nftPreviewActive2.svg';
import nftPreview from 'images/token/nftPreview2.svg';

const crc1155Contracts = {
  // ConFi is the mascot of the Conflux community.
  confi: 'cfx:acc370g3s6d56ndcp8t6gyc657rhtp0fz6ytc8j9d2',
  // The New Year Carnival Series Roast Cards are issued by Conflux Community Fun Committee during the Carnival Activity held in the Spring Festival in 2020.
  confiCard: 'cfx:accczxbt4ebbnns39k1zczgj4s397h89mjheyw8gt7',
  // ConDragon is the first DeFi+NFT+RPG game in the Conflux community.
  conDragon: 'cfx:acb3fcbj8jantg52jbg66pc21jgj2ud02pj1v4hkwn',
  // The Guardian Badge is generated by staking FC at fccfx.confluxscan.io.
  confluxGuardian: 'cfx:ach7c9fr2skv5fft98cygac0g93999z1refedecnn1',
  // Ancient Chinese God NFT
  ancientChineseGod: 'cfx:acbp6r5kpgvz3pcxax557r2xrnk4rv9f02tpkng9ne',
  // Genesis NFT is the NFT airdropped by moonswap to 1024 pilots participating in Genesis lunar landing
  moonswapGenesis: 'cfx:ace6x5ckj2d47fzsfj5pvu8uejf6hkj2denccrga1x',
  // ConHero is published by the Conflux community development team "FengYun Studio".
  conHero: 'cfx:acgjttbz35rukntbvnp6u6arx8rwwxekfyks00vr3n',
  // Longshi NFT is composed of three C-level dinosaur NFTs, which can be opened to B, a, s and SSS level dinosaur NFT.
  conDragonStone: 'cfx:aca3rsc5dexn0v0d65gbzuuvdkygmby54a0937ab68',
  // ConFi will drive the Satoshi Nakamoto spaceship to the moon on the Pizza Day.
  satoshiGift: 'cfx:aca2b2m3r6esybzn2gwprmhe692n92154y48cs0g0h',
  // Shan hai jing NFT
  shanhaijing: 'cfx:accyby39bahapc9gm7utnyve8j85htsf5j9173yt3r',
  // Shanhaiching Series Card Pack - Open through NFTBox to get a random set of beautiful Shanhaiching exotic cards
  shanhaichingSeriesCard: 'cfx:ace75v0h345vhbn9vzsg2ukkvkw65cbbvjpcvnza3e',
  // All Conflux wallet addresses that have cross-chained more than 1000 CFX from Conflux Network to BSC from March 24th 18:00 until March 29th 18:00 (GMT + 8) will be rewarded an exclusive NTF.
  shuttleflowBscNft: 'cfx:acemxe9xudprr1wu9hap6d349pa7uuc6wpjy0guwt9',
  // Cross-Chain NFT / Glory Edition is an honorary NFT launched for Conflux's first DeFi lending protocol---Flux.
  crossChainNftGloryEdition: 'cfx:acajsgt3jpfjd23gdcw8uvry7jb9ttfe6pjeha40uc',
  // Media, exchanges and ecosystem projects partners are gathering for ConFi’s birthday party themed on “Going Global”.
  happyBirthdayToConfi: 'cfx:acb5tyk4cg64em7w3gpu0u00en6bnaf7mjwr9hj3k8',
  // At the genesis of TREA's creation
  TREAGenesisFeitian: 'cfx:accfeg3rcm430khhbz09r4t38aswm5u9dezucjxjcf',
  // From March 3 at 3:00 am UTC to March 5 at 4:00 pm UTC, all participants who deposit 1,000 CFX or more to OKEx will be eligible to receive a nonfungible token.1068 total
  OKExNft: 'cfx:acg22hydxwbnf5wg6webmg84se6ukk3jkujdvm4su0',
};

const cacheNFT = (
  {
    address,
    tokenId,
    imageUri,
  }: { address: string; tokenId: string | number; imageUri?: string },
  isWrite: boolean = false,
) => {
  const cacheKey = `${address}-${tokenId}`;
  if (isWrite && imageUri) {
    localStorage.setItem(
      cacheKey,
      JSON.stringify({
        address,
        tokenId,
        imageUri,
        // cache 3 days
        timeout: +new Date() + 1000 * 60 * 60 * 24 * 3,
      }),
    );
    return null;
  }
  const cachedNFT = localStorage.getItem(cacheKey);
  if (cachedNFT) {
    const cachedNFTObj = JSON.parse(cachedNFT);
    if (cachedNFTObj.timeout > +new Date()) {
      console.log('cached', tokenId);
      return cachedNFTObj['imageUri'];
    } else {
      console.log('cache timeout', tokenId);
      localStorage.removeItem(cacheKey);
      return null;
    }
  }
  console.log('not cached', tokenId);
  return null;
};

export const NFTPreview = ({
  contractAddress,
  tokenId,
}: {
  contractAddress?: string;
  tokenId?: number | string;
}) => {
  const { t } = useTranslation();
  const [imageUri, setImageUri] = useState('');
  const [imageMinHeight, setImageMinHeight] = useState(200);
  const [previewIcon, setPreviewIcon] = useState(nftPreview);

  const setImage = ({
    address,
    tokenId,
    method = 'uri',
    minHeight = 200,
    needFetchJson = true,
    jsonUriFormatter,
    imageUriFormatter,
  }: {
    address: string;
    tokenId: string | number;
    method?: string;
    minHeight?: number;
    needFetchJson?: boolean;
    jsonUriFormatter?: any;
    imageUriFormatter?: any;
  }) => {
    console.log(`setImage`, {
      address,
      tokenId,
    });
    const imageUri = cacheNFT({ address, tokenId });
    if (imageUri) {
      setImageMinHeight(minHeight);
      setImageUri(imageUri);
      return;
    }

    const contract = cfx.Contract({
      abi,
      address,
    });
    contract[method](tokenId)
      .then(res => {
        console.log(res);
        if (res) {
          if (needFetchJson) {
            fetch(
              `https://api.allorigins.win/get?url=${encodeURIComponent(
                jsonUriFormatter ? jsonUriFormatter(res) : res,
              )}`,
            )
              .then(response => response.json())
              .then(data => {
                setImageMinHeight(minHeight);
                setImageUri(
                  imageUriFormatter
                    ? imageUriFormatter(data)
                    : JSON.parse(data.contents).image,
                );
                cacheNFT(
                  {
                    address,
                    tokenId,
                    imageUri: imageUriFormatter
                      ? imageUriFormatter(data)
                      : JSON.parse(data.contents).image,
                  },
                  true,
                );
              })
              .catch(e => {
                console.error(e);
              });
          } else {
            setImageMinHeight(minHeight);
            setImageUri(imageUriFormatter ? imageUriFormatter(res) : res);
            cacheNFT(
              {
                address,
                tokenId,
                imageUri: imageUriFormatter ? imageUriFormatter(res) : res,
              },
              true,
            );
          }
        }
      })
      .catch(e => {
        console.error(e);
      });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getImageUri = (contractAddress, tokenId) => {
    const formatContractAddress = formatAddress(contractAddress) as string;
    switch (formatContractAddress) {
      case crc1155Contracts.confi:
        setImage({
          address: formatContractAddress,
          tokenId,
          method: 'uris',
          needFetchJson: false,
          imageUriFormatter: res =>
            'http://cdn.tspace.online/image/finish/' + JSON.parse(res).url,
        });
        break;

      case crc1155Contracts.confiCard:
        setImage({
          address: formatContractAddress,
          tokenId,
          minHeight: 328,
        });
        break;

      case crc1155Contracts.conDragon:
        setImage({
          address: formatContractAddress,
          tokenId,
        });
        break;

      case crc1155Contracts.confluxGuardian:
        setImageMinHeight(200);
        setImageUri('https://cdn.image.htlm8.top/guardian/nft.png');
        break;

      case crc1155Contracts.ancientChineseGod:
        setImage({
          address: formatContractAddress,
          tokenId,
          minHeight: 377,
          jsonUriFormatter: res =>
            res.replace('{id}', Number(tokenId).toString(16)),
        });
        break;

      case crc1155Contracts.moonswapGenesis:
        setImage({
          address: formatContractAddress,
          tokenId,
          minHeight: 150,
        });
        break;

      case crc1155Contracts.conHero:
        setImage({
          address: formatContractAddress,
          tokenId,
          minHeight: 267,
        });
        break;

      case crc1155Contracts.conDragonStone:
        setImageMinHeight(200);
        setImageUri(
          'https://cdn.image.htlm8.top/dragon-stone/dragon-stone.png',
        );
        break;

      case crc1155Contracts.satoshiGift:
        setImageMinHeight(282);
        setImageUri('https://cdn.image.htlm8.top/pizza-day/nft.png');
        break;

      case crc1155Contracts.shanhaijing:
        setImage({
          address: formatContractAddress,
          tokenId,
          minHeight: 267,
        });
        break;

      case crc1155Contracts.shanhaichingSeriesCard:
        setImageMinHeight(267);
        setImageUri('https://metadata.boxnft.io/nftbox.gif');
        break;

      case crc1155Contracts.shuttleflowBscNft:
        setImageMinHeight(200);
        setImageUri('https://cdn.image.htlm8.top/bsc-shuttleflow-nft/nft.png');
        break;

      case crc1155Contracts.crossChainNftGloryEdition:
        setImageMinHeight(200);
        setImageUri('https://cdn.image.htlm8.top/flux-shuttleflow-nft/nft.jpg');
        break;

      case crc1155Contracts.happyBirthdayToConfi:
        setImageMinHeight(50);
        setImageUri('https://cdn.image.htlm8.top/confi-birthday-nft/nft.png');
        break;

      case crc1155Contracts.TREAGenesisFeitian:
        setImage({
          address: formatContractAddress,
          tokenId,
          method: 'uris',
          minHeight: 200,
          needFetchJson: false,
          imageUriFormatter: res => JSON.parse(res).image,
        });
        break;

      case crc1155Contracts.OKExNft:
        setImageMinHeight(200);
        setImageUri(
          'https://cdn.image.htlm8.top/okex-listing-nft/okex-listing-nft.gif',
        );
        break;

      default:
        setImageMinHeight(200);
        break;
    }
  };

  useEffect(() => {
    if (contractAddress && tokenId) {
      getImageUri(contractAddress, tokenId);
    }
  }, [contractAddress, getImageUri, tokenId]);

  return contractAddress && tokenId && imageUri ? (
    <PopoverWrapper
      placement="right"
      trigger="click"
      overlayClassName="image-preview-popover"
      content={
        <Image
          width={200}
          style={{ minHeight: imageMinHeight }}
          src={imageUri}
          preview={true}
          fallback={tokenIdNotFound}
          alt={tokenId + ''}
        />
      }
      onVisibleChange={(visible: boolean) => {
        setPreviewIcon(visible ? nftPreviewActive : nftPreview);
      }}
    >
      <Text span hoverValue={t(translations.general.preview)}>
        <img
          src={previewIcon}
          alt="Preview"
          style={{ width: 17, height: 17, marginTop: -4 }}
        />
      </Text>
    </PopoverWrapper>
  ) : null;
};

const PopoverWrapper = styled(Popover)`
  margin-left: 8px;
`;

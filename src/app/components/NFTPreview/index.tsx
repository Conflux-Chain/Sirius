/**
 *
 * NFTPreview
 *
 */
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Image, Popover, Skeleton, Spin } from '@cfxjs/antd';
import tokenIdNotFound from 'images/token/tokenIdNotFound.jpg';
import styled from 'styled-components';
import { Text } from '../Text/Loadable';
import { translations } from 'locales/i18n';
import { useTranslation } from 'react-i18next';
import nftPreviewActive from 'images/token/nftPreviewActive2.svg';
import nftPreview from 'images/token/nftPreview2.svg';
import nftInfo from 'images/info.svg';
import { reqNFTInfo } from 'utils/httpRequest';
import { Tooltip } from '@cfxjs/react-ui';
import NotFoundIcon from 'images/token/tokenIdNotFound.jpg';
import fetch from 'utils/request';
import { AUDIO_PAUSED, AUDIO_PLAY } from 'utils/constants';

const epiKProtocolKnowledgeBadge =
  'cfx:acev4c2s2ttu3jzxzsd4a2hrzsa4pfc3f6f199y5mk';

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
const videoType = ['mp4', 'avi', 'mpeg', 'ogv', 'ts', 'webm', '3gp', '2gp'];
const audioType = [
  'aac',
  'mid',
  'midi',
  'mp3',
  'oga',
  'opus',
  'wav',
  'weba',
  'cda',
];
const imageType = [
  'bmp',
  'gif',
  'ico',
  'jpg',
  'jpeg',
  'png',
  'svg',
  'tif',
  'tiff',
  'webp',
];

export const NFTCardInfo = React.memo(
  ({
    imageUri,
    tokenId,
    imageMinHeight,
    width = 200,
  }: {
    imageUri: string;
    tokenId?: number | string;
    imageMinHeight?: number;
    width?: 200 | 500;
  }) => {
    let [nftType, setNftType] = useState('image');
    const [isAudioPlay, setIsAudioPlay] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
      let nftType = 'image';
      // eslint-disable-next-line no-useless-escape
      const suffix = /\.[^\.]+$/.exec(imageUri.substr(-5));

      if (suffix) {
        const sourceType = suffix[0].substr(1);
        if (videoType.includes(sourceType)) {
          nftType = 'video';
        } else if (imageType.includes(sourceType)) {
          nftType = 'image';
        } else if (audioType.includes(sourceType)) {
          nftType = 'audio';
        }
      } else {
        // has not suffix
        fetch(imageUri, {
          method: 'HEAD',
        }).then(res => {
          for (let pair of res.headers.entries()) {
            if (pair[0] === 'content-type') {
              nftType = pair[1].split('/')[0];
              setNftType(nftType);
            }
          }
        });
      }

      setNftType(nftType);
    }, [imageUri]);

    const audioControl = useCallback(() => {
      const audioDom: HTMLAudioElement | null = audioRef.current;
      if (audioDom) {
        if (audioDom.paused) {
          audioDom.play();
          setIsAudioPlay(true);
        } else {
          audioDom.pause();
          setIsAudioPlay(false);
        }

        audioDom.onended = ev => {
          setIsAudioPlay(false);
        };
      }
    }, [audioRef]);

    return (
      <>
        {nftType === 'video' ? (
          <VideoCard>
            <video
              controls
              className="ant-video"
              preload="metadata"
              // poster={imageUri}
              src={`${imageUri}?source=video`}
            ></video>
          </VideoCard>
        ) : nftType === 'audio' ? (
          <AudioCard>
            <img
              src="https://d2kfoba0ei9gzz.cloudfront.net/condragon/8-1.png"
              alt="1"
            />
            <img
              src="https://cdn.epikg.com/app_res/nft/vinyl_record.png"
              alt="1"
              className={`audio-disk ${isAudioPlay ? 'play' : 'paused'}`}
            />
            <img
              src={isAudioPlay ? AUDIO_PLAY : AUDIO_PAUSED}
              alt="btn"
              className="audio-btn"
              onClick={audioControl}
            />
            <audio ref={audioRef} preload="metadata" src={imageUri}></audio>
          </AudioCard>
        ) : (
          <Image
            width={width}
            style={{ minHeight: imageMinHeight }}
            src={imageUri}
            preview={true}
            fallback={tokenIdNotFound}
            alt={tokenId + ''}
          />
        )}
      </>
    );
  },
);

export const NFTPreview = React.memo(
  ({
    contractAddress,
    tokenId,
    type = 'preview',
  }: {
    contractAddress?: string;
    tokenId?: number | string;
    type?: 'preview' | 'card';
  }) => {
    const { t, i18n } = useTranslation();
    const lang = i18n.language.includes('zh') ? 'zh' : 'en';
    const [imageUri, setImageUri] = useState('');
    const [loading, setLoading] = useState(false);
    const [imageMinHeight, setImageMinHeight] = useState(200);
    const [previewIcon, setPreviewIcon] = useState(nftPreview);
    const [imageName, setImageName] = useState('');
    const [isFirstTime, setIsFirstTime] = useState(true);

    useEffect(() => {
      if (contractAddress && tokenId) {
        setLoading(true);

        reqNFTInfo({
          query: { contractAddress, tokenId },
        })
          .then(({ data }) => {
            if (data) {
              setImageMinHeight(data.imageMinHeight);
              if (data.imageUri) {
                // setImageUri(data.imageUri);
                setImageUri(
                  'https://cdn.epikg.com/2bb2a765260a51403cc5c5006c73765578f4d27bdd80f93c38af3ff34bcc8810',
                );
              }
              setImageName(data.imageName ? data.imageName[lang] || '' : '');
            }
          })
          .catch(e => {
            console.log(e);
          })
          .finally(() => {
            setLoading(false);
            setIsFirstTime(false);
          });
      }
    }, [contractAddress, tokenId, lang]);

    return contractAddress && tokenId ? (
      type === 'preview' ? (
        imageUri ? (
          <PopoverWrapper
            placement="right"
            trigger="click"
            overlayClassName="image-preview-popover"
            content={
              <>
                {contractAddress === epiKProtocolKnowledgeBadge ? (
                  <iframe
                    title={imageName}
                    width={200}
                    style={{ minHeight: imageMinHeight }}
                    src={imageUri}
                  />
                ) : (
                  <NFTCardInfo
                    imageUri={imageUri}
                    tokenId={tokenId}
                    imageMinHeight={imageMinHeight}
                  />
                )}
                {imageName ? (
                  <div className="image-preview-name">{imageName}</div>
                ) : null}
              </>
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
        ) : imageName ? (
          <Tooltip hoverable text={imageName} placement="top">
            <img src={nftInfo} alt="?" style={{ marginLeft: 4 }} />
          </Tooltip>
        ) : null
      ) : (
        <NFTCard>
          <Spin spinning={loading}>
            {imageUri ? (
              contractAddress === epiKProtocolKnowledgeBadge ? (
                <div className="ant-image">
                  <iframe title={imageName} src={imageUri} />
                </div>
              ) : (
                <NFTCardInfo
                  imageUri={imageUri}
                  tokenId={tokenId}
                  width={500}
                />
              )
            ) : isFirstTime ? (
              <Skeleton.Image />
            ) : (
              <Image
                width={500}
                src={NotFoundIcon}
                alt={'not found'}
                fallback={tokenIdNotFound}
              />
            )}
            <div className="info">
              <Tooltip text={imageName} placement={'top-start'} hoverable>
                <div className="name">{imageName}</div>
              </Tooltip>
              <Tooltip text={tokenId} placement={'top-start'} hoverable>
                <div className="id">
                  {t(translations.nftChecker.tokenId)}: {tokenId}
                </div>
              </Tooltip>
            </div>
          </Spin>
        </NFTCard>
      )
    ) : null;
  },
);

const AudioCard = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 200px;
  @keyframes rotate-audio-disk {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .audio-disk {
    position: absolute;
    width: 50%;
    height: 50%;
    top: 25%;
    left: 25%;
    z-index: 1;
    animation: rotate-audio-disk 9.5s linear 0s infinite normal none;
    &.play {
      animation-play-state: running;
    }
    &.paused {
      animation-play-state: paused;
    }
  }
  .audio-btn {
    position: absolute;
    width: 12%;
    height: 12%;
    left: 44%;
    top: 44%;
    z-index: 3;
    cursor: pointer;
  }
`;

const PopoverWrapper = styled(Popover)`
  margin-left: 8px;
`;

const VideoCard = styled.div`
  width: 100%;
  height: 0;
  padding-top: 100%;
  position: relative;
  min-width: 200px;
  .ant-video {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const NFTCard = styled.div`
  background-color: #fff;
  border: 1px solid #ebeced;
  border-radius: 5px;

  .ant-image {
    position: relative;
    width: 100%;
    max-width: 100%;
    padding-top: 100%;

    img,
    iframe {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      object-fit: contain;
      border-radius: 5px 5px 0 0;
    }

    iframe {
      .album .btn {
        cursor: pointer;
      }
    }
  }

  .ant-skeleton {
    position: relative;
    width: 100%;
    max-width: 100%;
    padding-top: 100%;

    .ant-skeleton-image {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      object-fit: contain;
      border-radius: 5px 5px 0 0;
    }
  }

  .info {
    padding: 8px 10px 10px;
    font-size: 12px;
    color: #002257;

    .name {
      height: 18px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      > span {
        font-size: 10px;
      }
    }

    .tooltip {
      width: 179px;

      .id {
        color: #74798c;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
`;

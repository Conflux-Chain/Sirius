import React, { ReactNode, MouseEventHandler, useRef } from 'react';
import styled from 'styled-components/macro';
import clsx from 'clsx';
import { Link as UILink } from '@cfxjs/react-ui';
import { useRouteMatch, Link as RouterLink } from 'react-router-dom';
import { media, useBreakpoint } from 'styles/media';
import { ChevronDown } from '@zeit-ui/react-icons';
import { useToggle, useClickAway } from 'react-use';
import { ScanEvent } from '../../../utils/gaConstants';
import { trackEvent } from '../../../utils/ga';

export type HeaderLinkTitle = ReactNode | Array<ReactNode>;

export interface HeaderLink {
  title: HeaderLinkTitle;
  href?: string;
  name?: string;
  className?: string;
  onClick?: MouseEventHandler;
  children?: HeaderLink[];
  isMatchedFn?: (link: Partial<HeaderLink>) => boolean;
  matched?: boolean;
}

export type HeaderLinks = HeaderLink[];

export function genParseLinkFn(links: HeaderLinks, level = 0) {
  function parseLink(link: HeaderLink, idx: number) {
    const {
      title,
      href,
      name,
      className = '',
      onClick,
      children,
      isMatchedFn,
      matched: customMatched,
    } = link;

    let matched: boolean = customMatched || false;
    let childrenUI: ReactNode[] = [];
    let isMenu = false;
    if (href) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      matched = Boolean(useRouteMatch(href as string)?.isExact);
    }

    if (isMatchedFn) {
      matched = isMatchedFn(link);
    }

    if (children) {
      childrenUI = genParseLinkFn(children, level + 1);
      isMenu = true;
    }

    return (
      <HeaderLink
        isMenu={isMenu}
        key={idx}
        href={href}
        name={name}
        className={`navbar-link level-${level} ${className}`}
        onClick={onClick}
        matched={matched}
      >
        {title}
        {childrenUI}
      </HeaderLink>
    );
  }

  return links.map(parseLink);
}

const Menu = styled.div<{ name?: string }>`
  position: absolute;
  width: max-content;
  ${props => (props.name === 'switch-network' ? 'right: 0;' : 'left: 0;')}
  top: 2.3rem;
  background-color: white;
  box-shadow: 0rem 0.43rem 1.14rem 0rem rgba(20, 27, 50, 0.08);
  border-radius: 0.14rem;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  z-index: 50;

  a.link.navbar-link {
    svg {
      visibility: hidden;
    }
    &.level-1.matched {
      color: white;
      background-color: #65709a;
      :hover {
        color: white;
      }

      svg {
        margin-left: 1rem;
        visibility: visible;
      }
    }
  }

  ${media.m} {
    top: 0;
    box-shadow: none;

    position: inherit;
    background-color: rgba(255, 255, 255, 0.1);
    padding-left: 0;
  }
`;

export const HeaderLink: React.FC<{
  isMenu?: boolean;
  className: string;
  href?: string;
  name?: string;
  matched?: boolean;
  onClick?: MouseEventHandler;
}> = ({ className, href, name, matched, children, onClick, isMenu }) => {
  const [expanded, toggle] = useToggle(false);
  const ref = useRef(null);
  useClickAway(ref, () => {
    if (expanded) {
      setTimeout(() => toggle(false), 200);
    }
  });
  const bp = useBreakpoint();

  if (href) {
    return (
      <WrappLink>
        <RouterLink
          className={clsx('link', className, matched && 'matched')}
          onClick={() => {
            if (name) {
              // ga
              trackEvent({
                category: ScanEvent.menu.category,
                action: name,
              });
            }
          }}
          to={href}
        >
          {children}
        </RouterLink>
      </WrappLink>
    );
  } else if (onClick) {
    // select
    return (
      <WrappLink
        onClick={e => {
          e.preventDefault();
          onClick(e);
          toggle();
        }}
      >
        <div
          className={clsx(
            'link navbar-link-menu navbar-link',
            isMenu && expanded && 'expanded',
          )}
        >
          <UILink
            className={clsx(
              className,
              expanded && 'expanded',
              matched && 'matched',
            )}
          >
            {(bp === 'm' || bp === 's') && isMenu && <ChevronDown size={18} />}
            {children}
          </UILink>
        </div>
      </WrappLink>
    );
  } else {
    const [text, links] = children as ReactNode[];

    return (
      <WrappLink
        ref={ref}
        onClick={e => {
          toggle();
          e.preventDefault();
        }}
      >
        <div
          className={clsx([
            'link navbar-link-menu navbar-link',
            isMenu && expanded ? 'expanded' : '',
          ])}
        >
          <WrappLink>
            <UILink className={clsx(className, matched && 'matched')}>
              {(bp === 'm' || bp === 's') && isMenu && (
                <ChevronDown size={18} />
              )}
              {text}
              {bp !== 's' && bp !== 'm' && isMenu && <ChevronDown size={18} />}
            </UILink>
          </WrappLink>
          {expanded && (
            <Menu className="header-link-menu" name={name}>
              {links}
            </Menu>
          )}
        </div>
      </WrappLink>
    );
  }
};

const WrappLink = styled.span`
  //min-height: 2.14rem;
  .navbar-link {
    position: relative;
    cursor: pointer;
    font-weight: 500;
    &:hover {
      color: #1e3de4 !important;
      //background-color: rgba(100%, 87%, 11%, 70%);
    }
    &.matched {
      color: #1e3de4 !important;
      //background-color: #fede1b;
      &:hover {
        color: #1e3de4 !important;
        //background-color: #fede1b;
      }
    }
  }

  ${media.m} {
    .navbar-link {
      &:hover {
        color: #65709a !important;
      }
      &.level-0:hover:not(.matched) {
        background-color: #f1f4f6 !important;
      }
      &.matched {
        color: #65709a !important;
        background-color: #fede1b;
        &:hover {
          color: #65709a !important;
          background-color: #fede1b;
        }
      }
    }
  }
  .navbar-link-menu {
    > a.link.navbar-link {
      svg {
        transition: all 0.2s ease-out;
      }
    }
    &.expanded {
      .header-link-menu > span {
        width: 100%;
      }
      > span > a.link.navbar-link {
        svg {
          transform: rotate(180deg);
        }
      }
    }
  }

  a.link.navbar-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #65709a;
    padding: 0 1rem;

    &.home {
      padding-left: 0;
      padding-right: 2rem;
    }

    &.level-1 {
      width: auto;
      padding-top: 0.43rem;
      padding-bottom: 0.43rem;
      &.matched {
        background-color: #fff;
        //background-color: #65709a;
      }
      :hover:not(.matched) {
        background-color: #f1f4f6;
      }
    }
  }

  ${media.m} {
    .navbar-link:hover {
      background-color: transparent;
    }
    a.link.navbar-link {
      flex-direction: row;
      color: #aab9eb;
      padding-top: 0.43rem;
      padding-bottom: 0.43rem;
      :hover {
        color: #aab9eb;
      }
      &.level-0 {
        flex-direction: row-reverse;
      }
      &.level-1 {
        &.matched {
          background-color: #fede1b;
        }
      }

      &.home {
        flex-direction: row;
        padding-left: 1rem;
        padding-right: 1rem;
      }
    }
  }
`;

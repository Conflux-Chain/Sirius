import React from 'react';
import { Text } from '../Text/Loadable';
import { formatString, isContractAddress } from '../../../utils';
import { Link } from '../Link/Loadable';
import { Translation } from 'react-i18next';
import { translations } from '../../../locales/i18n';
import styled from 'styled-components/macro';
import { formatAddress } from '../../../utils/cfx';
import { FileText } from '@zeit-ui/react-icons';

interface Props {
  value: string;
  alias?: string;
  contractCreated?: string;
}

export const AddressContainer = ({ value, alias, contractCreated }: Props) => {
  let isContract = isContractAddress(value);

  if (!value) {
    // contract creation txn to prop is null
    if (contractCreated)
      return (
        <Text span hoverValue={formatAddress(contractCreated)}>
          <Link href={`/address/${formatAddress(contractCreated)}`}>
            <IconWrapper>
              <FileText size={12} color="#9b9eac" />
            </IconWrapper>
            <Translation>
              {t => t(translations.transaction.contractCreation)}
            </Translation>
          </Link>
        </Text>
      );

    // contract creation fail, no link
    return (
      <Text span>
        <IconWrapper>
          <FileText size={12} color="#9b9eac" />
        </IconWrapper>
        <Translation>
          {t => t(translations.transaction.contractCreation)}
        </Translation>
      </Text>
    );
  }

  const cfxAddress = formatAddress(value);

  if (isContract)
    return (
      <Text span hoverValue={cfxAddress}>
        <IconWrapper>
          <FileText size={12} color="#9b9eac" />
        </IconWrapper>
        <LinkWrapper href={`/address/${cfxAddress}`}>
          {alias ? formatString(alias, 'tag') : cfxAddress}
        </LinkWrapper>
      </Text>
    );

  return (
    <Text span hoverValue={cfxAddress}>
      <LinkWrapper href={`/address/${cfxAddress}`}>{cfxAddress}</LinkWrapper>
    </Text>
  );
};

const LinkWrapper = styled(Link)`
  display: inline-block !important;
  max-width: 130px !important;
  outline: none;
`;

const IconWrapper = styled.span`
  margin-right: 2px;

  svg {
    vertical-align: bottom;
    margin-bottom: 6px;
  }
`;

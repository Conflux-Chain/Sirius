import React from 'react';
import { Translation } from 'react-i18next';
import { Link } from '../../app/components/Link/Loadable';
import { translations } from '../../locales/i18n';
import { toThousands, formatNumber } from '../../utils/';

export const rank = {
  title: (
    <Translation>{t => t(translations.accounts.table.number)}</Translation>
  ),
  dataIndex: 'rank',
  key: 'rank',
  width: 1,
};

export const address = {
  title: (
    <Translation>{t => t(translations.accounts.table.address)}</Translation>
  ),
  dataIndex: 'base32address',
  key: 'base32address',
  width: 1,
  render: (value, row: any) => (
    <Link href={`/address/${value}`}>{row.name || value}</Link>
  ),
};

export const balance = {
  title: (
    <Translation>{t => t(translations.accounts.table.balance)}</Translation>
  ),
  width: 1,
  dataIndex: 'valueN',
  key: 'valueN',
  render: value =>
    value === null ? '--' : `${toThousands(Number(value))} CFX`,
};

export const percentage = {
  title: (
    <Translation>{t => t(translations.accounts.table.percentage)}</Translation>
  ),
  dataIndex: 'percent',
  key: 'percent',
  width: 1,
  render: value => formatNumber(value, { precision: 9, withUnit: false }) + '%',
};

export const count = {
  title: <Translation>{t => t(translations.accounts.table.count)}</Translation>,
  dataIndex: 'valueN', // txn count key name is valueN
  key: 'valueN',
  width: 1,
  render: value => toThousands(Number(value)) || '--',
};

import { ReactElement } from 'react';
import { Interface } from '@ethersproject/abi';
import { formatUnits } from '@ethersproject/units';
import { BigNumber } from '@ethersproject/bignumber';
const Zero = '0x0000000000000000000000000000000000000000';
const ERC20_ABI = [
  {
    constant: false,
    inputs: [
      {
        name: 'to',
        type: 'address',
      },
      {
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'transfer',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'transferFrom',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'spender',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

const ERC721_ABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: 'approved',
        type: 'bool',
      },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
];

const ERC1155_ABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256[]',
        name: 'ids',
        type: 'uint256[]',
      },
      {
        internalType: 'uint256[]',
        name: 'values',
        type: 'uint256[]',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'safeBatchTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'TransferSingle',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'ids',
        type: 'uint256[]',
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'values',
        type: 'uint256[]',
      },
    ],
    name: 'TransferBatch',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'approved',
        type: 'bool',
      },
    ],
    name: 'ApprovalForAll',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: 'approved',
        type: 'bool',
      },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

const ERC20_INTERFACE = new Interface(ERC20_ABI);
const ERC721_INTERFACE = new Interface(ERC721_ABI);
const ERC1155_INTERFACE = new Interface(ERC1155_ABI);

interface Result extends ReadonlyArray<any> {
  readonly [key: string]: any;
}
interface ReturnType {
  type: string;
  address?: string | undefined;
  value?: string | undefined;
  title: string;
  args: string[] | Result;
  content?: ReactElement | string;
}
interface Translation {
  [hash: string]: (args: TranslationArgs) => ReturnType;
}
interface Token {
  icon?: string;
  name?: string;
  symbol?: string;
  decimals?: number;
}
interface CustomProp {
  className?: string;
  address?: string;
}
interface EventList extends Token, CustomProp, CustomInfo {
  address: string;
  data: string;
  epochNumber: string;
  topics: string[];
  transactionHash: string;
  transactionLogIndex: string;
}
interface CustomInfo {
  [key: string]: any;
}
interface TranslationArgs extends Token, CustomProp, CustomInfo {
  data: string;
  value?: string | BigNumber;
}
interface TranslationEvent {
  [hash: string]: (args: EventList) => ReturnType;
}
interface ReturnDataType {
  data: ReturnType;
  event?: ReturnType[];
}

interface ERC20_Transfer {
  address: string;
  value: string;
}
interface ERC20_Approved {
  address: string;
}
interface ERC20_Revoked {
  address: string;
}
interface ERC721_TransferFrom {
  address: string;
  value: string;
}
interface ERC721_SafeTransferFrom {
  address: string;
  value: string;
}
interface ERC721_Revoked {
  address: string;
}
interface ERC721_Approved {
  address: string;
}
interface ERC1155_SafeTransferFrom {
  value: string;
  address: string;
}
interface ERC1155_Burn {
  value: string;
  address: string;
}
interface ERC1155_Transfer {
  value: string;
  address: string;
}
interface ERC1155_SafeBatchTransferFrom {
  value: string;
}
interface ERC1155_BatchBurn {
  value: string;
}
interface ERC1155_BatchMint {
  value: string;
}
export interface MultiAction {
  [key: string]: (result: any) => any;
  ERC20_Transfer: ({
    address,
    value,
    ...rest
  }: ERC20_Transfer & Record<string, any>) => any;
  ERC20_Approved: ({
    address,
    ...rest
  }: ERC20_Approved & Record<string, any>) => any;
  ERC20_Revoked: ({
    address,
    ...rest
  }: ERC20_Revoked & Record<string, any>) => any;
  ERC721_Burn: ({
    value,
    address,
    ...rest
  }: ERC721_TransferFrom & Record<string, any>) => any;
  ERC721_Transfer: ({
    value,
    address,
    ...rest
  }: ERC721_TransferFrom & Record<string, any>) => any;
  ERC721_SafeTransferFrom: ({
    value,
    address,
    ...rest
  }: ERC721_SafeTransferFrom & Record<string, any>) => any;
  ERC721_Revoked: ({
    address,
    ...rest
  }: ERC721_Revoked & Record<string, any>) => any;
  ERC721_Approved: ({
    address,
    ...rest
  }: ERC721_Approved & Record<string, any>) => any;
  ERC1155_SafeTransferFrom: ({
    value,
    address,
    ...rest
  }: ERC1155_SafeTransferFrom & Record<string, any>) => any;
  ERC1155_Burn: ({
    value,
    address,
    ...rest
  }: ERC1155_Burn & Record<string, any>) => any;
  ERC1155_Transfer: ({
    value,
    address,
    ...rest
  }: ERC1155_Transfer & Record<string, any>) => any;
  ERC1155_SafeBatchTransferFrom: ({
    value,
    address,
    ...rest
  }: ERC1155_SafeBatchTransferFrom & Record<string, any>) => any;
  ERC1155_BatchBurn: ({
    value,
    ...rest
  }: ERC1155_BatchBurn & Record<string, any>) => any;
  ERC1155_BatchMint: ({
    value,
    ...rest
  }: ERC1155_BatchMint & Record<string, any>) => any;
}
const ActionTranslate: Translation = {
  // transfer (ERC20)
  '0xa9059cbb': (arg: TranslationArgs) => {
    const { decimals, data } = arg;
    const parsed = ERC20_INTERFACE.parseTransaction({ data });
    const value = decimals
      ? formatUnits(parsed.args[1].toString(), decimals)
      : parsed.args[1].toString();
    return {
      type: 'ERC20_Transfer',
      title: 'Transfer',
      args: parsed.args,
      address: parsed.args[0],
      value,
      customInfo: arg,
    };
  },
  // transferFrom (ERC20,ERC721) x
  '0x23b872dd': (arg: TranslationArgs) => {
    const { decimals, data } = arg;
    const parsed = ERC20_INTERFACE.parseTransaction({ data });
    const value = decimals
      ? formatUnits(parsed.args[2].toString(), decimals)
      : parsed.args[2].toString();
    if (parsed.args[1] === Zero) {
      // only ERC721
      return {
        type: 'ERC721_Burn',
        title: 'Burn',
        args: parsed.args,
        value,
        address: parsed.args[0],
        customInfo: arg,
      };
    }
    return {
      type: 'ERC721_Transfer',
      title: 'Transfer',
      args: parsed.args,
      value,
      address: parsed.args[0],
      customInfo: arg,
    };
  },
  // approve (ERC20)
  '0x095ea7b3': (arg: TranslationArgs) => {
    const { data } = arg;
    const parsed = ERC20_INTERFACE.parseTransaction({ data });
    if (parsed.args[1].isZero()) {
      return {
        type: 'ERC20_Revoked',
        address: parsed.args[0],
        title: 'Revoked',
        args: parsed.args,
        customInfo: arg,
      };
    } else {
      // const value = decimals ? formatUnits(parsed.args[1].toString(), decimals) : parsed.args[1].toString();
      return {
        type: 'ERC20_Approved',
        address: parsed.args[0],
        title: 'Approved',
        args: parsed.args,
        customInfo: arg,
      };
    }
  },
  // safeTransferFrom (ERC721)
  '0x42842e0e': (arg: TranslationArgs) => {
    // Transfer {amount} of {token image}{contract name}{(token symbol)}
    const { data } = arg;
    const parsed = ERC721_INTERFACE.parseTransaction({ data });
    const value = parsed.args[2].toString();
    return {
      type: 'ERC721_SafeTransferFrom',
      title: 'Transfer',
      args: parsed.args,
      value: value,
      address: parsed.args[0],
      customInfo: arg,
    };
  },
  // setApprovalForAll (ERC721, ERC1155) x
  '0xa22cb465': (arg: TranslationArgs) => {
    const { data } = arg;
    const parsed = ERC721_INTERFACE.parseTransaction({ data });
    if (parsed.args[1] === false) {
      return {
        type: 'ERC721_Revoked',
        title: 'Revoked',
        args: parsed.args,
        address: parsed.args[0],
        customInfo: arg,
      };
    } else {
      return {
        type: 'ERC721_Approved',
        title: 'Approved',
        args: parsed.args,
        address: parsed.args[0],
        customInfo: arg,
      };
    }
  },
  // safeTransferFrom (ERC1155)
  '0xf242432a': (arg: TranslationArgs) => {
    // Transfer {amount} of {token image}{contract name}{(token symbol)}
    const { data } = arg;
    const parsed = ERC1155_INTERFACE.parseTransaction({ data });
    const value = parsed.args[3].toString();
    if (parsed.args[1] === Zero) {
      return {
        type: 'ERC1155_Burn',
        title: 'Burn',
        args: parsed.args,
        value,
        address: parsed.args[0],
        customInfo: arg,
      };
    } else {
      return {
        type: 'ERC1155_SafeTransferFrom',
        title: 'Transfer',
        args: parsed.args,
        value,
        address: parsed.args[0],
        customInfo: arg,
      };
    }
  },
  // safeBatchTransferFrom (ERC1155)
  '0x2eb2c2d6': (arg: TranslationArgs) => {
    // Transfer {amount} of {token image}{contract name}{(token symbol)}
    const { data } = arg;
    const parsed = ERC1155_INTERFACE.parseTransaction({ data });
    const value = parsed.args[3]
      .reduce((a: BigNumber, b: BigNumber) => a.add(b), BigNumber.from('0'))
      .toString();
    if (parsed.args[1] === Zero) {
      return {
        type: 'ERC1155_BatchBurn',
        title: 'Burn',
        args: parsed.args,
        value,
        customInfo: arg,
      };
    } else if (parsed.args[2] === Zero) {
      return {
        type: 'ERC1155_BatchMint',
        title: 'Mint',
        args: parsed.args,
        value,
        customInfo: arg,
      };
    }
    return {
      type: 'ERC1155_SafeBatchTransferFrom',
      title: 'Transfer',
      args: parsed.args,
      value,
      customInfo: arg,
    };
  },
};
const EventTranslate: TranslationEvent = {
  // Approval (ERC20)
  '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925': (
    arg: EventList,
  ) => {
    const { icon, symbol, decimals, name } = arg;
    const methodId = '0x095ea7b3';
    const eTransaction: TranslationArgs = {
      data: methodId + arg.topics[1].substring(2) + arg.data.substring(2), // spender, value
      icon,
      symbol,
      decimals,
      name,
    };
    return ActionTranslate[methodId](eTransaction);
  },
  // Transfer (ERC20,ERC721)
  '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef': (
    arg: EventList,
  ) => {
    const methodId = '0x23b872dd';
    let eTransaction: TranslationArgs = {
      data: '',
    };
    // ERC721
    if (arg.data === '0x') {
      // Mint
      if (
        arg.topics[1] ===
        '0x0000000000000000000000000000000000000000000000000000000000000000'
      ) {
        return {
          type: 'ERC721_Mint',
          title: 'Mint',
          args: [arg.topics[2], arg.topics[3]], // to, tokenId
          value: '1',
          customInfo: arg,
        };
      }
      // transferFrom
      else {
        eTransaction.decimals = 0;
        if (
          arg.topics[2] ===
          '0x0000000000000000000000000000000000000000000000000000000000000000'
        ) {
          eTransaction.data =
            methodId +
            arg.topics[1].substring(2) +
            arg.topics[2].substring(2) +
            '0000000000000000000000000000000000000000000000000000000000000001'; // from, to, amount (ERC721 can only transfer 1)
        } else {
          eTransaction.data =
            methodId +
            arg.topics[1].substring(2) +
            arg.topics[2].substring(2) +
            '0000000000000000000000000000000000000000000000000000000000000001';
        }
      }
    }
    // ERC20
    else {
      eTransaction.data =
        methodId +
        arg.topics[1].substring(2) +
        arg.topics[2].substring(2) +
        arg.data.substring(2); // from, to, value
    }
    return ActionTranslate[methodId](eTransaction);
  },
  // ApprovalForAll (ERC721, 1155)
  '0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31': (
    arg: EventList,
  ) => {
    const parsed = ERC1155_INTERFACE.parseLog(arg);
    if (parsed.args[2] === false) {
      return {
        type: 'ERC721_Revoked',
        title: 'Revoked',
        args: parsed.args,
        address: parsed.args[0],
        customInfo: arg,
      };
    } else {
      return {
        type: 'ERC721_Approved',
        title: 'Approved',
        args: parsed.args,
        address: parsed.args[0],
        customInfo: arg,
      };
    }
  },
  // TransferSingle (ERC1155)
  '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62': (
    arg: EventList,
  ) => {
    const parsed = ERC1155_INTERFACE.parseLog(arg);
    let value;
    if (Array.isArray(parsed.args[4])) {
      value = parsed.args[4]
        .reduce((a: BigNumber, b: BigNumber) => a.add(b), BigNumber.from('0'))
        .toString();
    } else {
      value = parsed.args[4].toString();
    }

    return {
      type: 'ERC1155_Transfer',
      title: 'TransferSingle',
      args: parsed.args,
      value,
      customInfo: arg,
    };
  },
  // TransferBatch (ERC1155)
  '0x4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb': (
    arg: EventList,
  ) => {
    const parsed = ERC1155_INTERFACE.parseLog(arg);
    const value = parsed.args[4]
      .reduce((a: BigNumber, b: BigNumber) => a.add(b), BigNumber.from('0'))
      .toString();
    if (parsed.args[2] === Zero) {
      return {
        type: 'ERC1155_BatchBurn',
        title: 'Burn',
        args: parsed.args,
        value,
        customInfo: arg,
      };
    } else if (parsed.args[1] === Zero) {
      return {
        type: 'ERC1155_BatchMint',
        title: 'Mint',
        args: parsed.args,
        value,
        customInfo: arg,
      };
    }
    return {
      type: 'ERC1155_SafeBatchTransferFrom',
      title: 'Transfer',
      args: parsed.args,
      value,
      customInfo: arg,
    };
  },
};
function isObjectAndNotEmpty(obj) {
  return (
    obj !== null &&
    typeof obj === 'object' &&
    !Array.isArray(obj) &&
    Object.keys(obj).length > 0
  );
}

export const decodeData = (
  transaction: TranslationArgs,
  event?: EventList[],
  customInfo?: CustomInfo,
  customUI?: MultiAction,
) => {
  if (!isObjectAndNotEmpty(transaction)) return;
  let result;
  let content;
  let eventContent: any = [];
  const methodId: string = transaction.data.slice(0, 10);

  if (ActionTranslate[methodId]) {
    result = ActionTranslate[methodId]({ ...customInfo, ...transaction });
    const actionType: string = result.type;

    if (actionType && customUI && customUI[actionType]) {
      const customResult = customUI[actionType](result);
      content = customResult;
    }
  }

  // const eventResult: ReturnType[] = [];
  if (event) {
    event.forEach((e: EventList) => {
      const evnetHash = e.topics[0];
      if (customUI && EventTranslate[evnetHash]) {
        const eResult = EventTranslate[evnetHash]({ ...customInfo, ...e });
        const actionType: string = eResult.type;
        eventContent.push(customUI[actionType](eResult));
      }
    });
  }

  return {
    args: result && result.args,
    content,
    // event: eventResult,
    eventContent,
  };
};

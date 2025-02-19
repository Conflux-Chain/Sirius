import { PromiseType } from 'react-use/lib/util';
import { appendApiPrefix } from './api';
import { publishRequestError /*, processENSInfo */ } from './index';

type FetchWithAbortType = Partial<PromiseType<any>> & {
  abort?: () => void;
};

type NotifyType = {
  code: number;
  message?: string;
};

// 暂存默认 window fetch
const windowFetch = window.fetch;
// 默认的请求超时时间 60s
const TIMEOUT_TIMESTAMP = 60000;

// 检查 http status
const checkStatus = response => {
  if (
    (response.status >= 200 && response.status < 300) ||
    response.status === 600
  ) {
    return response;
  } else {
    publishRequestError(
      {
        url: response.url,
        code: response.status,
        message: response.statusText,
      },
      'http',
    );
    const error: Partial<ErrorEvent> & {
      response?: ResponseType;
    } = new Error(response.statusText);
    error.response = response;
    throw error;
  }
};

// 格式化 response data
const parseJSON = async function (response) {
  const contentType = response.headers.get('content-type');
  try {
    if (contentType.includes('application/json')) {
      const data = await response.json();

      return { data, response };
    } else if (contentType.includes('text/html')) {
      return { data: await response.text(), response };
    } else {
      // contentType 还有其他类型，目前项目中用不到
      // 不能简单的报错，比如 image/x-icon 是 favicon 请求
      // 此处直接返回 response，由业务代码处理其他类型的数据
      return { data: response, response };
    }
  } catch (error) {
    if ((error as any).name === 'AbortError') {
      return { data: response, response };
    }
    publishRequestError({ url: response.url, code: 20001 }, 'http');
    (error as any).response = response;
    throw error;
  }
};

// 检查返回值中是否包含错误
const checkResponse = function (url, { data, response }, opts) {
  // 兼容 data.status 和 data.result, 是关于 espace 的数据结构
  if (response.status === 200 && (data.status === '1' || data.code === 0)) {
    return data.result || data.data;
  } else if (/HEAD/i.test(opts?.method)) {
    // handle of HEAD method
    return response;
  } else {
    const code = Number(data.code);
    publishRequestError({ url, code: code, message: data.message }, 'http');
    const error: Partial<ErrorEvent> & {
      response?: ResponseType;
    } = new Error(data.message);
    error.response = data;
    throw error;
  }
};

// 添加请求超时功能
const fetchWithTimeout = (url, { timeout: timestamp, ...opts }) => {
  return new Promise((resolve, reject) => {
    var timeout = setTimeout(() => {
      publishRequestError({ url, code: 20002 }, 'http');
      reject(new Error('fetch timeout'));
    }, timestamp || TIMEOUT_TIMESTAMP);
    windowFetch(url, opts)
      .then(response => {
        clearTimeout(timeout);
        resolve(response);
      })
      .catch(error => {
        clearTimeout(timeout);
        reject(error);
      });
  });
};

// 添加请求中断
const fetchWithAbort = (url, opts) => {
  return new Promise((resolve, reject) => {
    const abortPromise = () => {
      publishRequestError({ url, code: 20003 }, 'http');
      reject(new Error('fetch abort'));
    };
    const p: FetchWithAbortType = fetchWithTimeout(url, opts).then(
      resolve,
      reject,
    );
    p.abort = abortPromise;
    return p;
  });
};
const fetch = (url, opts = {}) => {
  return fetchWithAbort(url, opts)
    .then(checkStatus)
    .then(parseJSON)
    .then((...args) => checkResponse(url, ...args, opts))
    .catch(error => {
      // @ts-ignore
      if (/HEAD/i.test(opts?.method)) {
        return {};
      }
      // 添加错误请求日志输出，或者收集统计信息

      // A fetch() promise will reject with a TypeError when a network error is encountered or CORS is misconfigured on the server-side,
      // although this usually means permission issues or similar — a 404 does not constitute a network error, for example.
      // For detail: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
      if (error.name === 'TypeError') {
        publishRequestError({ url, code: 20004 }, 'http');
      }
      throw error;
    });
};

export default fetch;

export const fetchWithPrefix = (url, opts?) => {
  return fetch(appendApiPrefix(url), opts);
};

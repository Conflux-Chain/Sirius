import { PromiseType } from 'react-use/lib/util';
import pubsub from 'utils/pubsub';

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

// 只有在此列表内的后端错误需要 Notification 提示，其他的会在业务代码里处理
const BACKEND_ERROR_CODE_BLACKLIST = [10001];

// 异常消息发布
const notify = ({ code, message }: NotifyType) => {
  pubsub.publish('notify', {
    code,
    message,
  });
};

// 检查 http status
const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    notify({
      code: response.status,
      message: response.statusText,
    });
    const error: Partial<ErrorEvent> & {
      response?: ResponseType;
    } = new Error(response.statusText);
    error.response = response;
    throw error;
  }
};

// 格式化 response data
const parseJSON = response => {
  const contentType = response.headers.get('content-type');
  try {
    if (contentType.includes('application/json')) {
      return response.json();
    } else if (contentType.includes('text/html')) {
      return response.text();
    } else {
      // contentType 还有其他类型，目前项目中用不到，后续按照需求在此处再添加
      throw new Error(`Sorry, content-type ${contentType} not supported`);
    }
  } catch (error) {
    notify({
      code: 20001,
    });
    error.response = response;
    throw error;
  }
};

// 检查返回值中是否包含错误
const checkResponse = data => {
  const code = Number(data?.code);
  // 只过滤黑名单中的，其他的错误透传到业务代码中处理
  if (BACKEND_ERROR_CODE_BLACKLIST.includes(code)) {
    notify({
      code: code,
      message: data.message,
    });
    const error: Partial<ErrorEvent> & {
      response?: ResponseType;
    } = new Error(data.message);
    error.response = data;
    throw error;
  }
  return data;
};

// 添加请求超时功能
const fetchWithTimeout = (url, { timeout: timestamp, ...opts }) => {
  return new Promise((resolve, reject) => {
    var timeout = setTimeout(() => {
      notify({
        code: 20002,
      });
      reject(new Error('fetch timeout'));
    }, timestamp || TIMEOUT_TIMESTAMP);
    windowFetch(url, opts).then(
      response => {
        clearTimeout(timeout);
        resolve(response);
      },
      error => {
        clearTimeout(timeout);
        reject(error);
      },
    );
  });
};

// 添加请求中断
const fetchWithAbort = (url, opts) => {
  return new Promise((resolve, reject) => {
    const abortPromise = () => {
      notify({
        code: 20003,
      });
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
    .then(checkResponse)
    .catch(error => {
      // 添加错误请求日志输出，或者收集统计信息
      throw error;
    });
};

window.fetch = fetch;
export default fetch;

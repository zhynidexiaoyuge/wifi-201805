import axios from 'axios';

const WITH_REQUEST_BODY = 0x01;
const WITHOUT_REQUEST_BODY = 0x02;

const isLegalMethod = function (method) {
  const map = {
    'get': WITHOUT_REQUEST_BODY,
    'delete': WITHOUT_REQUEST_BODY,
    'head': WITHOUT_REQUEST_BODY,
    'options': WITHOUT_REQUEST_BODY,
    'post': WITH_REQUEST_BODY,
    'put': WITH_REQUEST_BODY,
    'patch': WITH_REQUEST_BODY
  };
  return map[method.toLowerCase()];
};

class ArrayCallee extends Array {
  call() {
  }

  apply() {
  }
}

/**
 * API对象。
 * @author Molay
 */
class Api {
  constructor(option, baseOption) {
    if (!option || !baseOption)
      throw new Error('API定义必须有合法的配置。');

    let me = this;
    me._option = option;
    me._baseOption = baseOption;

    let url = option.url;
    if (!url)
      throw new Error('请求地址不合法。');
    // if (!/^\w+:\/\//.test(url)) {
    //   let baseUrl = baseOption.baseUrl || '';
    //   url = baseUrl + '/' + option.url;
    // }
    me._url = url;

    let method = option.method || 'get';
    let methodFlag = isLegalMethod(method);
    if (!methodFlag)
      throw new Error('请求方法' + method + '不合法。');
    me._method = method;
    me._methodFlag = methodFlag;

    // let aspect = option.aspect;
  }

  _option = undefined;
  _baseOption = undefined;

  _url = undefined;
  _method = undefined;
  _methodFlag = undefined;

  send(data) {
    let xhr = undefined;
    let cancel = undefined;
    let cancelled = false;
    let listThen = new ArrayCallee();
    let listCatch = new ArrayCallee();
    let listProgress = new ArrayCallee();

    let token = {
      then: function (executor) {
        listThen.push(executor);
        return this;
      },
      catch: function (executor) {
        listCatch.push(executor);
        return this;
      },
      progress: function (executor) {
        listProgress.push(executor);
        return this;
      },
      cancel: function () {
        cancelled = true;
        if (xhr) xhr.abort();
        else if (cancel) cancel();
        return this;
      }
    };

    let me = this;
    let option = me._option;
    let baseOption = me._baseOption;
    let simulation = baseOption.simulation || option.simulation;
    if (!simulation) {
      let config = {
        baseURL: option.baseUrl || baseOption.baseUrl || '',
        url: me._url,
        method: me._method,
        responseType: option.responseType || baseOption.responseType || 'json',
        onDownloadProgress: function (event) {
          if (!xhr) xhr = event.target;
          if (cancelled) return xhr.abort();
          listProgress.forEach(method => {
            method.call(null, event, xhr);
          });
        },
        cancelToken: new axios.CancelToken(function (c) {
          cancel = c;
        })
      };
      if (me._methodFlag === WITH_REQUEST_BODY)
        config.data = data;
      else
        config.params = data;

      axios(config)
        .then(response => {
          if (cancelled) return;
          listThen.forEach(method => {
            method.call(null, response.data, response);
          });
        })
        .catch(error => {
          if (cancelled) return;
          listCatch.forEach(method => {
            method.call(null, error);
          });
        });
    }
    else {
      let simulator = option.simulator;
      let simulatorType = typeof simulator;
      if (simulatorType === 'string') {
        axios({url: simulator})
          .then(response => {
            if (cancelled) return;
            listThen.forEach(method => {
              method.call(null, response.data, response);
            });
          })
          .catch(error => {
            if (cancelled) return;
            listCatch.forEach(method => {
              method.call(null, error);
            });
          });
      }
      else if (simulatorType === 'function') {
        new Promise(function (resolve, reject) {
          let result = simulator(option, data);
          let response = {
            data: result,
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {},
            get request() {
              return xhr;
            }
          };
          resolve(response);
        }).then(function (response) {
          if (cancelled) return;
          listThen.forEach(method => {
            method.call(null, response.data, response);
          });
        });
      }
    }

    return token;
  }
}

/**
 * API构建器，用以创建具备一定统一规则的API对象。
 * @author Molay
 */

class ApiBuilder {
  constructor(baseOption) {
    let me = this;
    me._baseOption = baseOption;
    me._defaultGroup = {name: 'default', apis: []};
    me._groups = {
      'default': me._defaultGroup
    };
  }

  _baseOption = undefined;
  _defaultGroup = undefined;
  _groups = undefined;

  build(option) {
    let api = new Api(option, this._baseOption);
    this._defaultGroup.apis.push(api);
    return api;
  }
  group(name) {
    let me = this;
    return {
      build(option) {
        let group = me._groups[name];
        if (!group)
          me._groups[name] = group = {name: name, apis: []};
        let api = new Api(option, this._baseOption);
        group.apis.push(api);
        return api;
      }
    }
  }
}

export default ApiBuilder;

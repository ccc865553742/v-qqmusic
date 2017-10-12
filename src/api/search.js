// import axios from 'axios';
import jsonp from '../common/js/jsonp';
import { commonParams, options } from './config';


export function search(w, p = 1) {
  const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp';

  const data = Object.assign({}, {
    uin: 0,
    platform: 'h5',
    needNewCode: 1,
    w,
    zhidaqu: 1,
    catZhida: 1,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    perpage: 20,
    n: 20,
    p,
  });

  return jsonp(url, data, options);
}

export function getHotkey() {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg';

  const data = Object.assign({}, commonParams, {
    uin: 0,
    platform: 'h5',
  });

  return jsonp(url, data, options);
}

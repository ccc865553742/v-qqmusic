import jsonp from '../common/js/jsonp';
import { commonParams, options } from './config';

export default function getSingerList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg';

  const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    // jsonpCallback: 'GetSingerListCallback',
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0,
  });

  return jsonp(url, data, options);
}

export function getSingerDetail(singerid) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg';

  const data = Object.assign({}, commonParams, {
    order: 'listen',
    begin: 0,
    num: 80,
    singermid: singerid,
    notice: 0,
    platform: 'yqq',
    needNewCode: 1,
    from: 'h5',
  });

  return jsonp(url, data, options);
}

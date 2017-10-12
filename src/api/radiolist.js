import jsonp from '../common/js/jsonp';
import { commonParams, options } from './config';

export default function getRadioList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_radiolist.fcg';

  const data = Object.assign({}, commonParams, {
    channel: 'radio',
    page: 'index',
    tpl: 'wk',
    new: 1,
    p: Math.random(),
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0,
  });

  return jsonp(url, data, options);
}

import jsonp from '../common/js/jsonp';
import { commonParams, options } from './config';


export default function getMvListInfo() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/getmv_by_tag';

  const data = Object.assign({}, commonParams, {
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0,
    utf8: 1,
    type: 2,
    year: 0,
    area: 0,
    tag: 0,
    pageno: 0,
    pagecount: 20,
    otype: 'json',
    taglist: 1,
  });

  return jsonp(url, data, options);
}

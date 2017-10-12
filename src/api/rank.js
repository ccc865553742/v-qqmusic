import jsonp from '../common/js/jsonp';
import { options, commonParams } from './config';

export default function slider() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';

  const data = Object.assign({}, commonParams, {
    g_tk: 1980214582,
    uin: 0,
    notice: 0,
    platform: 'h5',
    needNewCode: 1,
  });

  return jsonp(url, data, options);
}

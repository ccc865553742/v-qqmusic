import jsonp from '../common/js/jsonp';
// import axios from 'axios';
import { commonParams, options } from './config';

export function getPlayList(disstid) {
  // const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg';
  const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg';
  console.log(disstid);
  const data = Object.assign({}, {
    g_tk: 5381,
    uin: 0,
    notice: 0,
    platform: 'h5',
    needNewCode: 1,
    new_format: 1,
    pic: 500,
    disstid: 3482605622,
    type: 1,
    json: 1,
    utf8: 1,
    format: 'json',
    onlysong: 0,
    nosign: 1,
    _: 1506612949111,
    inCharset: 'utf-8',
    outCharset: 'utf-8',
  });

  return jsonp(url, data, options);
}

export function a() {
  // const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg';
  // const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg';
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_similar_recomm.fcg';
  // console.log(disstid);
  const data = Object.assign({}, commonParams, {
    recomtype: 2,
    dissid: 2040362185,
    maxnum: 6,
    loginUin: 0,
    hostUin: 0,
    format: 'jsonp',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0,
  });

  return jsonp(url, data, options);
}

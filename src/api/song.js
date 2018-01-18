import axios from "axios";
import { options, commonParams } from "./config";
// import jsonp from '../common/js/jsonp';

export function getMusicBasis(mid) {
  const t = new Date().getUTCMilliseconds();
  const guid = (Math.round(2147483647 * Math.random()) * t) % 1e10;
  const data = Object.assign(
    {},
    commonParams,
    {
      loginUin: 0,
      hostUin: 0,
      notice: 0,
      platform: "yqq",
      needNewCode: 0,
      cid: 205361747,
      uin: 0,
      songmid: mid,
      filename: `C400${mid}.m4a`,
      guid
    },
    options
  );
  const url = "/api/getmusicBasis";
  return axios
    .get(url, { params: data })
    .then(res => Promise.resolve({ data: res.data, guid }));
}

export function getLyric(mid) {
  const url = "api/lyric";
  // console.log(mid);
  const data = Object.assign({}, commonParams, {
    songmid: mid,
    platform: "yqq",
    hostUin: 0,
    needNewCode: 0,
    categoryId: 10000000,
    pcachetime: +new Date(),
    format: "json"
  });
  return axios
    .get(url, {
      params: data
    })
    .then(res => Promise.resolve(res.data));
}

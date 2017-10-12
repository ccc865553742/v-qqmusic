/* eslint-disable guard-for-in,no-restricted-syntax */
import originJsonp from 'jsonp';

export function param(data, url = '') {
  // let url = '';
  for (const k in data) {
    const value = data[k] !== 'underfinded' ? data[k] : '';
    url += `&${k}=${encodeURIComponent(value)}`;
  }
  return url ? url.substring(1) : '';
}

export default function jsonp(url, data, option) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data);
  return new Promise((resolve, reject) => {
    originJsonp(url, option, (err, res) => {
      if (!err) {
        resolve(res);
      } else {
        reject(err);
      }
    });
  });
}

import { Base64 } from 'js-base64';
import { getLyric, getMusicBasis } from "../../api/song";
import { ERR_OK } from '../../api/config';
// import { getMusicBasis } from '../../api/song';

export default class Song {
  constructor({ id, mid, singer, name, album, duration, image, url }) {
    this.id = id;
    this.mid = mid;
    this.singer = singer;
    this.name = name;
    this.album = album;
    this.duration = duration;
    this.image = image;
    this.url = url;
  }

  getLyric() {
    // console.log('lyric aaaaaaaaaaaaaaaaaaaaaaaaa');
    if (this.lyric) {
      return Promise.resolve(this.lyric);
    }
    // console.log('lyric bbbbbbbbbbbbbbbbbbb');
    return new Promise((resolve, reject) => {
      // console.log('lyric cccccccccccccccc');
      getLyric(this.mid).then((res) => {
        // console.log('lyric ddddddddddddd');
        if (res.retcode === ERR_OK) {
          this.lyric = Base64.decode(res.lyric);
          resolve(this.lyric);
        } else {
          reject('no lyric');
        }
      });
    });
  }
}

function filterSinger(singer) {
  const ret = [];
  if (!singer) {
    return '';
  }
  singer.forEach((s) => {
    ret.push(s.name);
  });
  return ret.join('/');
}

export async function createSong(musicData) {
  // console.log(musicData);
  const data = (await getMusicBasis(musicData.songmid));
  const music = data.data.data.items[0];
  console.log(music);
  const guid = data.guid;
  // console.log(music);
  // console.log(music, 'music');
  // http://dl.stream.qqmusic.qq.com/C400000YU69H3N55rZ.m4a?vkey=927C721D272189FED484EF874A8D646C6B13C20C53277FB99D496DA6804CDF1B64C33A4F049D24FFC4366605DB4755A6E9AB632AA770C09A&guid=328569683&uin=0&fromtag=66
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${
      musicData.albummid
    }.jpg?max_age=2592000`,
    url: `http://dl.stream.qqmusic.qq.com/${music.filename}?vkey=${music.vkey}&guid=${guid}&uin=0&fromtag=999`
  });
}

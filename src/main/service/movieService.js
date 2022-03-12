import sequelize from "@main/db";
import Sequelize from 'sequelize';
import uuid from 'node-uuid';
const cheerio = require('cheerio');
const request = require('request');
const Op = Sequelize.Op;

const movieModel = sequelize.model('movieModel');

class MovieService {
  static async crawler() {
    const url = 'http://www.yue365.com';
    const req = (url) => {
      return new Promise((resolve, reject) => {
        request({ url, gzip: true }, (err, response, body) => {
          if (err) {
            reject(err)
          }
          resolve(response, body);
        })
      })
    }
    const { response, body } = await req('http://www.yue365.com/movie/list/kehuan/index_3.shtml');
    const $ = cheerio.load(body);
    const text = $.html('.nav li a');
    const rex = /<a href="(.*?)" title="(.*?)" target="(.*?)"><img alt="(.*?)" src="(.*?)"><\/a>/igs;
    let movieData;
    const movieArr = [];
    while ((movieData = rex.exec(text)) !== null) {
      const obj = {
        movieUrl: movieData[1],
        movieName: movieData[2].split('剧情介绍')[0],
        movieImg: movieData[5],
      }
      movieArr.push(obj);
    }
    const x = movieArr.map((item, index) => {
      return new Promise((resolve, reject) => {
        request({ url: url + item.movieUrl }, (err, response, body) => {
          const movieText = cheerio.load(body).html();
          const typeText = cheerio.load(body).html('.pindao_xg a');
          const introduceRex = /<span class="dsjjj-s">(.*?)<\/span>/igs;
          const releaseDateRex = /<div class="sy"><span><a target="(.*?)" title="(.*?)" href="(.*?)">上映时间<\/a>：<\/span>(.*?)<\/div>/igs;
          const typeRex = /<a title="(.*?)" target="(.*?)" href="(.*?)">(.*?)<\/a>/igs;
          let introduce;
          let releaseDate;
          let type;
          while ((introduce = introduceRex.exec(movieText)) !== null) {
            item.movieIntroduce = introduce[1];
          }
          while ((releaseDate = releaseDateRex.exec(movieText)) !== null) {
            item.movieReleaseDate = releaseDate[4];
          }
          while ((type = typeRex.exec(typeText)) !== null) {
            item.movieType = item.movieType ? item.movieType + ',' + type[4] : type[4];
          }
          resolve();
        })
      })
    })
    let answer = [];
    Promise.all(x).then(() => {
      movieArr.forEach(async (item, index) => {
        try {
          const result = await movieModel.create(Object.assign(item,{id:uuid.v1()}));
          answer.push(result)
        } catch (error) {
          answer.push(error);
        }
      })
    }).catch((err) => {
      console.log(err)
    })
    setTimeout(() => {
      return answer;
    },0)
    
  }

  static async findAll() {
    return await movieModel.findAll();
  }
}

export default MovieService;
require("dotenv").config();
const axios = require("axios")
const db = require('../database/database')
const URL = 'http://ws.audioscrobbler.com/2.0/'
const record = db.record
const Op = require('Sequelize').Op


const getInfo = async (req, res) => {
const {album, artist} = req.body
if(!album || !artist) res.status(500).send('You must send album & artist')
 try { 
    const response = await axios.get(`${URL}/?method=album.getinfo&api_key=${process.env.API_KEY}&artist=${artist}&album=${album}&format=json`)
    if(response){
        res.send(response.data)
    }
} catch (error) {

    res.status(404).send([ ])
}


}

const getDbInfo = async (req, res) => {
    const {album, artist} = req.body
    try {
         let findRecordDb = await record.findOne({
        where:{
            [Op.and]: {
                album:
                    {
                        [Op.eq]: album
                    },

                artist: {
                    [Op.eq]: artist
                }
            }
        }
    })
    
     res.status(201).json(findRecordDb)
    } catch (error) {
        res.status(404).send('You must create the record')
    }
   

     

}

const postInfo = async (req, res) => {
const {img_url, album, artist, year} = req.body

if(!album || ! artist) res.status(500).send('You must send album & artist')

const data = {
    img_url: img_url,
    album: album,
    artist: artist,
    year: year
}

const body = await record.create(data)
res.send(body)

}

module.exports = {
    getInfo,
    postInfo, 
    getDbInfo
}
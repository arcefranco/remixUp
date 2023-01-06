require("dotenv").config();
import get from "axios";
import db from "../database/database";
const URL = "http://ws.audioscrobbler.com/2.0/";
import { Record } from "../models/Record";
import { Op } from "sequelize";
import { Request, Response } from "express";

export const getInfo = async (req: Request, res: Response) => {
  const { album, artist } = req.body;
  if (!album || !artist) res.status(500).send("You must send album & artist");
  try {
    const response = await get(
      `${URL}/?method=album.getinfo&api_key=${process.env.API_KEY}&artist=${artist}&album=${album}&format=json`
    );
    if (response) {
      res.send(response.data);
    }
  } catch (error) {
    res.status(404).send([]);
  }
};

export const getDbInfo = async (req: Request, res: Response) => {
  const { album, artist } = req.body;
  try {
    let findRecordDb = await Record.findOne({
      where: {
        [Op.and]: {
          album: {
            [Op.eq]: album,
          },

          artist: {
            [Op.eq]: artist,
          },
        },
      },
    });

    res.status(201).json(findRecordDb);
  } catch (error) {
    res.status(404).send("You must create the record");
  }
};

export const postInfo = async (req: Request, res: Response) => {
  const { img_url, album, artist, year } = req.body;

  if (!album || !artist) res.status(500).send("You must send album & artist");

  const data = {
    img_url: img_url,
    album: album,
    artist: artist,
    year: year,
  };

  const body = await Record.create(data);
  res.send(body);
};

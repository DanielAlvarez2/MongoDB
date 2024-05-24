const express = require('express')
const app = express()
const { MongoClient } = require('mongodb')
const dotenv = require('dotenv')
dotenv.config()
const uri = process.env.ATLAS_URI
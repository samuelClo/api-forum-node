import threadRepository from "../repositories/threadRepository.js"
import channelRepository from "../repositories/channelRepository.js"
import {validationError} from "../utils/errors.js"

export const getAllThreads = async (req, res) => {
    const db = req.app.locals.db;
    const allChannels = await threadRepository.find(db)

    res.json({
        "data": allChannels
    })
}

export const createThread = async (req, res) => {
    const db =  req.app.locals.db;
    const {title, body, channel_id } = req.body

    if (!title || !body || !channel_id) return validationError(res)
    
    try {
        
        const channel = await channelRepository.findById(db, {id: channel_id})
        const newThread = await threadRepository.insertOne(db, {title, body, channel})
        
        
        console.log(newThread)
        res.json({
            data: newThread,
            
        })
    } catch (err) {
        console.log(err)
        return validationError(res, 'channel id not valid')
    }
}

import channelRepository from "../repositories/channelRepository.js"

export const getAllChannels = async (req, res) => {
    const db = req.app.locals.db;
    const allChannels = await channelRepository.find(db)
    console.log(allChannels)
    res.json({
        "data": allChannels
    })
}

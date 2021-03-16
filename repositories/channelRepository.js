const channelRepository = {
    find: async (db) => {
        const channels = await db.collection('Channels').find({}).toArray()
        console.log(channels)
        return channels
    },
}

export default channelRepository

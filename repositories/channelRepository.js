import pkg from 'mongodb';
const { ObjectId } = pkg;


const channelRepository = {
    find: async (db) => {
        const channels = await db.collection('Channels').find({}).toArray()
        
        return channels
    },
    findById: async (db, {id}) => {
        const channel = await db.collection('Channels').findOne({_id: ObjectId(id)})

        return channel
    },
}

export default channelRepository

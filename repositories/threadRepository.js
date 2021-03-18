import slug from "../utils/slug.js"

const threadRepository = {
    find: async (db) => {
        const threads = await db.collection('Thread').find({}).toArray()

        return threads
    },
    insertOne: async (db, {title, body, channel}) => {
        const thread = await db.collection('Thread').insertOne({
            title,
            body,
            slug: slug(title),
            channel: {
                data: {
                    ...channel
                }
            }
        })

        return thread.ops[0]
    },
}

export default threadRepository

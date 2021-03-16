import {hashPassword} from '../utils/password.js'

const userRepository = {
    find: async (db) => {
        const users = await db.collection('Users').find({}).toArray()

        return users
    },
    getUserByEmail: async (db, email) => {
        const user = await db.collection('Users').findOne({email})
        
        return user
    },
    insertUser: async (db, {email, password, name}) => {
        const user = await db.collection('Users').insertOne({
            email,
            name,
            password: await hashPassword(password)
        })

        return user.ops[0]
    }
}

export default userRepository

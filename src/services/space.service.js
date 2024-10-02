import { collection, query, where, getDocs, or, and, addDoc, getDoc, updateDoc } from 'firebase/firestore'

import ResponseTrait from '@/core/responseTrait'
import RedisClient from '@/core/redisCache.config'
import { db } from '@/core/firebase.config'
import { generateCode } from '@/core/helper'
import { SPACE_STATUS_DELETED } from '@/enums/SpaceStatusEnum'
import { spaceCacheKey, spaceKey } from '@/models/space.model'

const SpaceService = {
    get: async (params) => {
        const { key } = params

        const cacheKey = spaceCacheKey.replace(':code', key)
        let resData = await RedisClient.get(cacheKey)
        if (resData) return ResponseTrait.success(resData)

        const docRef = collection(db, 'space')
        const docQuery = query(docRef, where('code', '==', key))
        const docSnap = await getDocs(docQuery)

        if (docSnap.empty) return ResponseTrait.error('No such Space!')

        resData = docSnap.docs[0].data()
        await RedisClient.set(spaceCacheKey.replace(':code', resData.code), resData)

        return ResponseTrait.success(resData)
    },
    search: async (params) => {
        const { q, user_code, status } = params

        const docRef = collection(db, 'space')
        let docQuery = query(docRef)

        if (q && q.trim().length > 0) {
            const attrs = ['code', 'name', 'description']

            docQuery = query(docQuery, or(...attrs.map((a) => and(where(a, '>=', q), where(a, '<=', q + '\uf8ff')))))
        }

        if (user_code) docQuery = query(docQuery, where('user_code', '==', user_code))

        if (status && status.length > 0) {
            docQuery = query(docQuery, where('status', 'in', status))
        }

        const docSnap = await getDocs(docQuery)
        const resData = docSnap.docs.map((doc) => doc.data())

        return ResponseTrait.success(resData)
    },
    store: async (params) => {
        const { name } = params

        const dateNow = new Date()
        params.code = generateCode(spaceKey, dateNow, name)

        const spaceRef = collection(db, 'space')
        const spaceDoc = await addDoc(spaceRef, {
            ...params,
            // status: SPACE_STATUS_PENDING,
            created_at: dateNow
        })

        const resData = (await getDoc(spaceDoc)).data()
        await RedisClient.set(spaceCacheKey.replace(':code', resData.code), resData)

        return ResponseTrait.success(resData)
    },
    update: async (params) => {
        const { key } = params

        const docRef = collection(db, 'space')
        const docQuery = query(docRef, where('code', '==', key))
        const docSnap = await getDocs(docQuery)

        if (docSnap.empty) return ResponseTrait.error('No such Space!')

        delete params.key
        await updateDoc(docSnap.docs[0].ref, {
            ...params,
            updated_at: new Date()
        })

        const resData = (await getDoc(docSnap.docs[0].ref)).data()
        await RedisClient.set(spaceCacheKey.replace(':code', resData.code), resData)

        return ResponseTrait.success(resData)
    },
    destroy: async (params) => {
        const { key } = params

        const docRef = collection(db, 'space')
        const docQuery = query(docRef, where('code', '==', key))
        const docSnap = await getDocs(docQuery)

        if (docSnap.empty) return ResponseTrait.error('No such Space!')

        await updateDoc(docSnap.docs[0].ref, {
            status: SPACE_STATUS_DELETED,
            updated_at: new Date(),
            deleted_at: new Date()
        })

        const resData = (await getDoc(docSnap.docs[0].ref)).data()
        await RedisClient.set(spaceCacheKey.replace(':code', resData.code), resData)

        return ResponseTrait.success(resData)
    }
}

const SpaceMemberService = {
    search: async (params) => {
        const { key, q } = params

        const cacheKey = spaceCacheKey.replace(':code', key)
        let entData = null

        if (!entData) {
            const docRef = collection(db, 'space')
            const docQuery = query(docRef, where('code', '==', key))
            const docSnap = await getDocs(docQuery)

            if (docSnap.empty) {
                return ResponseTrait.error('No such Space')
            }

            entData = docSnap.docs[0].data()
        }

        const memberCodes = entData.memberCodes

        if (!memberCodes) return ResponseTrait.error('The Space dont have any members')

        const docRef = collection(db, 'user_info')
        let docQuery = query(docRef, where('code', 'in', memberCodes))

        if (q && q.trim().length > 0) {
            const attrs = ['code', 'name', 'description']

            docQuery = query(docQuery, or(...attrs.map((a) => and(where(a, '>=', q), where(a, '<=', q + '\uf8ff')))))
        }

        const memberSnap = await getDocs(docQuery)

        const resData = memberSnap.docs.map((doc) => doc.data())

        return ResponseTrait.success(resData)
    },
    update: async (params) => {
        const { key, members, teams } = params

        const docRef = collection(db, 'space')
        const docQuery = query(docRef, where('code', '==', key))
        const docSnap = await getDocs(docQuery)

        if (docSnap.empty) {
            return ResponseTrait.error('No such Space!')
        }

        const memberCodes = members?.map((m) => m.code)
        const teamCodes = teams?.map((m) => m.code)

        const resData = await updateDoc(docSnap.docs[0].ref, {
            members: members,
            teams: teams,
            member_codes: memberCodes,
            team_codes: teamCodes
        })

        return ResponseTrait.success(resData)
    }
}

export default SpaceService

export { SpaceMemberService }

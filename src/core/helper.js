import { commentKey } from "@/models/comment.model";
import { milestoneCacheKey, milestoneKey } from "@/models/milestone.model";
import { projectCacheKey, projectKey } from "@/models/project.model";
import { spaceCacheKey, spaceKey } from "@/models/space.model";
import { taskCacheKey, taskKey } from "@/models/task.model";
import { teamKey } from "@/models/team.model";

const splitArr = (arr, char, attr) => {
    return arr.split(char)
}

const simpleHashStringToNumber = (str) => {
    let hash = 0;
    
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    
    return Math.abs(hash); // Return positive number
}

const deleteKeysFromObject = (obj, keys) => {
    if(!keys && keys.length <= 0) return obj;

    keys.map(k => {
        delete obj[k]
    })

    return obj
}


//-----------------------------------------------------------
const tableCode = {
    [spaceKey]: 'SPA_',
    [projectKey]: 'PRJ_',
    [milestoneKey]: 'MST_',
    [taskKey]: 'TSK_',
    [teamKey]: 'TEA_',

    [commentKey]: "CMT_"
}

const generateCode = (type, now, name) => {
    const timeStamp = now.getTime()
    const hash = simpleHashStringToNumber(name)
    const key = tableCode[type]

    return key + timeStamp + "." + hash
}

const tableName = {
    'SPA_': spaceKey,
    'PRJ_': projectKey,
    'MST_': milestoneKey,
    'TSK_': taskKey,
}
const getTableName = (code) => {
    if(!code) return null;

    const tableType = code.substr(0, 4)

    return tableName[tableType] ? tableName[tableType] : null
}

const tableCacheKey = {
    'SPA_': spaceCacheKey,
    'PRJ_': projectCacheKey,
    'MST_': milestoneCacheKey,
    'TSK_': taskCacheKey,
}
const getTableCacheKey = (code) => {
    if(!code) return null;

    const tableType = code.substr(0, 4)

    return tableCacheKey[tableType] ? tableCacheKey[tableType] : null
}

export { generateCode, simpleHashStringToNumber, splitArr, deleteKeysFromObject, getTableCacheKey, getTableName };

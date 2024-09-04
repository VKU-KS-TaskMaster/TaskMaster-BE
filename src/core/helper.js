import { milestoneKey } from "@/models/milestone.model";
import { projectKey } from "@/models/project.model";
import { spaceKey } from "@/models/space.model";

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

const typeTableKey = {
    [spaceKey]: 'SPA_',
    [projectKey]: 'PRJ_',
    [milestoneKey]: 'MST_'
}
const generateCode = (type, now, name) => {
    const timeStamp = now.getTime()
    const hash = simpleHashStringToNumber(name)
    const key = typeTableKey[type]

    return key + timeStamp + "." + hash
}

export { splitArr, simpleHashStringToNumber, generateCode }
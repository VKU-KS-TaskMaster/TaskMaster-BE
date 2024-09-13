import BaseJoi from "joi"
import JoiDate from '@joi/date';

const customExtentions = [
    (joi) => ({
        type: 'stringArray',
        base: joi.array(),
        coerce: (value, state, options) => {
            if (typeof value === 'string') {
                return { value: value.split(',') };
            }
            if (value === null || value === undefined) {
                return { value: undefined };
            }
            return { value };
        }
    })
]

const JoiCustom = BaseJoi.extend(JoiDate, ...customExtentions)

export default JoiCustom
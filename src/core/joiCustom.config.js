import BaseJoi from "joi"
import JoiDate from '@joi/date';

const customExtentions = (joi) => ({
    type: 'stringArray',
    base: joi.array(),
    coerce: (value, helpers) => {
        if (typeof value === 'string') {    
            return { value: value.split(',') };
        }
        return { value };
    }
});

const JoiCustom = BaseJoi.extend(JoiDate, customExtentions)

export default JoiCustom
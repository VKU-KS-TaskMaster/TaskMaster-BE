import BaseJoi from "joi"
import JoiDate from '@joi/date';

const customExtentions = (joi) => ({
    type: 'stringArray',
    base: joi.array(),
    coerce: (value, state, options) => (value.split ? value.split(',') : value)
});

const JoiCustom = BaseJoi.extend(JoiDate, customExtentions)

export default JoiCustom
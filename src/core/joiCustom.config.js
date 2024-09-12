import BaseJoi from "joi"
import JoiDate from '@joi/date';

const customExtentions = (joi) => ({
    type: 'stringArray',
    base: joi.array(),
    rules: {
        splitStr: {
            method(separator) {
                if (separator === undefined || separator === null) {
                    throw new Error('`separator` is required for splitStr');
                }

                return this.$_addRule({ name: 'splitStr', args: { separator } });
            },
            validate(value, helpers, args) {
                if (typeof value !== 'string') {
                    return value;
                }
                return value.split(args.separator);
            }
        }
    }
});

const JoiCustom = BaseJoi.extend(JoiDate, customExtentions)

export default JoiCustom
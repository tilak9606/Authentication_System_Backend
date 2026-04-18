import joi from 'joi';

export class BaseDto {
    static schema = joi.object({});

    static validate(data) {
        const { error, value } = this.schema.validate(data, { abortEarly: false, stripUnknown: true })
        if (error) {
            throw new Error(`Validation error: ${error.details.map(d => d.message).join(', ')}`);
        }
        return {errors: null, value}
    }
}

export default BaseDto;
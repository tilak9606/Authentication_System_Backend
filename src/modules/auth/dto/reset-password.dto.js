import Joi from "joi";
import BaseDto from "../../../common/dto/base.dto.js";

class ResetPasswordDto extends BaseDto {
    static schema = Joi.object({
        password: Joi.string()
            .min(8)
            .required()
            .pattern(
                new RegExp(
                    "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
                ),
            )
            .message(
                "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character",
            ),
    });
}

export default ResetPasswordDto;
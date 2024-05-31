import { mixed, object, string } from "yup";

export namespace UserSchema {
    export const create = object().shape({
        name: string()
            .min(4, "O nome deve possuir no mínimo 4 caracteres.")
            .max(200, "O nome deve possuir no máximo 200 caracteres.")
            .required("Nome é um campo obrigatório."),
        email: string()
            .email("O campo deve ser um e-mail válido.")
            .required("E-mail é um campo obrigatório."),
        password: string()
            .required("Senha é um campo obrigatório.")
            .min(8, "A senha deve possuir no mínimo 8 caracteres.")
            .max(25, "A senha deve possuir no máximo 25 caracteres.")
            .test(
                "password",
                "A senha deve possuir no mínimo 8 caracteres, uma letra minúscula e uma letra maiúscula.",
                (value) => {
                    if (value) {
                        return (
                            value.length >= 8 &&
                            /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$!%*#-_?&]{8,}$/.test(value)
                        );
                    }
                    return true;
                }
            )
    });

    export const update = object({
        name: string()
            .min(4, "O nome deve possuir no mínimo 4 caracteres.")
            .max(200, "O nome deve possuir no máximo 200 caracteres.")
            .optional()
            .default(undefined),
        email: string().email("Forneça um e-mail válido.").optional(),
        password: string()
            .min(8, "A senha deve possuir no mínimo 8 caracteres.")
            .max(25, "A senha deve possuir no máximo 25 caracteres.")
            .test(
                "password",
                "A senha deve possuir no mínimo 8 caracteres, uma letra minúscula e uma letra maiúscula.",
                (value) => {
                    if (value) {
                        if (!value) return true;

                        return (
                            value.length >= 8 &&
                            /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$!%*#-_?&]{8,}$/.test(value)
                        );
                    }
                    return true;
                }
            )
            .notRequired()
    });
}
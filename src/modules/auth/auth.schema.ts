import { object, string } from "yup";

export namespace AuthSchema {
    export const login = object().shape({
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
            ),
    });
}
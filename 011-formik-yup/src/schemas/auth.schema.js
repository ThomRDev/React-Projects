import * as yup from "yup"

// https://stackoverflow.com/questions/1570896/what-does-mean-in-a-regular-expression
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

// https://github.com/nikitapryymak/formik-tutorial/blob/finished-files/src/schemas/index.js
// https://github.com/jquense/yup/issues/211#issuecomment-771578948
export const basicSchema = yup.object().shape({
      email: yup
            .string()
            .typeError("Debe ser una cadena de texto")
            .email("Debe ser un email Valido")
            .required("El email es necesario"),
      age: yup
            .number()
            .typeError("La edad debe de ser un numero")
            .positive("La edad debe de ser positivo")
            .integer("Debe de ser entero")
            .required("El campo edad es necesario"),
      password: yup
            .string()
            .typeError("Debe de ser una cadena de texto")
            .min(5, "Debe de tener al menos 5 caracteres")
            .matches(passwordRules, { message: "Intente otra ves" })
            .required("El password es necesario"),
      confirmPassword: yup
            .string()
            .typeError("Debe de ser una cadena de texto")
            .oneOf([yup.ref("password"), null], "El password no coincide")
            .required("La confirmacion del password es necesario")
})

export const advancedSchema = yup.object().shape({
      username: yup
            .string()
            .typeError("Debe ser una cadena de texto")
            .min(3, "El username debe de contener minimo tres caracteres")
            .required("Required"),
      jobType: yup
            .string()
            .oneOf(["designer", "developer", "manager", "other"], "Invalid Job Type")
            .required("Required"),
      acceptedTos: yup
            .boolean()
            .oneOf([true], "Please accept the terms of service"),
});
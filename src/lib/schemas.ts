import * as Yup from 'yup'

const nameSchema = Yup.string().min(3, 'Muito curto').max(20, 'Muito Longo').required('Obrigatório')
const emailSchema = Yup.string().email('Email inválido').required('Obrigatório')
const passwordSchema = Yup.string().min(4, 'Muito curto').max(20, 'Muito Longo').required('Obrigatório')

export interface ValuesNEP {
  name: string
  email: string
  password: string
}

export const LoginSchemaNEP = Yup.object().shape({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema
})

export interface ValuesEP {
  email: string
  password: string
}

export const LoginSchemaEP = Yup.object().shape({
  email: emailSchema,
  password: passwordSchema
})

export interface ValuesEPNE {
  email: string
  password: string
  newEmail: string
}

export const LoginSchemaEPNE = Yup.object().shape({
  email: emailSchema,
  password: passwordSchema,
  newEmail: emailSchema
})

export interface ValuesN {
  name: string
}

export const LoginSchemaN = Yup.object().shape({
  name: nameSchema
})

export interface ValuesEPNP {
  email: string
  password: string
  newPassword: string
}

export const LoginSchemaEPNP = Yup.object().shape({
  email: emailSchema,
  password: passwordSchema,
  newPassword: passwordSchema
})

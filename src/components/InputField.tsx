import { UseFormRegister } from "react-hook-form"

interface InputFieldProps {
    label: string
    name: string
    type?: string
    step?: string
    register: UseFormRegister<any>
    errors: any
    validation?: object
}

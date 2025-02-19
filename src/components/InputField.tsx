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

export function InputField({ label, name, type = "text", step, register, errors,  validation }: InputFieldProps) {
    return (
      <div>
        <label className="block font-medium">{label}</label>
        <input
          type={type}
          step={step}
          {...register(name, validation)}
          className="w-full p-2 border rounded focus:ring-indigo-500 focus:border-indigo-500"
        />
        {errors[name] && <p className="text-red-500">{errors[name].message}</p>}
      </div>
    )
}

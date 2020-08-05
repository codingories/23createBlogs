import { ReactChild, useCallback, useState} from 'react'
import {AxiosResponse} from 'axios'

type Field<T> = {
  label: string,
  type: 'text' | 'password' | 'textarea',
  key: keyof T,
}

type useFormOptions<T> = {
  initFormData: T;
  fields: Field<T>[];
  buttons: ReactChild;
  submit: {
    request: (formData:T)=> Promise<AxiosResponse<T>>;
    message: string;
  }
}

export function useForm<T>(options: useFormOptions<T>) { // 通过参数反推T,useForm里面有个T,T的类型就是initFormData的类型
  const {initFormData, fields, buttons, submit} = options
  // 非受控
  const [formData, setFormData] = useState(initFormData)
  const [errors, setErrors] = useState(() => {
    const e: { [key in keyof T]?: string[] } = {} // 死记硬背, key的下标全部都是T的下标
    for (let key in initFormData) {
      if (initFormData.hasOwnProperty(key)) {
        e[key] = []
      }
    }
    return e // 只做初始值
  })

  const onChange = useCallback((key: keyof T, value: any) => {
    // 看到keyof 就脑补成, 'username'|'password'
    setFormData({
      ...formData,
      [key]: value // [key]如果不加[]，就是"key"
    })
  }, [formData])

  const _onSubmit = useCallback((e) => {
    e.preventDefault() // 调用外面submit
    submit.request(formData).then(()=>{
      window.alert(submit.message)
    },(error)=>{
      if (error.response) {
        const response: AxiosResponse = error.response
        if (response.status === 422) {
          setErrors(response.data)
        }
      }
    })
  }, [submit, formData])

  const form = (
    <form onSubmit={_onSubmit}>
      {fields.map(field =>
        <div key={field.key.toString()}>
          <label>
            {field.label}
            {field.type === 'textarea' ?
              <textarea onChange={(e) => onChange(field.key, e.target.value)} value={formData[field.key].toString()} /> :
              <input type={field.type} value={formData[field.key].toString()}
                     onChange={(e) => onChange(field.key, e.target.value)}/>
            }
            {errors[field.key]?.length > 0 && <div>
              {errors[field.key].join(',')}
            </div>}
          </label>
        </div>)}
      <div>
        {buttons}
      </div>
    </form>
  )
  return {
    form: form, setErrors: setErrors
  }
}


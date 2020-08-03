import {useCallback, useState} from 'react'

export function useForm<T>(initFormData: T, onSubmit: (fd: T) => void) { // 通过参数反推T,useForm里面有个T,T的类型就是initFormData的类型

  // 非受控
  const [formData, setFormData] = useState(initFormData)
  // initFormData = {username:'', password:''}
  // initErrors = {username: [], password: []}
  const [errors, setErrors] = useState(() => {
    // const e: { [k: string]: string[] } = {};
    // const e: { [k: keyof T]: string[] } = {};
    // [key in keyof T] = k in ('title'|'password')
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
    onSubmit(formData)
  }, [onSubmit, formData])

  const form = (
    <form>1</form>
  )
  return {
    form: form
  }
}


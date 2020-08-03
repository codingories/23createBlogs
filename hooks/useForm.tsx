export function useForm<T>(initFormData:T){ // 通过参数反推T,useForm里面有个T,T的类型就是initFormData的类型
  const form = (
    <form>1</form>
  )
  return {
    form: form
  }
}

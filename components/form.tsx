type Props = {
  fields: {
    label: string,
    type: 'text'|'password',
    value: string | number
  }[]
}

export const Form: React.FC<Props> = (props) =>{
  return (
    <form>
      {props.fields.map(field=>
        <div>
          <label>
            {field.label}
            <input type={field.type} value={field.value}/>
          </label>
        </div>)}
    </form>
  )
};

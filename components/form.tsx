type Props = {
  fields: { label: string }[]
}

export const Form: React.FC<Props> = (props) =>{
  return (
    <form>
      {props.fields.map(field=>
        <div>
          <label>
            {field.label}
          </label>
        </div>)}


    </form>
  )
};

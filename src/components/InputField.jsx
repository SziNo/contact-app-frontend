const InputField = ({
  label,
  value = '',
  onChange,
  name,
  type = 'text',
  required,
}) => (
  <div className='input-box'>
    <span className='details'>{label}</span>
    <input
      type={type}
      value={value}
      onChange={onChange}
      name={name}
      required={required}
    />
  </div>
)

export default InputField

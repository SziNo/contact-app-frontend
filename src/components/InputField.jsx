import PropTypes from 'prop-types'

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

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  required: PropTypes.bool.isRequired,
}

export default InputField

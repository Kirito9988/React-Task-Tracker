import PropTypes from 'prop-types'
import Button from './Button'
import Tasks from './Tasks'
const Header = ({title}) => {
      const onClick = (e) => {
        console.log(e)
    }

  return (
    <header>
      <h1>
        {title}
      </h1>
     <Button color={'green'} text='Hello' onClick={onClick} />
    </header>
  )
}

Header.defaultProps = {
  title: "Task Trackerr"
}
Header.propTypes = {
  title: PropTypes.string.isRequired,
}
export default Header 
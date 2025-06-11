import PropTypes from 'prop-types';


function Props(props) {
    const { name, age, city } = props;
    return (
        <div>
        <h1>Person Information</h1>
        <p>Name: {name}</p>
        <p>Age: {age}</p>
        <p>City: {city}</p>
        </div>
    );
}

Props.propTypes = {
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    city: PropTypes.string.isRequired
};

Props.defaultProps = {
    name: 'Unknown',
    age: 0,
    city: 'Unknown'
};

export default Props;

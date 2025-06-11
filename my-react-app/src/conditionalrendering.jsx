import PropTypes from 'prop-types';

function Conditionalrendering({ name = "Unknown", age = 0, city = "Unknown" }) {
  return (
    <div>
      <h1>Person Information</h1>
      <p>Name: {name}</p>

      {/* Conditional rendering for age */}
      <p>
        Age: {age > 0 ? age : "Age not provided"}
      </p>

      {/* Conditional rendering for city */}
      {city !== "Unknown" && <p>City: {city}</p>}
    </div>
  );
}

Conditionalrendering.propTypes = {
  name: PropTypes.string,
  age: PropTypes.number,
  city: PropTypes.string
};

export default Conditionalrendering;

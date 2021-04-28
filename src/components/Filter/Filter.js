import shortId from "shortid";
import PropTypes from "prop-types";
import styles from "./Filter.module.scss";

const Filter = ({ value, onFilterChange }) => {
  const id = shortId.generate();
  return (
    <div className={styles.filter}>
      <label htmlFor={id}>Find Contacts by name</label>
      <input
        className={styles.input}
        id={id}
        onChange={onFilterChange}
        type="text"
        name="filter"
        value={value}
      ></input>
    </div>
  );
};

export default Filter;

PropTypes.Filter = {
  value: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

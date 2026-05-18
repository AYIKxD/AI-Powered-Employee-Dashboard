function SearchFilter({ filters, setFilters }) {
  const departments = [
    "All Departments",
    "Development",
    "Design",
    "Marketing",
    "HR",
    "Finance",
    "Sales",
    "Operations",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="filter-bar">
      <input
        type="text"
        name="name"
        value={filters.name}
        onChange={handleChange}
        placeholder="Search by name..."
        className="form-input"
        id="search-name-input"
      />

      <select
        name="department"
        value={filters.department}
        onChange={handleChange}
        className="form-select"
        id="filter-department-select"
      >
        {departments.map((dept) => (
          <option
            key={dept}
            value={dept === "All Departments" ? "" : dept}
          >
            {dept}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SearchFilter;

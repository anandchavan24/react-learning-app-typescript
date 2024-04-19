import { FilterBarProps } from '../../Shared/types';



const FilterBar = ({
    handleSearch,
    handleSort,
    handleStatus,
}:FilterBarProps) => {
    return (
        <div className="filter-bar">
            <input
                type="text"
                placeholder="Search..."
                onChange={handleSearch}
            />
            <select onChange={handleSort}>
                <option value="">Sort By</option>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </select>
            <select onChange={handleStatus}>
                <option value="">Filter By Status</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
            </select>
        </div>
    );
};

export default FilterBar;

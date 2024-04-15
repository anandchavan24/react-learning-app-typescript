import React, { useState } from 'react';

interface FilterBarProps {
    handleSearch: (value: string) => void;
    handleSort: (value: string) => void;
    handleStatus: (value: string) => void;
}

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
                onChange={(e) => handleSearch(e.target.value)}
            />
            <select onChange={(e) => handleSort(e.target.value)}>
                <option value="">Sort By</option>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </select>
            <select onChange={(e) => handleStatus(e.target.value)}>
                <option value="">Filter By Status</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
            </select>
        </div>
    );
};

export default FilterBar;

import React, { useEffect, useRef, useState } from "react";

import "./Dropdown.css";

// This code creates an icon using an svg. The icon is a close button, typically used to close a modal or pop-up.
const Icon = () => {
    return (
        <svg height="20" width="20" viewBox="0 0 20 20">
            <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
        </svg>
    );
};

// This is a stateless functional component that returns a SVG icon.
const CloseIcon = () => {
    return (
        <svg height="20" width="20" viewBox="0 0 20 20">
            <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
        </svg>
    );
};

const Dropdown = ({
                      placeHolder,
                      options,
                      isMulti,
                      isSearchable,
                      onChange
                  }) => {
    const [showMenu, setShowMenu] = useState(false);
    const [selectedValue, setSelectedValue] = useState(isMulti ? [] : null);
    const [searchValue, setSearchValue] = useState("");
    const searchRef = useRef();
    const inputRef = useRef();

    // The code above uses the `useEffect` hook to set the `searchValue` to an empty string when the `showMenu` value changes.
    // If the `showMenu` value is `true`, the code will focus on the `searchRef` element.
    useEffect(() => {
        setSearchValue("");
        if (showMenu && searchRef.current) {
            searchRef.current.focus();
        }
    }, [showMenu]);

    // The code is using the useEffect hook to add an event listener for when the user clicks outside of the input element. This is used to toggle the state of the showMenu variable.
    // The event listener is added on mount and removed on unmount.
    useEffect(() => {
        const handler = (e) => {
            if (inputRef.current && !inputRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        window.addEventListener("click", handler);
        return () => {
            window.removeEventListener("click", handler);
        };
    });
    const handleInputClick = (e) => {
        setShowMenu(!showMenu);
    };

    // This code is responsible for displaying the selected value in a dropdown menu.
    // If no value is selected, it will display the placeholder.
    // If the dropdown is set to allow multiple selections, it will display each selected value as a tag.
    // Otherwise, it will simply display the selected value.

    const getDisplay = () => {
        if (!selectedValue || selectedValue.length === 0) {
            return placeHolder;
        }
        if (isMulti) {
            return (
                <div className="dropdown-tags">
                    {selectedValue.map((option) => (
                        <div key={option.value} className="dropdown-tag-item">
                            {option.label}
                            <span
                                onClick={(e) => onTagRemove(e, option)}
                                className="dropdown-tag-close"
                            >
                <CloseIcon />
              </span>
                        </div>
                    ))}
                </div>
            );
        }
        return selectedValue.label;
    };

    // This code removes an option from the selectedValue array if the option's value is not equal to the given option's value.
    const removeOption = (option) => {
        return selectedValue.filter((o) => o.value !== option.value);
    };

    // This code is used to remove a tag from a selected list of tags.
    const onTagRemove = (e, option) => {
        e.stopPropagation();
        const newValue = removeOption(option);
        setSelectedValue(newValue);
        onChange(newValue);
    };

    // This code is a function that is called when an item is clicked.
    // The function is passed the option that was clicked.
    // If the isMulti variable is true, the function will either add the option to the selectedValue array or remove the option from the array.
    // If isMulti is false, the function will set the selectedValue to the option that was clicked.
    // The onChange function will be called with the new value.
    const onItemClick = (option) => {
        let newValue;
        if (isMulti) {
            if (selectedValue.findIndex((o) => o.value === option.value) >= 0) {
                newValue = removeOption(option);
            } else {
                newValue = [...selectedValue, option];
            }
        } else {
            newValue = option;
        }
        setSelectedValue(newValue);
        onChange(newValue);
    };

    // This code is a function that checks if an option is selected. If the "isMulti" variable is true, it will check if the option is in the "selectedValue" array.
    // If "isMulti" is false, it will check if the "selectedValue" variable is equal to the option.
    const isSelected = (option) => {
        if (isMulti) {
            return selectedValue.filter((o) => o.value === option.value).length > 0;
        }

        if (!selectedValue) {
            return false;
        }

        return selectedValue.value === option.value;
    };

    // The code is defining a function to be executed on a search event, and setting the state of the search value.
    // The function is designed to filter the options based on the search value.

    const onSearch = (e) => {
        setSearchValue(e.target.value);
    };

    const getOptions = () => {
        if (!searchValue) {
            return options;
        }

        return options.filter(
            (option) =>
                option.label.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
        );
    };

    return (

        // This code defines acontrolled input component that renders a selected value, an input field, and a dropdown menu.
        // The dropdown menu is only rendered when the input field is focused.
        // The menu items are generated based on the options prop.
        // When a menu item is clicked, the onItemClick function is called, and the selected prop is updated to the selected option.

        <div className="dropdown-container">
            <div ref={inputRef} onClick={handleInputClick} className="dropdown-input">
                <div className="dropdown-selected-value">{getDisplay()}</div>
                <div className="dropdown-tools">
                    <div className="dropdown-tool">
                        <Icon />
                    </div>
                </div>
            </div>
            {showMenu && (
                <div className="dropdown-menu">
                    {isSearchable && (
                        <div className="search-box">
                            <input onChange={onSearch} value={searchValue} ref={searchRef} />
                        </div>
                    )}
                    {getOptions().map((option) => (
                        <div
                            onClick={() => onItemClick(option)}
                            key={option.value}
                            className={`dropdown-item ${isSelected(option) && "selected"}`}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dropdown;

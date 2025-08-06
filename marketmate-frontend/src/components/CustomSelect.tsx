import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface CustomSelectProps {
    selected: string;
    onChange: (value: string) => void;
}

const options = ["Low to High", "High to Low", "Newest First", "Oldest First"];

const CustomSelect = ({ selected, onChange }: CustomSelectProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const selectOption = (option: string) => {
        onChange(option); // Notify parent
        setIsOpen(false); // Close dropdown
    };

    return (
        <div className="relative w-38">
            <button
                onClick={toggleDropdown}
                className="w-full bg-white border border-gray-300 px-4 py-1 rounded-md flex justify-between items-center shadow-sm hover:border-primary focus:outline-none"
            >
                <span>{selected}</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <ul className="absolute z-50 mt-1 w-full bg-white border border-primary rounded-md shadow-lg max-h-60 overflow-y-auto">
                    {options.map((option, index) => (
                        <li
                            key={index}
                            onClick={() => selectOption(option)}
                            className={`px-4 py-2 cursor-pointer hover:bg-primary hover:text-white ${selected === option ? "bg-primary text-white" : "text-gray-700"
                                }`}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default CustomSelect;

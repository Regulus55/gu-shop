
interface DropdownProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (value: number) => void;
}

const PageDropdown: React.FC<DropdownProps> = ({ isOpen, onClose, onSelect }) => {
    const options = [10, 20, 30];

    if (!isOpen) return null;

    return (
        <div className="absolute mt-2 bg-white border border-gray-300 rounded-lg shadow-lg w-40 z-50">
            <div className="space-y-2">
                {options.map((option) => (
                    <button
                        key={option}
                        onClick={() => {
                            onSelect(option);
                            onClose();
                        }}
                        className="block w-full text-center px-4 py-2 text-gray-800 hover:bg-violet-400 hover:text-white focus:outline-none"
                    >
                        {option} per page
                    </button>
                ))}
            </div>
        </div>
    );
};

export default PageDropdown;
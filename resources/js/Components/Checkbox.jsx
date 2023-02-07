export default function Checkbox({id, name, value, defaultChecked, handleChange, onClick }) {
    return (
        <input
            type="checkbox"
            id={id}
            name={name}
            value={value}
            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
            handleChange={(e) => handleChange(e)}
            defaultChecked={defaultChecked}
            // onClick={onClick}
        />
    );
}

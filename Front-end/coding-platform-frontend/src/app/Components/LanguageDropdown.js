import Select from "react-select";
import { languageOptions } from "../Constants/languageOptions";

const LanguagesDropdown = ({ onSelectChange }) => {
  return (
    <Select
      placeholder={`Filter By Category`}
      options={languageOptions}
      
      defaultValue={languageOptions[0]}
      onChange={(selectedOption) => onSelectChange(selectedOption)}
    />
  );
};

export default LanguagesDropdown;
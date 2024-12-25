import InputField from "../common/InputField/InputField";
import { FiImage, FiMapPin, FiUser, FiPhone } from "react-icons/fi";
import { FaBuilding } from "react-icons/fa";

const CompanyInfoForm = ({ formData, setFormData, errors }) => {
  return (
    <div className="space-y-4">
      <InputField
        type="text"
        placeholder="Company Name *"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        error={errors.name}
        Icon={FaBuilding}
      />

      <InputField
        type="text"
        placeholder="Company Logo URL"
        value={formData.logo}
        onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
        Icon={FiImage}
      />

      <InputField
        type="text"
        placeholder="Company Address *"
        value={formData.address}
        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        error={errors.address}
        Icon={FiMapPin}
      />

      <InputField
        type="text"
        placeholder="Representative Name *"
        value={formData.representativeName}
        onChange={(e) =>
          setFormData({ ...formData, representativeName: e.target.value })
        }
        error={errors.representativeName}
        Icon={FiUser}
      />

      <InputField
        type="tel"
        placeholder="Phone Number *"
        value={formData.phoneNumber}
        onChange={(e) =>
          setFormData({ ...formData, phoneNumber: e.target.value })
        }
        error={errors.phoneNumber}
        Icon={FiPhone}
      />
    </div>
  );
};

export default CompanyInfoForm;
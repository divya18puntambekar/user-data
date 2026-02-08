import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const initialForm = {
  fname: "",
  lname: "",
  phn: "",
  emailId: "",
};

export default function EditUser() {
  const { userid } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});

  /* ---------------- VALIDATION ---------------- */
  const validateField = (name, value) => {
    switch (name) {
      case "fname":
      case "lname":
        if (!value) return "This field is required";
        if (!/^[A-Za-z]+$/.test(value)) return "Only letters allowed";
        return "";

      case "phn":
        if (!value) return "Phone number is required";
        if (!/^[6-9]\d{9}$/.test(value))
          return "Enter valid 10 digit mobile number";
        return "";

      case "emailId":
        if (!value) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Invalid email format";
        return "";

      default:
        return "";
    }
  };

  /* ---------------- INPUT CHANGE ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;

    const newValue =
      name === "phn" ? value.replace(/\D/g, "") : value;

    setFormData((prev) => ({ ...prev, [name]: newValue }));

    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, newValue),
    }));
  };

  /* ---------------- FETCH USER ---------------- */
  useEffect(() => {
    fetch(`http://localhost:5000/user/${userid}`)
      .then((res) => res.json())
      .then(setFormData)
      .catch((err) => console.error("Fetch error:", err));
  }, [userid]);

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields once
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      newErrors[key] = validateField(key, formData[key]);
    });

    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) {
      alert("Please fix validation errors.");
      return;
    }

    fetch(`http://localhost:5000/user/${userid}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (res.ok) {
          alert("Update successful!");
          navigate("/");
        }
      })
      .catch((err) => console.error("Update error:", err));
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
      <div className="w-[420px] bg-blue-50 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-center mb-4">
          Edit User
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          {[
            { label: "First Name", name: "fname", type: "text" },
            { label: "Last Name", name: "lname", type: "text" },
            { label: "Phone", name: "phn", type: "text" },
            { label: "Email", name: "emailId", type: "email" },
          ].map(({ label, name, type }) => (
            <div key={name}>
              <label className="block text-sm font-medium mb-1">
                {label}
              </label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
              />
              {errors[name] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[name]}
                </p>
              )}
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Save Changes
          </button>

          <Link
            to="/"
            className="block w-full text-center border border-blue-600 text-blue-600 py-2 rounded-md hover:bg-blue-100"
          >
            Cancel
          </Link>
        </form>
      </div>
    </div>
  );
}

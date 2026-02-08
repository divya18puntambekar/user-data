import { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialForm = {
  fname: "",
  lname: "",
  phn: "",
  emailId: "",
};

export default function UserForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});

  /* ---------------- VALIDATION ---------------- */
  const validate = (name, value) => {
    let error = "";

    switch (name) {
      case "fname":
      case "lname":
        if (!value.trim()) error = "This field is required";
        else if (!/^[A-Za-z]+$/.test(value))
          error = "Only letters allowed";
        break;

      case "phn":
        if (!value.trim()) error = "Phone number is required";
        else if (!/^[6-9]\d{9}$/.test(value))
          error = "Enter valid 10 digit mobile number";
        break;

      case "emailId":
        if (!value.trim()) error = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          error = "Invalid email format";
        break;

      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
    return error;
  };

  /* ---------------- CHANGE HANDLER ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;

    const newValue =
      name === "phn" ? value.replace(/\D/g, "") : value;

    setFormData((prev) => ({ ...prev, [name]: newValue }));
    validate(name, newValue);
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = (e) => {
    e.preventDefault();

    const errorList = Object.keys(formData).map((key) =>
      validate(key, formData[key])
    );

    if (errorList.some(Boolean)) return;

    fetch("http://localhost:5000/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Data saved successfully!");
        console.log("Saved:", data);
        navigate("/");
      })
      .catch((err) => console.error(err));
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
      <div className="w-[420px] bg-blue-50 p-6 rounded-lg shadow-md">
        <h1 className="text-xl font-semibold text-center mb-4">
          User Form
        </h1>

        <form onSubmit={handleSubmit} className="space-y-3">
          {[
            { label: "First Name", name: "fname", type: "text" },
            { label: "Last Name", name: "lname", type: "text" },
            { label: "Phone", name: "phn", type: "text" },
            { label: "Email", name: "emailId", type: "email" },
          ].map(({ label, name, type }) => (
            <div key={name}>
              <label className="block text-sm font-medium">
                {label}
              </label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
              {errors[name] && (
                <p className="text-red-500 text-sm">
                  {errors[name]}
                </p>
              )}
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Submit
          </button>
        </form>

        <button
          onClick={() => navigate("/")}
          className="w-full mt-3 border border-blue-600 text-blue-600 py-2 rounded-md"
        >
          See Data
        </button>
      </div>
    </div>
  );
}

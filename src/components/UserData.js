import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function UserData() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/user")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log(error.message));
  }, []);
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user")) {
      fetch(`http://localhost:5000/user/${id}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (res.ok) {
            // Remove the user from the local state so the UI updates immediately
            setUsers(users.filter((user) => user.id !== id));
            alert("Removed successfully.");
          }
        })
        .catch((err) => console.log(err.message));
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-3">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
        User Data
      </h1>
      <div className="w-full max-w-6xl overflow-x-auto">
        <table className="w-full border-2 border-black border-collapse bg-white">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="border border-black px-3 py-2 text-left text-sm sm:text-base">
                First Name
              </th>
              <th className="border border-black px-3 py-2 text-left text-sm sm:text-base">
                Last Name
              </th>
              <th className="border border-black px-3 py-2 text-left text-sm sm:text-base">
                Phone Number
              </th>
              <th className="border border-black px-3 py-2 text-left text-sm sm:text-base">
                Email
              </th>
              <th className="border border-black px-3 py-2 text-left text-sm sm:text-base">
                Actions
              </th>
            </tr>
          </thead>
          {/* // Change this part in your UserData.js */}
          <tbody className="bg-white text-black">
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="border border-black px-4 py-3 text-center text-sm"
                >
                  No Users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-blue-50 transition">
                  <td className="border border-black px-3 py-2 text-sm sm:text-base">
                    {user.fname}
                  </td>
                  <td className="border border-black px-3 py-2 text-sm sm:text-base">
                    {user.lname}
                  </td>
                  <td className="border border-black px-3 py-2 text-sm sm:text-base">
                    {user.phn}
                  </td>
                  <td className="border border-black px-3 py-2 text-sm sm:text-base break-all">
                    {user.emailId}
                  </td>

                  {/* Responsive Actions */}
                  <td className="border border-black px-3 py-2">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        className="px-3 py-1 border border-green-600 text-green-600 rounded 
                        hover:bg-green-600 hover:text-white transition"
                        onClick={() => navigate(`/user/view/${user.id}`)}
                      >
                        View
                      </button>

                      <button
                        className="px-3 py-1 border border-blue-600 text-blue-600 rounded hover:bg-blue-600 hover:text-white transition"
                        onClick={() => navigate(`/user/edit/${user.id}`)}
                      >
                        Edit
                      </button>

                      <button
                        className="px-3 py-1 border border-red-600 text-red-600 rounded hover:bg-red-600 hover:text-white transition"
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="flex justify-end mt-[10px]">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition"
            onClick={() => navigate(`/create`)}
          >
            Add New User
          </button>
        </div>
      </div>
    </div>
  );
}

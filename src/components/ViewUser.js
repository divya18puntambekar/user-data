import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function ViewUser() {
  const { userid } = useParams(); // Ensure this matches the :userid in your App.js route
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/user/${userid}`)
      .then((res) => res.json())
      .then((data) => setUserData(data))
      .catch((err) => console.log(err.message));
  }, [userid]);
  return (
  <div className="h-screen w-screen flex items-center justify-center overflow-hidden bg-gray-100 py-[10px]">
    <div className="w-[420px] bg-blue-50 p-6 rounded-lg shadow-md">
      <h1 className="text-xl font-semibold text-center mb-4">
        User Details
      </h1>

      {userData ? (
        <div className="space-y-3 text-sm">
          <div className="flex justify-between border-b pb-1">
            <span className="font-medium">First Name</span>
            <span>{userData.fname}</span>
          </div>

          <div className="flex justify-between border-b pb-1">
            <span className="font-medium">Last Name</span>
            <span>{userData.lname}</span>
          </div>

          <div className="flex justify-between border-b pb-1">
            <span className="font-medium">Phone</span>
            <span>{userData.phn}</span>
          </div>

          <div className="flex justify-between border-b pb-1">
            <span className="font-medium">Email</span>
            <span>{userData.emailId}</span>
          </div>

          <Link
            to="/"
            className="block w-full text-center mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Back to List
          </Link>
        </div>
      ) : (
        <p className="text-center text-gray-600">Loading user details...</p>
      )}
    </div>
  </div>
);

  // return (
  //   <div className="container">
  //     <h1>View User Details</h1>
      
  //     {userData ? (
  //       <div className="details">
  //         <p><strong>First Name:</strong> {userData.fname}</p>
  //         <p><strong>Last Name:</strong> {userData.lname}</p>
  //         <p><strong>Phone:</strong> {userData.phn}</p>
  //         <p><strong>Email:</strong> {userData.emailId}</p>
          
  //         <br />
  //         <Link to="/" className="btn">Back to List</Link>
  //       </div>
  //     ) : (
  //       <p>Loading user details...</p>
  //     )}
  //   </div>
  // );
}

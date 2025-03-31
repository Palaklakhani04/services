// "use client";

// import { useEffect, useState } from "react";

// export default function UsersPage() {
//     const [users, setUsers] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         async function fetchUsers() {
//             try {
//                 const res = await fetch("/api/users");
//                 const data = await res.json();
//                 setUsers(data.users);
//             } catch (error) {
//                 console.error("Error fetching users:", error);
//             } finally {
//                 setLoading(false);
//             }
//         }

//         fetchUsers();
//     }, []);

//     if (loading) return <p>Loading...</p>;
//     if (!users.length) return <p>No users found</p>;

//     return (
//         <div>
//             <h1 className="text-2xl font-bold mb-4">All Registered Users</h1>
//             <table className="w-full border-collapse border border-gray-300">
//                 <thead>
//                     <tr className="bg-gray-200">
//                         <th className="border border-gray-300 px-4 py-2">Name</th>
//                         <th className="border border-gray-300 px-4 py-2">Email</th>
//                         <th className="border border-gray-300 px-4 py-2">Phone</th>
//                         <th className="border border-gray-300 px-4 py-2">Address</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {users.map(user => (
//                         <tr key={user._id} className="border border-gray-300">
//                             <td className="border border-gray-300 px-4 py-2">{user.name}</td>
//                             <td className="border border-gray-300 px-4 py-2">{user.email}</td>
//                             <td className="border border-gray-300 px-4 py-2">{user.mobile}</td>
//                             <td className="border border-gray-300 px-4 py-2">{user.address}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }


"use client";

import AdminDashboardLayout from "@/app/components/AdminDashboardLayout";
import { useEffect, useState } from "react";

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const res = await fetch("/api/users");
                const data = await res.json();
                setUsers(data.users);
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchUsers();
    }, []);

    if (loading) return <p className="text-center text-gray-600">Loading...</p>;
    if (!users.length) return <p className="text-center text-gray-600">No users found.</p>;

    return (
      <div> 
        <AdminDashboardLayout title={"Registered Users"} />
        <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4 ">
            
            <div className="bg-white shadow-md rounded-lg w-full max-w-4xl p-4 ">
                <h1 className="text-xl font-semibold text-gray-700 mb-4 text-center">Registered Users</h1>

                <div className="overflow-x-auto ">
                    <table className="w-full text-sm text-left border border-gray-200  ">
                        <thead className="bg-black text-white ">
                            <tr>
                                <th className="px-3 py-2">Name</th>
                                <th className="px-3 py-2">Email</th>
                                <th className="px-3 py-2">Phone</th>
                                <th className="px-3 py-2">Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-100 transition">
                                    <td className="px-3 py-2">{user.name}</td>
                                    <td className="px-3 py-2">{user.email}</td>
                                    <td className="px-3 py-2">{user.mobile}</td>
                                    <td className="px-3 py-2">{user.address}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </div> 
    );
}

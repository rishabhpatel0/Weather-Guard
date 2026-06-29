import { useEffect,useState } from "react";
import { getUsers,approveUser } from "../services/userService";
import Layout from "../components/Layout/Layout";


function Users(){

    const [users,setUsers]=useState([]);

    useEffect(()=>{

    loadUsers();

    },[]);

    async function loadUsers(){

        const data=await getUsers();

        setUsers(data);

    }

    async function approve(id:string){

        await approveUser(id);

        loadUsers();

}

return (
  <Layout>
    <div className="min-h-screen bg-slate-100 p-8">

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900">
             User Management
        </h1>

        <p className="text-slate-500 mt-2">
          Review new registrations and approve access.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-800 text-white">

            <tr>

              <th className="text-left p-4">User ID</th>
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Email</th>
              <th className="text-left p-4">Status</th>
              <th className="text-center p-4">Action</th>

            </tr>

          </thead>

          <tbody>

            {users.map((user: any) => (

              <tr
                key={user._id}
                className="border-b hover:bg-slate-50 transition"
              >

                <td className="p-4 font-mono text-xs">
                  {user._id}
                </td>

                <td className="p-4 font-semibold">
                  {user.name}
                </td>

                <td className="p-4 text-gray-600">
                  {user.email}
                </td>

                <td className="p-4">

                  {user.status.toLowerCase() === "approved" ? (

                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                      ✅ Approved
                    </span>

                  ) : (

                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">
                      ⏳ Pending
                    </span>

                  )}

                </td>

                <td className="p-4 text-center">

                  {user.status.toLowerCase() === "pending" ? (

                    <button
                      onClick={() => approve(user._id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
                    >
                      Approve
                    </button>

                  ) : (

                    <span className="text-green-600 font-semibold">
                      Done
                    </span>

                  )}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  </Layout>
);


}

export default Users;
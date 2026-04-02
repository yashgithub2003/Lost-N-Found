import { useAuth } from "@/context/AuthContext";
import { markAsFound, postDelete } from "@/services/apiService";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const History = () => {
  const { user, fetchUser } = useAuth();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(user?.posts || []);
  }, [user]);

  const handleDelete = async (id) => {
    try {
      await postDelete(id);
      await fetchUser(); // 🔥 refresh UI
      toast.success("Deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Delete failed");
    }
  };
  const handleUpdate = async (id) => {
    try {
      await markAsFound(id);
      await fetchUser(); // 🔥 refresh UI
      toast.success("Updated successfully");
    } catch (error) {
      console.log(error);
      toast.error("Update failed");
    }
  };
  return (
    <div className="mx-80 grid grid-cols-1 md:grid-cols-2 gap-6 p-8 min-h-screen bg-[#151e32] place-items-center">
      {posts.length === 0 ? (
        <div className="col-span-2 flex items-center justify-center w-full">
          <h1 className="text-white text-2xl font-semibold">No history</h1>
        </div>
      ) : (
        posts.map((post) => (
          <div
            key={post.id}
            className="bg-white w-full max-w-[500px] rounded-xl overflow-hidden flex"
          >
            {/* Image */}
            <div className="bg-black w-1/2">
              <img
                className="h-full w-full object-cover"
                src={post.imageUrl}
                alt="Item"
              />
            </div>

            {/* Content */}
            <div className="bg-[#2b3c62] w-1/2 p-4 text-white flex flex-col justify-between">
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <h1 className="text-[#e5e7eb] font-bold">Title:</h1>
                  <h1>{post.title}</h1>
                </div>

                <div className="flex gap-2">
                  <h1 className="text-[#e5e7eb] font-bold">Description:</h1>
                  <h1>{post.content}</h1>
                </div>

                <div className="flex gap-2">
                  <h1 className="text-[#e5e7eb] font-bold">Status:</h1>
                  <h1>{post.status}</h1>
                </div>

                <div className="mt-3 text-sm text-gray-300">
                  <p>Name: {user?.name}</p>
                  <p>Email: {user?.email}</p>
                </div>
              </div>

              <div className="flex flex-col gap-2 mt-4">
                {/* ✅ Show ONLY when FOUND */}
                {post.status === "FOUND" && (
                  <>
                    <Link
                      to={`/item/${post.id}`}
                      className="bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700 transition"
                    >
                      Check Nearby Request
                    </Link>

                    <button
                      onClick={() => handleUpdate(post.id)}
                      className="bg-green-600 text-white text-center py-2 rounded hover:bg-green-700 transition"
                    >
                      Found the Owner
                    </button>
                  </>
                )}

                {/* ✅ ALWAYS SHOW DELETE */}
                <button
                  onClick={() => handleDelete(post.id)}
                  className="bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default History;

import { getAllPost } from '@/services/apiService';
import React, { useEffect, useState } from 'react'

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchAllPost = async () => {
      try {
        const res = await getAllPost();

        if (res.data.success) {
          setData(res.data.posts); // ✅ FIX
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllPost();
  }, []);

  return (
    <div className="ml-[16%] min-h-screen w-full bg-[#151e32] p-8">

      {/* Top Bar */}
      <div className="h-[10%] w-full bg-[#111827] mb-6 rounded"></div>

      {/* Grid */}
      {data.length === 0 ? (
        <h1 className="text-white text-xl">No posts found</h1>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {data.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl overflow-hidden flex shadow-lg hover:scale-[1.02] transition"
            >

              {/* Image */}
              <div className="w-1/2 bg-black">
                <img
                  src={post.imageUrl}
                  alt="post"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="w-1/2 p-4 flex flex-col justify-between bg-[#2b3c62] text-white">

                <div className="flex flex-col gap-2">

                  <h1 className="font-bold text-lg">
                    {post.title}
                  </h1>

                  <p className="text-sm text-gray-300 line-clamp-3">
                    {post.content}
                  </p>

                  <p className="text-xs text-gray-400">
                    Created: {new Date(post.createdAt).toLocaleDateString()}
                  </p>

                  <p className="text-xs text-gray-400">
                    Updated: {new Date(post.updatedAt).toLocaleDateString()}
                  </p>

                </div>

              </div>
            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default Home;
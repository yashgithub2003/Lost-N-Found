import { getNearby } from '@/services/apiService';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Item = () => {
  const params = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const getNearbyReq = async () => {
      try {
        const res = await getNearby(params.id);
        if (res.data.success) {
          setData(res.data.posts);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getNearbyReq();
  }, [params.id]);

  return (
    <div className="mx-80 grid grid-cols-1 md:grid-cols-2 gap-6 p-8 min-h-screen bg-[#151e32] place-items-center">

      {/* ✅ Empty State */}
      {data.length === 0 ? (
        <div className="col-span-2 flex items-center justify-center w-full">
          <h1 className="text-white text-2xl">No nearby posts</h1>
        </div>
      ) : (

        data.map((post) => (
          <div
            key={post.id}
            className="bg-white w-full max-w-[500px] overflow-hidden rounded-xl flex hover:scale-105 transition"
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
                  <h1 className="font-bold">Title:</h1>
                  <h1>{post.title}</h1>
                </div>

                <div className="flex gap-2">
                  <h1 className="font-bold">Description:</h1>
                  <h1>{post.content}</h1>
                </div>

                <div className="flex gap-2">
                  <h1 className="font-bold">Status:</h1>
                  <h1>{post.status}</h1>
                </div>

                {/* Distance */}
                <p className="text-green-400 mt-2">
                  📍 Distance: {post.distance} km
                </p>

                {/* Author */}
                <div className="mt-3 text-sm text-gray-300">
                  <p>Name: {post.author?.name}</p>
                  <p>Email: {post.author?.email}</p>
                </div>

              </div>

            </div>
          </div>
        ))
      )}

    </div>
  );
};

export default Item;
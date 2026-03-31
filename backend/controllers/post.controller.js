import prisma from "../config/prisma.js";
import cloudinary from "../config/cloudinary.js";
import getDataUri from "../utils/dataUri.js";
import getDistanceInKm from "../utils/distance.js";

export const addNewPost = async (req, res) => {
  try {
    const { title, content, status, latitude, longitude } = req.body;

    const file = req.file; // multer file
    const userId = req.user?.userId;

    if (!file) {
      return res.status(400).json({ message: "Image is required" });
    }

    // ✅ Convert file to DataURI
    const fileUri = getDataUri(file);

    // ✅ Upload to Cloudinary
    const uploaded = await cloudinary.uploader.upload(fileUri.content, {
      folder: "posts",
    });

    // ✅ Save to DB
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        status,
        imageUrl: uploaded.secure_url,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        authorId: userId,
      },
    });

    res.status(201).json({
      message: "Post created successfully",
      post: newPost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};



export const getNearbySearchPostsByPostId = async (req, res) => {
  try {
    const { postId } = req.params;

    if (!postId) {
      return res.status(400).json({ message: "Post ID required" });
    }

    // 1️⃣ Get reference post
    const referencePost = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!referencePost) {
      return res.status(404).json({ message: "Post not found" });
    }

    const { latitude, longitude } = referencePost;

    if (latitude === undefined || longitude === undefined) {
      return res.status(400).json({
        message: "Reference post has no coordinates",
      });
    }

    // 2️⃣ Get all SEARCH posts (excluding current post)
    const searchPosts = await prisma.post.findMany({
      where: {
        status: "SEARCH",
        NOT: {
          id: postId,
        },
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    // 3️⃣ Calculate distance + filter + sort
    const nearbyPosts = searchPosts
      .map((post) => {
        const distance = getDistanceInKm(
          latitude,
          longitude,
          post.latitude,
          post.longitude
        );

        return {
          ...post,
          distance: Number(distance.toFixed(2)), // ✅ add distance
        };
      })
      .filter((post) => post.distance <= 5) // ✅ filter
      .sort((a, b) => a.distance - b.distance); // ✅ nearest first

    // 4️⃣ Return response
    return res.status(200).json({
      success: true,
      referencePostId: postId,
      count: nearbyPosts.length,
      posts: nearbyPosts,
    });
  } catch (error) {
    console.error("Nearby Posts Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
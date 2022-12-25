import React, { useEffect, useState } from "react";
import Navigation from "../components/header/Navigation";
import { getCookie } from "cookies-next";
import axios from "axios";
import Postlist from "../components/post/Postlist";
import Footer from "../components/footer/footer";

const Blog = () => {
  //   const token = getCookie("token");
  const [posts, setposts] = useState([]);
  async function getPosts(params) {
    try {
      let response = await axios.get("https://api.pilput.my.id/api/v1/posts");
      setposts(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <div>
      <Navigation></Navigation>
      <div className="mx-auto bg-gray-50 p-3 max-w-7xl">
        <h2 className="text-2xl font-semibold">Post</h2>
        <div className="mb-10">
          {posts.map((post) => (
            <Postlist key={post.id} post={post} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;

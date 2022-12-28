import React, { useEffect, useState } from "react";
import Navigation from "../components/header/Navigation";
import axios from "axios";
import Postlist from "../components/post/Postlist";
import Footer from "../components/footer/footer";
import Postlistpulse from "../components/post/postlistpulse";

export async function getServerSideProps() {
  const apihost = process.env.API_HOST;
  return {
    props: { apihost },
  };
}

const Blog = (props) => {
  const [posts, setposts] = useState([]);
  async function getPosts() {
    try {
      let response = await axios.get(props.apihost + "/api/v1/posts");
      setposts(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getPosts();
  }, []);

  let postsshow;
  if (posts.length) {
    postsshow = posts.map((post) => <Postlist key={post.id} post={post} />);
  } else {
    postsshow = <Postlistpulse />;
  }

  return (
    <div>
      <Navigation></Navigation>
      <div className="mx-auto bg-gray-50 p-3 max-w-7xl">
        <h2 className="text-2xl font-semibold">Post</h2>
        <div className="mb-10"></div>
        {postsshow}
      </div>
      <Footer />
    </div>
  );
};

export default Blog;

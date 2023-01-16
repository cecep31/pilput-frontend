import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navigation from "../../components/header/Navigation";

export async function getServerSideProps() {
  const apihost = process.env.API_HOST;
  return {
    props: { apihost },
  };
}

const Post = (props) => {
  const [post, setpost] = useState({ title: "Loading...", desc: "Loading" });
  const router = useRouter();
  const { id } = router.query;
  async function getPost() {
    let response = await (
      await axios.get(props.apihost + "/api/v1/posts/" + id)
    ).data;
    setpost(response);
  }
  useEffect(() => {
    getPost();
  }, []);

  return (
    <>
      <Navigation />
      <div className="mx-auto bg-gray-50 p-3 max-w-7xl">
        <h2 className="font-bold">Post</h2>
        <div className="">
            <div className="font-semibold text-center">{post.title}</div>
            <br></br>
            <p>{post.desc}</p>
        </div>
      </div>
    </>
  );
};

export default Post;

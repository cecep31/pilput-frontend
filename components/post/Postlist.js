import Link from "next/link";

const Postlist = (props) => {
  return (
    <div className="w-full mt-4 px-5 py-5 bg-gray-50 border shadow-xl rounded-lg">
      <div className="">
        <h2 className="font-bold capitalize">{props.post.title}</h2>
        <p>{props.post.desc}</p>
        <div className="flex justify-end">
          <Link href={"/posts/"+props.post.id} className="btn">Show More</Link>
        </div>
      </div>
    </div>
  );
};

export default Postlist;

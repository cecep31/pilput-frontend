import Link from "next/link";

const Postlist = (props) => {
  return (
    <div className="w-full mt-3 bg-base-200 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{props.post.title}</h2>
        <p>{props.post.desc}</p>
        <div className="card-actions justify-end">
          <Link href={"/post/"+props.post.id} className="btn btn-primary">Show More</Link>
        </div>
      </div>
    </div>
  );
};

export default Postlist;

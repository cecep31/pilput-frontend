import Link from "next/link";
import nookies from "nookies";

export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx);
  // console.log(cookies.token);
  if (!cookies.token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default function Dashboard() {
  return (
    <div>
      <Link className="text-blue-500" href="/">
        Home
      </Link>
      <div>Dashboard</div>
    </div>
  );
}

import Link from "next/link";
import { getCookie } from "cookies-next";
import Logged from "../../components/layouts/Logged";

export async function getServerSideProps({ req, res }) {
  let token = getCookie("token", { req, res });
  if (!token) {
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
    <>
      <Logged>
        <div className="min-h-screen bg-white rounded-lg p-3">
          <Link className="text-blue-500" href="/">
            Home
          </Link>
        </div>
      </Logged>
    </>
  );
}

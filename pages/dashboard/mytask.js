import React from "react";
import Logged from "../../components/layouts/Logged";
import nookies from 'nookies'

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
function Mytask() {
  return (
  <Logged>
    <div className="bg-white p-5 rounded-xl shadow-lg">
        <h1>My Tasks</h1> 
        <div>Add Task</div>
        <div></div>
      </div>
  </Logged>
  );
}

export default Mytask;

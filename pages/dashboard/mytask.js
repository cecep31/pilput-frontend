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
    Mytask
  </Logged>
  );
}

export default Mytask;

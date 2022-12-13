import React, { useState } from "react";
import Logged from "../../components/layouts/Logged";
import nookies from "nookies";
import axios from "axios";

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

  var config = {
    method: "get",
    url: "https://api.pilput.my.id/api/v1/mytaskgroups",
    headers: {
      Authorization: `Bearer ${cookies.token}`,
      "Content-Type": "application/json",
    },
  };

  let response = await axios(config);
  const taskgroups = response.data;

  return {
    props: { taskgroups }, // will be passed to the page component as props
  };
}
function Mytask({ taskgroups }) {
  const [groups, setgroups] = useState(taskgroups);
  // console.log(groups);
  return (
    <Logged>
      <div className="bg-white p-5 rounded-xl shadow-lg">
        <h1 className="text-2xl">My Tasks</h1>
      </div>
      <div className="bg-white p-5 rounded-xl shadow-lg mt-5">
        {taskgroups.map((data, key) => {
          return (
            <div key={key}>
              <div className="text-green-800 text-4xl">{data.name}</div>
              <button className="bg-green-500 py-1 px-2 rounded-lg text-white hover:bg-green-700">
                Add Task
              </button>
            </div>
          );
        })}
      </div>
    </Logged>
  );
}

export default Mytask;

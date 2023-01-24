import { getCookie } from "cookies-next";
import { PlusSmallIcon } from "@heroicons/react/24/outline";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

// export async function getServerSideProps({ req, res }) {
//   const token = getCookie("token", { req, res });
//   const apihost = process.env.API_HOST;
//   if (!token) {
//     return {
//       redirect: {
//         destination: "/login",
//         permanent: false,
//       },
//     };
//   }
//   return {
//     props: { apihost, token },
//   };
// }

const Chat = () => {
  return (
    <main className="relative h-screen overflow-hidden bg-gray-100 dark:bg-gray-800">
      <div className="flex items-start justify-between">
        <div className="relative hidden h-screen shadow-lg lg:block w-80   ">
          <div className="h-full bg-zinc-800 dark:bg-gray-700 text-gray-200 p-2">
            <button className="flex w-full hover:bg-zinc-700 items-center justify-start py-3 px-2 border rounded-lg">
              <PlusSmallIcon className="h-6 w-6" />
              <span className="ml-2">New chat</span>
            </button>
            <nav className="mt-6">
              <div>
                <button
                  className="flex items-center justify-start w-full p-2 pl-6 my-2 text-gray-800 transition-colors duration-200 border-l-4 border-purple-500 dark:text-white"
                  href="#"
                >
                  <span className="mx-2 text-gray-200 text-sm font-normal">
                    Home
                  </span>
                </button>
              </div>
            </nav>
          </div>
        </div>
        <div className="flex flex-col relative w-full">
          <div className="h-screen flex justify-center px-4 pb-24 overflow-auto bg-zinc-700 md:px-6">
            <div>Chat</div>
          </div>
          <div className="absolute bottom-0 items-center justify-between bg-zinc-700 w-full h-24">
            <div className="block ml-6 lg:hidden">
              <button className="flex items-center p-2 text-gray-500 bg-white rounded-full shadow text-md">
                <svg
                  width="20"
                  height="20"
                  className="text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z"></path>
                </svg>
              </button>
            </div>
            <div className="relative z-20 flex flex-col justify-center h-full px-3 py-4 md:w-full">
              <div className="relative flex items-center justify-center mx-72 p-1 space-x-4">
                <PaperAirplaneIcon className="absolute text-zinc-400 right-5 h-5" />
                <input
                  type="text"
                  className="w-full py-1 px-3 items-center text-gray-200 bg-zinc-600 shadow-lg focus:ring-0 focus:outline-none h-12 rounded-lg"
                ></input>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Chat;

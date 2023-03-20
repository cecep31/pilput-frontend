import React, { useState, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

const Global = () => {
  //Public API that will echo messages sent to it back to the client
  const [socketUrl, setSocketUrl] = useState(
    process.env.NEXT_PUBLIC_WS_HOST + "/ws/global"
  );
  const [messageHistory, setMessageHistory] = useState([]);
  const [message, setmessage] = useState("");

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      console.log(lastMessage);
      setMessageHistory((prev) => prev.concat(lastMessage));
    }
    // console.log(messageHistory);
  }, [lastMessage]);

  const handleClickChangeSocketUrl = () => {
    setSocketUrl(process.env.NEXT_PUBLIC_WS_HOST + "/ws/global");
  };
  async function handleClickSendMessage() {
    await sendMessage(message);
    setMessageHistory((prev) => prev.concat({ data: message }));
    setmessage("");
    // console.log(messageHistory);
  }

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting...",
    [ReadyState.OPEN]: "Connected",
    [ReadyState.CLOSING]: "Disconnecting...",
    [ReadyState.CLOSED]: "Disconnected",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  return (
    <div className="absolute top-0 bottom-0 right-0 left-0 mx-auto px-10 py-10">
      <button
        className="p-2 bg-green-300 rounded-lg hover:bg-green-600"
        onClick={handleClickChangeSocketUrl}
      >
        Try To coonect
      </button>
      <div className="text-gray-500">{connectionStatus}</div>
      <br></br>

      <div className="relative flex">
        <input
          value={message}
          onChange={(e) => setmessage(e.target.value)}
          type="text"
          className="rounded-lg border-transparent flex-1 appearance-none border border-gray-500 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          placeholder="Message.."
        />

        <button
          className="border-2 rounded-lg border-gray-700 w-60 ml-2 hover:border-green-700"
          onClick={handleClickSendMessage}
          disabled={readyState !== ReadyState.OPEN}
        >
          Send
        </button>
      </div>
      <br></br>

      {/* {lastMessage ? <span>Last message: {lastMessage.data}</span> : null} */}
      <div>
        <ul>
          {messageHistory.slice().reverse().map((message, idx) => (
            <div className={message.origin ? "" : "text-right"} key={idx}>
              {message ? message.data : null}
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Global;

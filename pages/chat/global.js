import React, { useState, useCallback, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

const Global = () => {
  //Public API that will echo messages sent to it back to the client
  const [socketUrl, setSocketUrl] = useState("ws://api.pilput.dev/ws/global");
  const [messageHistory, setMessageHistory] = useState([]);
  const [message, setmessage] = useState();

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage));
    }
  }, [lastMessage, setMessageHistory]);

  const handleClickChangeSocketUrl = useCallback(
    () => setSocketUrl("ws://api.pilput.dev/ws/global"),
    []
  );

//   const handleClickSendMessage = useCallback(() => sendMessage(message), []);
  async function handleClickSendMessage() {
    await sendMessage(message);
    console.log(message);
  }

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  return (
    <div>
      <button
        className="p-2 bg-green-300 rounded-lg hover:bg-green-600"
        onClick={handleClickChangeSocketUrl}
      >
        Try To coonect
      </button>
      <span>The WebSocket is currently {connectionStatus}</span>
      <br></br>

      <div className=" relative flex">
        <input
          value={message}
          onChange={(e) => {
            setmessage(e.target.value);
          }}
          type="text"
          className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
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

      {lastMessage ? <span>Last message: {lastMessage.data}</span> : null}
      <ul>
        {messageHistory.map((message, idx) => (
          <div key={idx}>{message ? message.data : null}</div>
        ))}
      </ul>
    </div>
  );
};

export default Global;

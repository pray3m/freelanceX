import { useRouter } from "next/router";
import axios from "axios";
import { useCookies } from "react-cookie";
import { FaRegPaperPlane } from "react-icons/fa";
import { useStateProvider } from "../../context/StateContext";
import { useEffect, useState } from "react";
import { GET_MESSAGES, SEND_MESSAGE } from "../../utils/constants";

const MessageContainer = () => {
  const [cookies] = useCookies();
  const router = useRouter();
  const { orderId } = router.query;
  const [{ userInfo }] = useStateProvider();
  const [receiverId, setReceiverId] = useState(undefined);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");

  useEffect(() => {
    const getMessages = async () => {
      try {
        const { data } = await axios.get(`${GET_MESSAGES}/${orderId}`, {
          headers: {
            Authorization: `Bearer ${cookies.jwt}`,
          },
        });
        setMessages(data.messages);
        setReceiverId(data.receiverId);
      } catch (err) {
        console.log(err);
      }
    };

    if (orderId && userInfo) {
      getMessages();
    }
  }, [orderId, userInfo]);

  function formatTime(timestamp) {
    const date = new Date(timestamp);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours %= 12;
    hours = hours || 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    const formattedTime = `${hours}:${minutes} ${ampm}`;
    return formattedTime;
  }

  const sendMessage = async () => {
    if (messageText.length) {
      const response = await axios.post(
        `${SEND_MESSAGE}/${orderId}`,
        {
          message: messageText,
          receiverId,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.jwt}`,
          },
        }
      );
      if (response.status === 201) {
        setMessages([...messages, response.data.message]);
        setMessageText("");
      }
    }
  };

  return (
    <div className="h-[80vh]">
      <div className="max-h-[80vh]   flex flex-col justify-center items-center">
        <div className="bg-white py-8 px-4 shadow-2xl sm:rounded-lg sm:px-10 w-[80vw] border flex flex-col">
          <div className="mt-8">
            <div className="space-y-4 h-[50vh] overflow-y-auto pr-4 ">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.senderId === userInfo.id
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`inline-block rounded-lg ${
                      message.senderId === userInfo.id
                        ? "bg-[#1DBF73] text-white"
                        : "bg-gray-100 text-gray-800"
                    } px-4 py-2 max-w-xs break-all`}
                  >
                    <p>{message.text}</p>
                    <span className="text-sm text-gray-600">
                      {formatTime(message.createdAt)}
                    </span>
                    <span>
                      {message.senderId === userInfo.id && message.isRead && (
                        <BsCheckAll />
                      )}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex">
            <input
              type="text"
              className="rounded-full py-2 px-4 mr-2 w-full"
              placeholder="Type a message..."
              name="message"
              onChange={(e) => setMessageText(e.target.value)}
              value={messageText}
            />
            <button
              type="submit"
              className="bg-[#1DBF73] text-white rounded-full px-4 py-2"
              onClick={sendMessage}
            >
              <FaRegPaperPlane />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageContainer;

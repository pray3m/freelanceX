import { useRouter } from "next/router";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useStateProvider } from "../../context/StateContext";
import { useEffect, useState } from "react";
import { GET_MESSAGES } from "../../utils/constants";

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
        setReceiverId(data.receiver);
      } catch (err) {
        console.log(err);
      }
    };

    if (orderId && userInfo) {
      getMessages();
    }
  }, [orderId, userInfo]);

  console.log(messages);

  return <div>MessageContainer</div>;
};

export default MessageContainer;

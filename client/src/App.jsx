import { useEffect, useState, useSyncExternalStore } from "react";
import "./App.css";
import Cards from "./components/Cards";
import { motion, AnimatePresence } from "framer-motion";
import Login from "./components/Login";
import { reducerCases, useStateProvider } from "./context/StateContext";
import axios from "axios";
import { GrScorecard } from "react-icons/gr";
import { GiPaperBomb } from "react-icons/gi";
import { ADD_SCORE, GET_PLAYERS } from "./Api";
import LeaderBoard from "./components/LeaderBoard";

function App() {
  const [{ userInfo }, dispatch] = useStateProvider();
  const[dataa,setData] = useState(undefined)
  const [cardOrder, setCardOrder] = useState([1, 2, 3, 4, 5]);
  const [playersArray, setPlayerArray] = useState([]);
  const [defuseCard, setDefuseCard] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const[LeaderBoardPosition,setLeaderBoardPosition] = useState(0)
  const [showLeaderBoard, setShowLeaderBoard] = useState(false);

  const GetPlayers = async () => {
    try {
      const { data } = await axios.get(GET_PLAYERS);
      if (data.status === "success") {
        setPlayerArray(data.data);
      } else {
        alert(data.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(()=>{
    GetPlayers()
    if(playersArray){
      playersArray.slice() // Make a copy of the array to avoid mutating the original array
      .sort((a, b) => b.score - a.score) // Sort the array based on score in descending order
      .map((e, index) => {
        return (
          <div key={index}>
          {dataa._id === e._id && setLeaderBoardPosition(index+1)}
          </div>
        )
      })
    }
  },[dataa,playersArray])

  useEffect(() => {
    if (!userInfo) {
      const storedUserInfo = JSON.parse(localStorage?.getItem("userInfo"));
      if(storedUserInfo._id){
        setData(storedUserInfo)
        dispatch({
          type: reducerCases.SET_USER_INFO,
          userInfo: {storedUserInfo},
        });
      }
      else if(storedUserInfo.storedUserInfo){
        setData(storedUserInfo.storedUserInfo)
        const info = storedUserInfo.storedUserInfo
        dispatch({
          type: reducerCases.SET_USER_INFO,
          userInfo: info,
        });
    }
     else {
        setShowLogin(true);
      }
    }
  }, [userInfo, dispatch]);

  const AddScore = async () => {
   try{
    const { data } = await axios.put(ADD_SCORE, { userId: dataa?._id });
    if (data.status === "success") {
      dispatch({
        type: reducerCases.SET_USER_INFO,
        userInfo: { ...data.data },
      });
      setData(data.data)
      window.location.reload();
    } else {
      alert(data.msg);
    }
   }
   catch(err){
    console.log(err)
   }
  };

  const shuffleCards = () => {
    // Implement Fisher-Yates shuffle algorithm
    const shuffledOrder = [...cardOrder];
    for (let i = shuffledOrder.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledOrder[i], shuffledOrder[j]] = [
        shuffledOrder[j],
        shuffledOrder[i],
      ];
    }
    setCardOrder(shuffledOrder);
  };

  const showCard = (show, name, index) => {
    if (index === 1 && name === "Defuse card") {
      setDefuseCard(true);
      const newOrder = cardOrder.filter((e) => {
        return e !== index;
      });
      setCardOrder(newOrder);
    } else if (index === 2 || (index === 3 && name === "Cat card")) {
      const newOrder = cardOrder.filter((e) => {
        return e !== index;
      });
      setCardOrder(newOrder);
    } else if (index === 4 && name === "Shuffle card") {
      const newOrder = cardOrder.filter((e) => {
        return e !== index;
      });
      shuffleCards();
      setCardOrder(newOrder);
    } else if (index === 5 && name === "Exploding kitten") {
      if (defuseCard) {
        const newOrder = cardOrder.filter((e) => {
          return e !== index;
        });
        setDefuseCard(false);
        setCardOrder(newOrder);
      } else {
        alert("You Loose !!!");
        window.location.reload();
      }
    }
  };

  const renderCards = () => {
    return cardOrder.map((cardNumber) => {
      switch (cardNumber) {
        case 1:
          return (
            <motion.div
              key={cardNumber}
              layout // Enable layout animation
              initial={{ opacity: 0 }} // Initial opacity
              animate={{ opacity: 1 }} // Fade in animation
              exit={{ opacity: 0 }} // Fade out animation
              transition={{ duration: 0.5 }} // Animation duration
            >
              <Cards
                onClick={(show) => showCard(show, "Defuse card", 1)}
                key={1}
                image={"/defuse.webp"}
                title="Defuse card 🙅‍♂️"
                text="Congratulations!! You can defuse a Bomb"
              />
            </motion.div>
          );
        case 2:
          return (
            <motion.div
              key={cardNumber}
              layout // Enable layout animation
              initial={{ opacity: 0 }} // Initial opacity
              animate={{ opacity: 1 }} // Fade in animation
              exit={{ opacity: 0 }} // Fade out animation
              transition={{ duration: 0.5 }} // Animation duration
            >
              <Cards
                onClick={(show) => showCard(show, "Cat card", 2)}
                key={2}
                image={"/cat.jpg"}
                title="Cat card 😼"
                text="Congratulations!! You are Saved"
              />
            </motion.div>
          );
        case 3:
          return (
            <motion.div
              key={cardNumber}
              layout // Enable layout animation
              initial={{ opacity: 0 }} // Initial opacity
              animate={{ opacity: 1 }} // Fade in animation
              exit={{ opacity: 0 }} // Fade out animation
              transition={{ duration: 0.5 }} // Animation duration
            >
              <Cards
                onClick={(show) => showCard(show, "Cat card", 3)}
                key={3}
                image={"/cat.jpg"}
                title="Cat card 😼"
                text="Congratulations!! You are Saved"
              />
            </motion.div>
          );
        case 4:
          return (
            <motion.div
              key={cardNumber}
              layout // Enable layout animation
              initial={{ opacity: 0 }} // Initial opacity
              animate={{ opacity: 1 }} // Fade in animation
              exit={{ opacity: 0 }} // Fade out animation
              transition={{ duration: 0.5 }} // Animation duration
            >
              <Cards
                onClick={(show) => showCard(show, "Shuffle card", 4)}
                key={4}
                image={"/shuffle.jpg"}
                title="Shuffle card 🔀"
                text="Shuffling the card again"
              />
            </motion.div>
          );
        case 5:
          return (
            <motion.div
              key={cardNumber}
              layout // Enable layout animation
              initial={{ opacity: 0 }} // Initial opacity
              animate={{ opacity: 1 }} // Fade in animation
              exit={{ opacity: 0 }} // Fade out animation
              transition={{ duration: 0.5 }} // Animation duration
            >
              <Cards
                onClick={(show) => showCard(show, "Exploding kitten", 5)}
                key={5}
                image={"/bomb.jpg"}
                title="Exploding kitten card 💣"
                text="You Loose !!!"
              />
            </motion.div>
          );
        default:
          return null;
      }
    });
  };

  useEffect(() => {
    if (cardOrder.length <= 0) {
      alert("You have Won the Game Successfully");
      AddScore();
    }
  }, [cardOrder.length]);

  return (
    <>
      <div className="bg-gray-100 h-screen w-full select-none">
        {/* Home Page */}
        {!showLeaderBoard && (
          <>
            <div className="flex items-center justify-between p-2">
              <div className="flex items-center justify-end w-[58%] text-end">
                <h1 className="text-3xl w-full font-bold m-5">
                  {" "}
                  😼 Exploding Kitten{" "}
                </h1>
              </div>
              <div className="flex flex-col items-end gap-0">
                <h1 className="text-2xl font-bold mb-2 pr-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-500">
                  {dataa?.userName}
                </h1>
                <h1 className="text-3xl font-bold mb-2 pr-2 flex items-center justify-center">
                  <GiPaperBomb />
                  -- {defuseCard ? "1" : "0"}
                </h1>
                <h1 className="text-3xl font-bold mb-2 pr-2 flex items-center justify-center">
                  <GrScorecard /> -- {dataa?.score}
                </h1>
              </div>
            </div>
            <div className="flex items-center justify-center w-full">
              <AnimatePresence>{renderCards()}</AnimatePresence>
            </div>
            <div className="flex flex-col items-center justify-center">
              <button
                className="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mt-5 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 ease-in-out transform hover:scale-105 text-white font-semibold shadow-md border border-transparent hover:border-gray-300 focus:outline-none focus:border-gray-300 focus:ring focus:ring-gray-200 "
                onClick={shuffleCards}
              >
                Shuffle Card
              </button>
              <button
                className="flex items-center justify-center px-10 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mt-5 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 ease-in-out transform hover:scale-105 text-white font-semibold shadow-md border border-transparent hover:border-gray-300 focus:outline-none focus:border-gray-300 focus:ring focus:ring-gray-200 "
                onClick={()=>{setShowLeaderBoard(true)}}
              >
                Your Position -- {LeaderBoardPosition}
              </button>
            </div>
          </>
        )}
        {/* Login Modal */}
        {showLogin && <Login setShowLogin={setShowLogin} />}
        {/* LeaderBoard */}
        {showLeaderBoard && <LeaderBoard setShowLeaderBoard={setShowLeaderBoard} setLeaderBoardPosition={setLeaderBoardPosition} playersArray={playersArray}/>}
      </div>
    </>
  );
}

export default App;
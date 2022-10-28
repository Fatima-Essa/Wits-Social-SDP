import {
  collection,
  doc,
  getDoc,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
// import { motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import { firestore } from "../firebase/config";

import Header from "../components/Header";

import HomePostCard from "../components/HomePostCard";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Stories from "../components/Stories";
import Footer from "../components/Footer";
import Dropdown from "./Dropdown";

// Display posts and suggested users
const Home = () => {
  const options = [
    { value: "#b5fd8f", label: "Green" },
    { value: "#71cdff", label: "Blue" },
    { value: "#f67474", label: "Red" },
    { value: "#fdf982", label: "Yellow" },
    { value: "#ffd369", label: "Orange" },
    { value: "pink", label: "Pink" },
    { value: "#d088ff", label: "Purple" },
    { value: "grey", label: "Grey" }
  ];



  const { user } = useContext(AuthContext);
  const [suggestUsers, setSuggestUsers] = useState();
  const [posts, setposts] = useState([]);
  const [limitNum, setLimitNum] = useState(9);
  const [userProfile, setUserProfile] = useState(null);
  const [bgColour, setbgColour] = useState(['white']);
  let colour;

  console.log(bgColour);
  if (bgColour.length !== 0)
  {
    colour = bgColour[0]['value'];
  }
  else
  {
    colour = 'white';
  }



  useEffect(() => {
    const getData = async () => {       // fetch data
      const q = query(
          collection(firestore, "posts"),
          orderBy("createdAt", "desc"),
          limit(limitNum)
      );
      onSnapshot(q, (snapshot) => {
        const posts = snapshot.docs?.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setposts(posts);
        // console.log(posts);
      });
    };
    return getData();
  }, [limitNum]);     // number of posts to display
  useEffect(() => {
    const suggestUsers = async () => {  // suggest users
      const q = query(
          collection(firestore, "user"),
          orderBy("lastLogin", "desc")
      );
      onSnapshot(q, (snapshot) => {         // fetch suggested user data
        const users = snapshot.docs?.map((doc) => ({
          ...doc.data(),
          id: doc?.id,
        }));
        setSuggestUsers(users.filter((i) => i.id !== user.uid)?.slice(0, 8));
      });
    };
    return suggestUsers();
  }, [user.uid]);
  useEffect(() => {
    const getData = async () => {     // get profile data
      const userData = await getDoc(doc(firestore, `/user/${user?.uid}`));
      setUserProfile(userData.data());
    };
    getData();
  }, [user?.uid]);
  return (
      <>
        <Header />
        <div className="flex md:mt-14  max-w-4xl gap-2 mx-auto mb-8">
          <style>{'body { background-color: ' + colour + '; }'}</style>
          <div className="w-full md:w-[70%]">
            <Stories />
            <div>
              {posts?.map((post) => (
                  <HomePostCard post={post} key={post?.id} />
              ))}
            </div>
            {posts?.length === 0 && (
                <div className="flex items-center justify-center h-screen">
                  <div className="text-center">No posts yet</div>
                </div>
            )}
            <div className="flex justify-center mt-8">
              <button
                  onClick={() => setLimitNum(limitNum + 9)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Load More
              </button>
            </div>
          </div>
          <div className="hidden md:mt-7 md:block md:w-[30%] p-3">
            <div className="flex items-center justify-between w-full gap-2">
              <div>
                <img
                    src={userProfile?.photoURL}
                    className="h-14 w-15 aspect-square object-cover rounded-full"
                    alt={userProfile?.fullName}
                />
              </div>
              <div className="flex-grow">
                <Link
                    to={`/${userProfile?.username}`}
                    className="text-sm font-semibold text-gray-800"
                >
                  {userProfile?.username}
                </Link>
                <p className="text-gray-700 text-base">{userProfile?.fullName}</p>
              </div>
              {/*<div className="text-sm font-bold text-blue-500">Switch</div>*/}
            </div>
            <div>
              <div className="flex text-sm items-center my-2 justify-between">
                <div className="text-gray-700  font-semibold">
                  Accounts you might like
                </div>
                {/*<button className="text-slate-800 font-bold">See All</button>*/}
              </div>
            </div>
            <div>
              {suggestUsers?.slice(1, 10).map((item, index) => (
                  <div
                      className="flex items-center  justify-between my-2"
                      key={index}
                  >
                    <div className="flex gap-2 items-center">
                      <Link to={`/${item?.username}`}>
                        <img
                            src={item?.photoURL}
                            className="h-7 w-7 aspect-square object-cover rounded-full"
                            alt={item?.username}
                        />
                      </Link>
                      <div>
                        <Link
                            to={`/${item?.username}`}
                            className="text-sm font-semibold text-gray-800"
                        >
                          {item?.username}
                        </Link>
                        <p className="text-[10px] text-gray-500">{item.fullName}</p>
                      </div>
                    </div>
                    <Link
                        to={`/${item?.username}`}
                        className="text-xs font-bold text-blue-500"
                    >
                      View
                    </Link>
                  </div>
              ))}
            </div>
            <div className="App">
              <Dropdown
                  isSearchable
                  isMulti
                  placeHolder="Select..."
                  options={options}
                  onChange={(value) => setbgColour(value) }
              />

            </div>
          </div>
        </div>
        <Footer />
      </>
  );
};

export default Home;

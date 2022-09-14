import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FakeUsers } from "../constants/fakeData";

const StoriyCard = ({ image, username }) => {
  return (
    <div>


    </div>
  );
};

const Stories = () => {
  return (
    <main className=" md:mb-7 max-w-4xl mx-auto">
      <div className="flex space-x-2 p-6 w-full bg-white mt-8 border-gray-200 border rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-black">
        {FakeUsers.map((item, index) => (
          <StoriyCard
            key={index}
            username={item?.username}
            image={item?.photoURL}
          />
        ))}
      </div>
    </main>
  );
};

export default Stories;

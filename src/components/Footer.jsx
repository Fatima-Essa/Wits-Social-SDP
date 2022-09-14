import React from "react";

const Footer = () => {
  const date = new Date();
  return (
    <footer className="text-center p-3 font-thin max-w-4xl md:text-sm text-xs mx-auto text-gray-700 w-full">
      <div className="px-3">
        <div className="w-full ">
          <div className="flex items-center flex-wrap justify-between w-full mb-3">
            <div className="">
              {/*<a*/}
              {/*  rel="nofollow"*/}
              {/*  target="_blank"*/}
              {/*  href="https://about.facebook.com/meta"*/}
              {/*>*/}

              {/*</a>*/}
            </div>
            <div className="">
              <a
                rel="nofollow"
                href="./Footer"
                target="_blank"
              >

              </a>
            </div>
            <div className="">
              <a
                rel="nofollow"
                target="_blank"
                href="./Footer"
                // rel="nofollow noopener noreferrer"
                // target="_blank"
              >

              </a>
            </div>
            <div className="">
              <a
                rel="nofollow"
                target="_blank"
                href="./Footer"
              >

              </a>
            </div>
            <div className="">
              <a
                rel="nofollow"
                target="_blank"
                href="./Footer"
                // rel="nofollow noopener noreferrer"
                // target="_blank"
              >

              </a>
            </div>
            <div className="">
              {/*<a*/}
              {/*  rel="nofollow"*/}
              {/*  target="_blank"*/}
              {/*  href="https://developers.facebook.com/docs/instagram"*/}
              {/*>*/}

              {/*</a>*/}
            </div>
            <div className="">
              <a
                rel="nofollow"
                target="_blank"
                href="./Footer"
              >

              </a>
            </div>
            <div className="">
              <a
                rel="nofollow"
                target="_blank"
                href="./Footer"
              >

              </a>
            </div>
            <div className="">
              <a
                rel="nofollow"
                target="_blank"
                href="./Footer"
              >

              </a>
            </div>
            <div className="">
              <a
                rel="nofollow"
                target="_blank"
                href="./Footer"
              >

              </a>
            </div>
            <div className="">
              <a
                rel="nofollow"
                target="_blank"
                href="./Footer"
              >

              </a>
            </div>
            <div className="">
              <a
                rel="nofollow"
                target="_blank"
                href="./Footer"
              >
              </a>
            </div>
          </div>
        </div>
        <div className="text-sm">
          <div className="">
            <div className="">
              <span className="font-semibold">&copy; {date.getFullYear()}</span>{" "}
              Wits Social by{" "}

                Ctrl-Alt-Elite

            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

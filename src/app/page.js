// "use client";
// import React, { useState, useEffect, useRef } from "react";

// export default function RedditRoaster() {
//   const [username, setUsername] = useState("");
//   const [currentUsername, setCurrentUsername] = useState("");
//   const [roast, setRoast] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [showResults, setShowResults] = useState(false);
//   const [copySuccess, setCopySuccess] = useState(false);
//   const inputRef = useRef(null);

//   useEffect(() => {
//     if (inputRef.current) inputRef.current.focus();
//   }, []);

//   const handleKeyPress = (event) => {
//     if (event.key === "Enter") {
//       roastUser();
//     }
//   };

//   const roastUser = async () => {
//     if (!username.trim()) {
//       setError("Please enter a username first! 🤔");
//       return;
//     }

//     const cleanUsername = username.replace(/^u\//, "");
//     setCurrentUsername(cleanUsername);
//     setError("");
//     setShowResults(false);
//     setIsLoading(true);

//     try {
//       const response = await fetch(
//         `https://reddit-roaster.onrender.com/api/v1/roast/${cleanUsername}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (!response.ok)
//         throw new Error(`HTTP error! status: ${response.status}`);

//       const data = await response.json();

//       setTimeout(() => {
//         const roastText = data.data?.trim();
//         setIsLoading(false);
//         setRoast(roastText || "No roast available for this user! 🤷‍♂️");
//         setShowResults(true);
//       }, 3000);
//     } catch (error) {
//       console.error("Error:", error);
//       setTimeout(() => {
//         setIsLoading(false);
//         setError("Failed to roast this user! Maybe they're unroastable. 😅");
//       }, 1000);
//     }
//   };

//   const resetForm = () => {
//     setUsername("");
//     setCurrentUsername("");
//     setRoast("");
//     setError("");
//     setShowResults(false);
//     setIsLoading(false);
//     setCopySuccess(false);
//     setTimeout(() => {
//       if (inputRef.current) inputRef.current.focus();
//     }, 100);
//   };

//   const copyRoast = async () => {
//     try {
//       await navigator.clipboard.writeText(roast);
//       setCopySuccess(true);
//       setTimeout(() => setCopySuccess(false), 2000);
//     } catch (err) {
//       console.error("Failed to copy: ", err);
//     }
//   };

//   const shareRoast = async () => {
//     const shareText = `Check out this Reddit roast of u/${currentUsername}: "${roast}"`;

//     if (navigator.share) {
//       try {
//         await navigator.share({
//           title: "Reddit Roast",
//           text: shareText,
//           url: window.location.href,
//         });
//       } catch (err) {
//         console.error("Error sharing:", err);
//       }
//     } else {
//       try {
//         await navigator.clipboard.writeText(shareText);
//         setCopySuccess(true);
//         setTimeout(() => setCopySuccess(false), 2000);
//       } catch (err) {
//         console.error("Failed to copy: ", err);
//       }
//     }
//   };

//   return (
//     <div className="bg-gradient-to-br from-yellow-100 via-pink-50 to-purple-100 min-h-screen">
//       <style jsx>{`
//         @import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap");

//         * {
//           font-family: "Space Grotesk", sans-serif;
//         }

//         .brutalist-shadow {
//           box-shadow: 8px 8px 0px #000;
//         }

//         .brutalist-shadow-sm {
//           box-shadow: 4px 4px 0px #000;
//         }

//         .brutalist-shadow-orange {
//           box-shadow: 8px 8px 0px #fb923c;
//         }

//         .brutalist-shadow-pink {
//           box-shadow: 6px 6px 0px #f472b6;
//         }

//         .brutalist-shadow-purple {
//           box-shadow: 6px 6px 0px #a855f7;
//         }

//         .bounce-in {
//           animation: bounceIn 0.6s ease-out;
//         }

//         @keyframes bounceIn {
//           0% {
//             transform: scale(0.3);
//             opacity: 0;
//           }
//           50% {
//             transform: scale(1.05);
//           }
//           70% {
//             transform: scale(0.9);
//           }
//           100% {
//             transform: scale(1);
//             opacity: 1;
//           }
//         }

//         .loading-dots::after {
//           content: "";
//           animation: dots 1.5s infinite;
//         }

//         @keyframes dots {
//           0%,
//           20% {
//             content: "";
//           }
//           40% {
//             content: ".";
//           }
//           60% {
//             content: "..";
//           }
//           80%,
//           100% {
//             content: "...";
//           }
//         }
//       `}</style>

//       <header className="p-6 mb-8 text-center">
//         <h1 className="text-6xl font-black">
//           <span className="bg-red-400 text-white px-4 py-2 mr-2 brutalist-shadow-orange">
//             REDDIT
//           </span>
//           <span className="bg-purple-500 text-white px-4 py-2 brutalist-shadow-pink">
//             ROASTER
//           </span>
//         </h1>
//       </header>

//       <main className="max-w-2xl mx-auto px-6">
//         {!isLoading && !showResults && !error && (
//           <div className="mb-8">
//             <div className="bg-white border-4 border-black brutalist-shadow p-8 transform hover:rotate-0 transition-transform duration-300">
//               <h2 className="text-3xl font-bold mb-6 text-center">
//                 <span className="bg-yellow-300 px-3 py-1 inline-block">
//                   ENTER YOUR USERNAME
//                 </span>
//               </h2>
//               <input
//                 ref={inputRef}
//                 type="text"
//                 id="username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 placeholder="u/your_username"
//                 className="w-full p-4 text-xl font-medium text-black border-4 border-black brutalist-shadow-sm mb-4"
//                 onKeyPress={handleKeyPress}
//               />
//               <button
//                 onClick={roastUser}
//                 className="w-full bg-gradient-to-r from-orange-400 to-red-500 text-white text-2xl font-bold py-4 border-4 border-black brutalist-shadow hover:-translate-y-1 transition-all duration-200"
//               >
//                 🔥 ROAST ME! 🔥
//               </button>
//             </div>
//           </div>
//         )}

//         {isLoading && (
//           <div className="bg-blue-200 border-4 border-black brutalist-shadow p-8 text-center mb-8">
//             <div className="text-4xl mb-4">🤖</div>
//             <h3 className="text-2xl font-bold mb-4">
//               Analyzing your Reddit history...
//             </h3>
//             <div className="text-lg font-medium loading-dots">
//               Preparing your roast
//             </div>
//           </div>
//         )}

//         {showResults && (
//           <div className="bg-gradient-to-r from-pink-200 to-purple-200 border-4 border-black brutalist-shadow-purple p-8 mb-8 transform bounce-in">
//             <h3 className="text-3xl font-bold mb-6 text-center">
//               <span className="bg-red-500 text-white px-4 py-2 inline-block">
//                 YOUR ROAST
//               </span>
//             </h3>
//             <div className="bg-white border-4 border-black brutalist-shadow-sm p-6 mb-6">
//               <p className="text-base font-mono whitespace-pre-line text-gray-800 leading-relaxed">
//                 {roast}
//               </p>
//             </div>
//             <div className="flex flex-wrap justify-center gap-4">
//               <button
//                 onClick={copyRoast}
//                 className={`${
//                   copySuccess
//                     ? "bg-green-500"
//                     : "bg-green-400 hover:bg-green-300"
//                 } text-black font-bold py-2 px-4 border-4 border-black brutalist-shadow-sm`}
//               >
//                 {copySuccess ? "✅ Copied!" : "📋 Copy Roast"}
//               </button>
//               <button
//                 onClick={shareRoast}
//                 className="bg-blue-400 text-black font-bold py-2 px-4 border-4 border-black brutalist-shadow-sm hover:bg-blue-300"
//               >
//                 🔗 Share
//               </button>
//               <button
//                 onClick={resetForm}
//                 className="bg-yellow-400 text-black font-bold py-2 px-6 border-4 border-black brutalist-shadow-sm hover:bg-yellow-300"
//               >
//                 🔄 Roast Another User
//               </button>
//             </div>
//           </div>
//         )}

//         {error && (
//           <div className="bg-red-200 border-4 border-black brutalist-shadow p-8 text-center mb-8">
//             <h3 className="text-2xl font-bold mb-4">
//               ❌ Oops! Something went wrong
//             </h3>
//             <p className="text-lg mb-6 text-gray-700">{error}</p>
//             <button
//               onClick={resetForm}
//               className="bg-yellow-400 text-black font-bold py-3 px-8 border-4 border-black brutalist-shadow-sm hover:bg-yellow-300"
//             >
//               🔄 Try Again
//             </button>
//           </div>
//         )}
//       </main>

//       <footer className="mt-16 p-6 text-center">
//         <p className="text-lg font-medium text-gray-600">
//           Made with 💀 and ☕ |{" "}
//           <span className="bg-pink-300 px-2 py-1 inline-block border-2 border-black">
//             All roasts are AI-generated
//           </span>
//         </p>
//       </footer>
//     </div>
//   );
// }

"use client";
import React, { useState, useEffect, useRef } from "react";

export default function RedditRoaster() {
  const [username, setUsername] = useState("");
  const [currentUsername, setCurrentUsername] = useState("");
  const [roast, setRoast] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      roastUser();
    }
  };

  const roastUser = async () => {
    if (!username.trim()) {
      setError("Please enter a username first! 🤔");
      return;
    }

    const cleanUsername = username.replace(/^u\//, "");
    setCurrentUsername(cleanUsername);
    setError("");
    setShowResults(false);
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://reddit-roaster.onrender.com/api/v1/roast/${cleanUsername}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();

      setTimeout(() => {
        const roastText = data.data?.trim();
        setIsLoading(false);
        setRoast(roastText || "No roast available for this user! 🤷‍♂️");
        setShowResults(true);
      }, 3000);
    } catch (error) {
      console.error("Error:", error);
      setTimeout(() => {
        setIsLoading(false);
        setError("Failed to roast this user! Maybe they're unroastable. 😅");
      }, 1000);
    }
  };

  const resetForm = () => {
    setUsername("");
    setCurrentUsername("");
    setRoast("");
    setError("");
    setShowResults(false);
    setIsLoading(false);
    setCopySuccess(false);
    setTimeout(() => {
      if (inputRef.current) inputRef.current.focus();
    }, 100);
  };

  const copyRoast = async () => {
    try {
      await navigator.clipboard.writeText(roast);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const shareRoast = async () => {
    const shareText = `Check out this Reddit roast of u/${currentUsername}: "${roast}"`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Reddit Roast",
          text: shareText,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareText);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      } catch (err) {
        console.error("Failed to copy: ", err);
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-pink-100 min-h-screen">
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap");

        * {
          font-family: "Inter", sans-serif;
        }

        .mono {
          font-family: "JetBrains Mono", monospace;
        }

        .cozy-shadow {
          box-shadow: 6px 6px 0px #8b5cf6;
        }

        .cozy-shadow-sm {
          box-shadow: 3px 3px 0px #8b5cf6;
        }

        .cozy-shadow-warm {
          box-shadow: 6px 6px 0px #f97316;
        }

        .cozy-shadow-coral {
          box-shadow: 5px 5px 0px #fb7185;
        }

        .cozy-shadow-teal {
          box-shadow: 5px 5px 0px #14b8a6;
        }

        .cozy-shadow-emerald {
          box-shadow: 4px 4px 0px #10b981;
        }

        .bounce-in {
          animation: bounceIn 0.6s ease-out;
        }

        @keyframes bounceIn {
          0% {
            transform: scale(0.3);
            opacity: 0;
          }
          50% {
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .loading-dots::after {
          content: "";
          animation: dots 1.5s infinite;
        }

        @keyframes dots {
          0%,
          20% {
            content: "";
          }
          40% {
            content: ".";
          }
          60% {
            content: "..";
          }
          80%,
          100% {
            content: "...";
          }
        }

        .wiggle {
          animation: wiggle 0.3s ease-in-out;
        }

        @keyframes wiggle {
          0%,
          100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(-2deg);
          }
          75% {
            transform: rotate(2deg);
          }
        }
      `}</style>

      <header className="p-8 mb-8 text-center">
        <h1 className="text-6xl font-black">
          <span className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-6 py-3 mr-3 rounded-lg cozy-shadow-warm transform hover:rotate-1 transition-all duration-200">
            Reddit
          </span>
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg cozy-shadow-coral transform hover:-rotate-1 transition-all duration-200">
            Roaster
          </span>
        </h1>
      </header>

      <main className="max-w-2xl mx-auto px-6">
        {!isLoading && !showResults && !error && (
          <div className="mb-8">
            <div className="bg-white border-4 border-gray-800 cozy-shadow p-8 rounded-2xl transform hover:scale-105 transition-all duration-300">
              <h2 className="text-3xl font-bold mb-6 text-center">
                <span className="bg-gradient-to-r from-yellow-300 to-amber-300 text-gray-800 px-4 py-2 rounded-xl inline-block cozy-shadow-sm">
                  Enter Your Username
                </span>
              </h2>
              <input
                ref={inputRef}
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="u/your_username"
                className="w-full p-5 text-xl font-medium text-gray-800 bg-gray-50 border-4 border-gray-800 cozy-shadow-sm mb-6 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
                onKeyPress={handleKeyPress}
              />
              <button
                onClick={roastUser}
                className="w-full bg-gradient-to-r from-orange-400 to-red-500 text-white text-2xl font-bold py-5 px-8 border-4 border-gray-800 cozy-shadow-warm rounded-xl hover:scale-105 hover:-translate-y-1 transition-all duration-200 wiggle hover:wiggle"
              >
                🔥 Roast Me! 🔥
              </button>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="bg-gradient-to-r from-blue-200 to-indigo-200 border-4 border-gray-800 cozy-shadow p-8 text-center mb-8 rounded-2xl">
            <div className="text-5xl mb-4">🤖</div>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">
              Analyzing your Reddit history...
            </h3>
            <div className="text-lg font-medium loading-dots text-gray-700">
              Preparing your roast
            </div>
          </div>
        )}

        {showResults && (
          <div className="bg-gradient-to-r from-emerald-100 to-teal-100 border-4 border-gray-800 cozy-shadow-teal p-8 mb-8 rounded-2xl transform bounce-in">
            <h3 className="text-3xl font-bold mb-6 text-center">
              <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-xl inline-block cozy-shadow-coral">
                Your Roast
              </span>
            </h3>
            <div className="bg-white border-4 border-gray-800 cozy-shadow-sm p-6 mb-6 rounded-xl">
              <p className="text-base mono whitespace-pre-line text-gray-800 leading-relaxed">
                {roast}
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={copyRoast}
                className={`${
                  copySuccess
                    ? "bg-gradient-to-r from-green-400 to-emerald-400"
                    : "bg-gradient-to-r from-green-300 to-emerald-300 hover:from-green-400 hover:to-emerald-400"
                } text-gray-800 font-bold py-3 px-6 border-4 border-gray-800 cozy-shadow-emerald rounded-xl transition-all duration-200 hover:scale-105`}
              >
                {copySuccess ? "✅ Copied!" : "📋 Copy Roast"}
              </button>
              <button
                onClick={shareRoast}
                className="bg-gradient-to-r from-blue-300 to-cyan-300 text-gray-800 font-bold py-3 px-6 border-4 border-gray-800 cozy-shadow-sm rounded-xl hover:from-blue-400 hover:to-cyan-400 transition-all duration-200 hover:scale-105"
              >
                🔗 Share
              </button>
              <button
                onClick={resetForm}
                className="bg-gradient-to-r from-yellow-300 to-amber-300 text-gray-800 font-bold py-3 px-6 border-4 border-gray-800 cozy-shadow-sm rounded-xl hover:from-yellow-400 hover:to-amber-400 transition-all duration-200 hover:scale-105"
              >
                🔄 Roast Another User
              </button>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-gradient-to-r from-red-200 to-pink-200 border-4 border-gray-800 cozy-shadow-coral p-8 text-center mb-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">
              ❌ Oops! Something went wrong
            </h3>
            <p className="text-lg mb-6 text-gray-700">{error}</p>
            <button
              onClick={resetForm}
              className="bg-gradient-to-r from-yellow-300 to-amber-300 text-gray-800 font-bold py-3 px-8 border-4 border-gray-800 cozy-shadow-sm rounded-xl hover:from-yellow-400 hover:to-amber-400 transition-all duration-200 hover:scale-105"
            >
              🔄 Try Again
            </button>
          </div>
        )}
      </main>

      <footer className="mt-16 p-6 text-center">
        <p className="text-lg font-medium text-gray-600">
          Made with 💀 and ☕ |{" "}
          <span className="bg-gradient-to-r from-pink-300 to-rose-300 text-gray-800 px-3 py-1 inline-block border-2 border-gray-800 rounded-lg cozy-shadow-sm">
            All roasts are AI-generated
          </span>
        </p>
      </footer>
    </div>
  );
}

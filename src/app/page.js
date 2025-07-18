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
//   const [userData, setUserData] = useState(null);
//   const inputRef = useRef(null);

//   useEffect(() => {
//     if (inputRef.current) inputRef.current.focus();
//   }, []);

//   const handleKeyPress = (event) => {
//     if (event.key === "Enter") {
//       roastUser();
//     }
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   const getKarmaColor = (karma) => {
//     if (karma < 1000) return "from-red-300 to-red-400";
//     if (karma < 5000) return "from-yellow-300 to-yellow-400";
//     if (karma < 10000) return "from-green-300 to-green-400";
//     return "from-purple-300 to-purple-400";
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
//         const roastText = data?.data?.roast || "";
//         setRoast(
//           roastText.length > 0
//             ? roastText
//             : `No roast found for u/${cleanUsername} 🤷‍♂️ Try someone spicier!`
//         );
//         setUserData(data?.data || null);
//         setIsLoading(false);
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
//     setUserData(null);
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
//     <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-pink-100 min-h-screen">
//       <style jsx>{`
//         @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap");

//         * {
//           font-family: "Inter", sans-serif;
//         }

//         .mono {
//           font-family: "JetBrains Mono", monospace;
//         }

//         .cozy-shadow {
//           box-shadow: 6px 6px 0px #8b5cf6;
//         }

//         .cozy-shadow-sm {
//           box-shadow: 3px 3px 0px #8b5cf6;
//         }

//         .cozy-shadow-warm {
//           box-shadow: 6px 6px 0px #f97316;
//         }

//         .cozy-shadow-coral {
//           box-shadow: 5px 5px 0px #fb7185;
//         }

//         .cozy-shadow-teal {
//           box-shadow: 5px 5px 0px #14b8a6;
//         }

//         .cozy-shadow-emerald {
//           box-shadow: 4px 4px 0px #10b981;
//         }

//         .cozy-shadow-red {
//           box-shadow: 4px 4px 0px #ef4444;
//         }

//         .cozy-shadow-yellow {
//           box-shadow: 4px 4px 0px #f59e0b;
//         }

//         .cozy-shadow-blue {
//           box-shadow: 4px 4px 0px #3b82f6;
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

//         .wiggle {
//           animation: wiggle 0.3s ease-in-out;
//         }

//         @keyframes wiggle {
//           0%,
//           100% {
//             transform: rotate(0deg);
//           }
//           25% {
//             transform: rotate(-2deg);
//           }
//           75% {
//             transform: rotate(2deg);
//           }
//         }

//         .pulse-glow {
//           animation: pulseGlow 2s infinite;
//         }

//         @keyframes pulseGlow {
//           0%,
//           100% {
//             box-shadow: 0 0 20px rgba(239, 68, 68, 0.3);
//           }
//           50% {
//             box-shadow: 0 0 30px rgba(239, 68, 68, 0.6);
//           }
//         }

//         .slide-in {
//           animation: slideIn 0.5s ease-out;
//         }

//         @keyframes slideIn {
//           from {
//             transform: translateX(-100%);
//             opacity: 0;
//           }
//           to {
//             transform: translateX(0);
//             opacity: 1;
//           }
//         }

//         .username-glow {
//           text-shadow: 0 0 10px rgba(139, 92, 246, 0.3);
//         }
//       `}</style>

//       <header className="p-8 mb-8 text-center">
//         <h1 className="text-6xl font-black mb-2">
//           <span className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-6 py-3 mr-3 rounded-lg cozy-shadow-warm transform hover:rotate-1 transition-all duration-200">
//             Grill
//           </span>
//           <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg cozy-shadow-coral transform hover:-rotate-1 transition-all duration-200">
//             My Reddit
//           </span>
//         </h1>
//         <p className="text-lg font-medium text-gray-600 mt-4">
//           <span className="bg-gradient-to-r from-blue-200 to-cyan-200 text-gray-800 px-4 py-2 inline-block border-2 border-gray-800 rounded-lg cozy-shadow-sm">
//             🔥 Where Reddit profiles get the heat they deserve 🔥
//           </span>
//         </p>
//       </header>

//       <main className="max-w-4xl mx-auto px-6">
//         {!isLoading && !showResults && !error && (
//           <div className="mb-8">
//             <div className="bg-white border-4 border-gray-800 cozy-shadow p-8 rounded-2xl transform hover:scale-105 transition-all duration-300">
//               <h2 className="text-3xl font-bold mb-6 text-center">
//                 <span className="bg-gradient-to-r from-yellow-300 to-amber-300 text-gray-800 px-4 py-2 rounded-xl inline-block cozy-shadow-sm">
//                   🎯 Ready to get grilled?
//                 </span>
//               </h2>
//               <input
//                 ref={inputRef}
//                 type="text"
//                 id="username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 placeholder="u/your_username"
//                 className="w-full p-5 text-xl font-medium text-gray-800 bg-gray-50 border-4 border-gray-800 cozy-shadow-sm mb-6 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
//                 onKeyPress={handleKeyPress}
//               />
//               <button
//                 onClick={roastUser}
//                 className="w-full bg-gradient-to-r from-orange-400 to-red-500 text-white text-2xl font-bold py-5 px-8 border-4 border-gray-800 cozy-shadow-warm rounded-xl hover:scale-105 hover:-translate-y-1 transition-all duration-200 wiggle hover:wiggle pulse-glow"
//               >
//                 🔥 Fire Up The Grill! 🔥
//               </button>
//             </div>
//           </div>
//         )}

//         {isLoading && (
//           <div className="bg-gradient-to-r from-blue-200 to-indigo-200 border-4 border-gray-800 cozy-shadow p-8 text-center mb-8 rounded-2xl">
//             <div className="text-5xl mb-4">🤖</div>
//             <h3 className="text-2xl font-bold mb-4 text-gray-800">
//               Analyzing u/{currentUsername}'s Reddit history...
//             </h3>
//             <div className="text-lg font-medium loading-dots text-gray-700">
//               Preparing your roast
//             </div>
//           </div>
//         )}

//         {showResults && userData && (
//           <div className="space-y-6">
//             {/* User Profile Section */}
//             <div className="bg-gradient-to-r from-indigo-100 to-purple-100 border-4 border-gray-800 cozy-shadow p-6 rounded-2xl bounce-in">
//               <h3 className="text-2xl font-bold mb-4 text-center">
//                 <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-xl inline-block cozy-shadow-sm">
//                   📊 User Profile
//                 </span>
//               </h3>

//               <div className="flex flex-col md:flex-row items-center gap-6">
//                 <div className="flex-shrink-0 text-center">
//                   {userData.profileImage && (
//                     <img
//                       src={userData.profileImage}
//                       alt={`${currentUsername}'s Reddit profile`}
//                       className="w-24 h-24 rounded-full border-4 border-gray-800 cozy-shadow-sm mx-auto mb-3"
//                     />
//                   )}
//                   <div className="bg-gradient-to-r from-purple-300 to-pink-300 text-gray-800 px-4 py-2 rounded-xl border-3 border-gray-800 cozy-shadow-sm">
//                     <div className="text-lg font-bold username-glow">
//                       u/{currentUsername}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
//                   <div
//                     className={`bg-gradient-to-r ${getKarmaColor(
//                       userData.totalKarma
//                     )} border-3 border-gray-800 cozy-shadow-sm p-3 rounded-xl text-center`}
//                   >
//                     <div className="text-2xl font-bold text-gray-800">
//                       {userData.totalKarma.toLocaleString()}
//                     </div>
//                     <div className="text-sm font-medium text-gray-700">
//                       Total Karma
//                     </div>
//                   </div>

//                   <div className="bg-gradient-to-r from-blue-300 to-cyan-300 border-3 border-gray-800 cozy-shadow-sm p-3 rounded-xl text-center">
//                     <div className="text-2xl font-bold text-gray-800">
//                       {userData.commentKarma.toLocaleString()}
//                     </div>
//                     <div className="text-sm font-medium text-gray-700">
//                       Comment Karma
//                     </div>
//                   </div>

//                   <div className="bg-gradient-to-r from-green-300 to-emerald-300 border-3 border-gray-800 cozy-shadow-sm p-3 rounded-xl text-center">
//                     <div className="text-2xl font-bold text-gray-800">
//                       {userData.linkKarma.toLocaleString()}
//                     </div>
//                     <div className="text-sm font-medium text-gray-700">
//                       Link Karma
//                     </div>
//                   </div>

//                   <div className="bg-gradient-to-r from-pink-300 to-rose-300 border-3 border-gray-800 cozy-shadow-sm p-3 rounded-xl text-center">
//                     <div className="text-lg font-bold text-gray-800">
//                       {userData.accountAge}
//                     </div>
//                     <div className="text-sm font-medium text-gray-700">
//                       Account Age
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-4 flex flex-wrap justify-center gap-3">
//                 <div className="bg-white border-2 border-gray-800 px-3 py-1 rounded-lg">
//                   <span className="text-sm font-medium text-gray-700">
//                     📅 Joined: {formatDate(userData.createdDate)}
//                   </span>
//                 </div>

//                 {userData.isMod && (
//                   <div className="bg-gradient-to-r from-red-400 to-pink-400 border-2 border-gray-800 px-3 py-1 rounded-lg">
//                     <span className="text-sm font-bold text-white">
//                       🛡️ MODERATOR
//                     </span>
//                   </div>
//                 )}

//                 {userData.isGold && (
//                   <div className="bg-gradient-to-r from-yellow-400 to-amber-400 border-2 border-gray-800 px-3 py-1 rounded-lg">
//                     <span className="text-sm font-bold text-white">
//                       ⭐ GOLD
//                     </span>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Roast Section */}
//             <div className="bg-gradient-to-r from-red-100 to-orange-100 border-4 border-gray-800 cozy-shadow-red p-8 rounded-2xl bounce-in">
//               <h3 className="text-3xl font-bold mb-6 text-center">
//                 <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-xl inline-block cozy-shadow-coral">
//                   🔥 Fresh Off The Grill
//                 </span>
//               </h3>

//               <div className="bg-white border-4 border-gray-800 cozy-shadow-sm p-6 mb-6 rounded-xl">
//                 <div className="flex items-start gap-3 mb-4">
//                   <div className="flex-1">
//                     <p className="text-base mono whitespace-pre-line text-gray-800 leading-relaxed">
//                       {roast}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex flex-wrap justify-center gap-4">
//                 <button
//                   onClick={copyRoast}
//                   className={`${
//                     copySuccess
//                       ? "bg-gradient-to-r from-green-400 to-emerald-400"
//                       : "bg-gradient-to-r from-green-300 to-emerald-300 hover:from-green-400 hover:to-emerald-400"
//                   } text-gray-800 font-bold py-3 px-6 border-4 border-gray-800 cozy-shadow-emerald rounded-xl transition-all duration-200 hover:scale-105`}
//                 >
//                   {copySuccess ? "✅ Copied!" : "📋 Copy Roast"}
//                 </button>
//                 <button
//                   onClick={resetForm}
//                   className="bg-gradient-to-r from-yellow-300 to-amber-300 text-gray-800 font-bold py-3 px-6 border-4 border-gray-800 cozy-shadow-yellow rounded-xl hover:from-yellow-400 hover:to-amber-400 transition-all duration-200 hover:scale-105"
//                 >
//                   🔄 Grill Another User
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {error && (
//           <div className="bg-gradient-to-r from-red-200 to-pink-200 border-4 border-gray-800 cozy-shadow-coral p-8 text-center mb-8 rounded-2xl">
//             <div className="text-5xl mb-4">❌</div>
//             <h3 className="text-2xl font-bold mb-4 text-gray-800">
//               Oops! Something went wrong
//             </h3>
//             <p className="text-lg mb-6 text-gray-700">{error}</p>
//             <button
//               onClick={resetForm}
//               className="bg-gradient-to-r from-yellow-300 to-amber-300 text-gray-800 font-bold py-3 px-8 border-4 border-gray-800 cozy-shadow-sm rounded-xl hover:from-yellow-400 hover:to-amber-400 transition-all duration-200 hover:scale-105"
//             >
//               🔄 Try Again
//             </button>
//           </div>
//         )}
//       </main>

//       <footer className="mt-16 p-6 text-center">
//         <p className="text-lg font-medium text-gray-600">
//           <span className="bg-gradient-to-r from-pink-300 to-rose-300 text-gray-800 px-3 py-1 inline-block border-2 border-gray-800 rounded-lg cozy-shadow-sm">
//             All roasts are AI-generated — no feelings were harmed (except maybe
//             yours) 🔥
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
  const [userData, setUserData] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      roastUser();
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getKarmaColor = (karma) => {
    if (karma < 1000) return "from-red-300 to-red-400";
    if (karma < 5000) return "from-yellow-300 to-yellow-400";
    if (karma < 10000) return "from-green-300 to-green-400";
    return "from-purple-300 to-purple-400";
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
        const roastText = data?.data?.roast || "";
        setRoast(
          roastText.length > 0
            ? roastText
            : `No roast found for u/${cleanUsername} 🤷‍♂️ Try someone spicier!`
        );
        setUserData(data?.data || null);
        setIsLoading(false);
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
    setUserData(null);
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
          box-shadow: 4px 4px 0px #8b5cf6;
        }

        .cozy-shadow-sm {
          box-shadow: 2px 2px 0px #8b5cf6;
        }

        .cozy-shadow-warm {
          box-shadow: 4px 4px 0px #f97316;
        }

        .cozy-shadow-coral {
          box-shadow: 4px 4px 0px #fb7185;
        }

        .cozy-shadow-teal {
          box-shadow: 4px 4px 0px #14b8a6;
        }

        .cozy-shadow-emerald {
          box-shadow: 3px 3px 0px #10b981;
        }

        .cozy-shadow-red {
          box-shadow: 3px 3px 0px #ef4444;
        }

        .cozy-shadow-yellow {
          box-shadow: 3px 3px 0px #f59e0b;
        }

        .cozy-shadow-blue {
          box-shadow: 3px 3px 0px #3b82f6;
        }

        @media (max-width: 768px) {
          .cozy-shadow {
            box-shadow: 3px 3px 0px #8b5cf6;
          }
          .cozy-shadow-sm {
            box-shadow: 2px 2px 0px #8b5cf6;
          }
          .cozy-shadow-warm {
            box-shadow: 3px 3px 0px #f97316;
          }
          .cozy-shadow-coral {
            box-shadow: 3px 3px 0px #fb7185;
          }
          .cozy-shadow-teal {
            box-shadow: 3px 3px 0px #14b8a6;
          }
          .cozy-shadow-emerald {
            box-shadow: 2px 2px 0px #10b981;
          }
          .cozy-shadow-red {
            box-shadow: 2px 2px 0px #ef4444;
          }
          .cozy-shadow-yellow {
            box-shadow: 2px 2px 0px #f59e0b;
          }
          .cozy-shadow-blue {
            box-shadow: 2px 2px 0px #3b82f6;
          }
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

        .pulse-glow {
          animation: pulseGlow 2s infinite;
        }

        @keyframes pulseGlow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(239, 68, 68, 0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(239, 68, 68, 0.6);
          }
        }

        .slide-in {
          animation: slideIn 0.5s ease-out;
        }

        @keyframes slideIn {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .username-glow {
          text-shadow: 0 0 10px rgba(139, 92, 246, 0.3);
        }

        @media (max-width: 768px) {
          .pulse-glow {
            animation: none;
          }
        }
      `}</style>

      <header className="p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 md:mb-8 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-2 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
          <span className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-lg cozy-shadow-warm transform hover:rotate-1 transition-all duration-200">
            Grill
          </span>
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-lg cozy-shadow-coral transform hover:-rotate-1 transition-all duration-200">
            My Reddit
          </span>
        </h1>
        <p className="text-sm sm:text-base md:text-lg font-medium text-gray-600 mt-3 sm:mt-4 px-2">
          <span className="bg-gradient-to-r from-blue-200 to-cyan-200 text-gray-800 px-3 sm:px-4 py-2 inline-block border-2 border-gray-800 rounded-lg cozy-shadow-sm">
            🔥 Where Reddit profiles get the heat they deserve 🔥
          </span>
        </p>
      </header>

      <main className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6">
        {!isLoading && !showResults && !error && (
          <div className="mb-6 sm:mb-8">
            <div className="bg-white border-3 sm:border-4 border-gray-800 cozy-shadow p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl transform hover:scale-105 transition-all duration-300">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-center">
                <span className="bg-gradient-to-r from-yellow-300 to-amber-300 text-gray-800 px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl inline-block cozy-shadow-sm">
                  🎯 Ready to get grilled?
                </span>
              </h2>
              <input
                ref={inputRef}
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="u/your_username"
                className="w-full p-3 sm:p-4 md:p-5 text-base sm:text-lg md:text-xl font-medium text-gray-800 bg-gray-50 border-3 sm:border-4 border-gray-800 cozy-shadow-sm mb-4 sm:mb-6 rounded-lg sm:rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
                onKeyPress={handleKeyPress}
              />
              <button
                onClick={roastUser}
                className="w-full bg-gradient-to-r from-orange-400 to-red-500 text-white text-lg sm:text-xl md:text-2xl font-bold py-3 sm:py-4 md:py-5 px-6 sm:px-8 border-3 sm:border-4 border-gray-800 cozy-shadow-warm rounded-lg sm:rounded-xl hover:scale-105 hover:-translate-y-1 transition-all duration-200 wiggle hover:wiggle pulse-glow"
              >
                🔥 Fire Up The Grill! 🔥
              </button>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="bg-gradient-to-r from-blue-200 to-indigo-200 border-3 sm:border-4 border-gray-800 cozy-shadow p-4 sm:p-6 md:p-8 text-center mb-6 sm:mb-8 rounded-xl sm:rounded-2xl">
            <div className="text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4">
              🤖
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 text-gray-800">
              Analyzing u/{currentUsername}'s Reddit history...
            </h3>
            <div className="text-sm sm:text-base md:text-lg font-medium loading-dots text-gray-700">
              Preparing your roast
            </div>
          </div>
        )}

        {showResults && userData && (
          <div className="space-y-4 sm:space-y-6">
            {/* User Profile Section */}
            <div className="bg-gradient-to-r from-indigo-100 to-purple-100 border-3 sm:border-4 border-gray-800 cozy-shadow p-4 sm:p-6 rounded-xl sm:rounded-2xl bounce-in">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 text-center">
                <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl inline-block cozy-shadow-sm">
                  📊 User Profile
                </span>
              </h3>

              <div className="flex flex-col items-center gap-4 sm:gap-6">
                <div className="flex-shrink-0 text-center">
                  {userData.profileImage && (
                    <img
                      src={userData.profileImage}
                      alt={`${currentUsername}'s Reddit profile`}
                      className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full border-3 sm:border-4 border-gray-800 cozy-shadow-sm mx-auto mb-2 sm:mb-3"
                    />
                  )}
                  <div className="bg-gradient-to-r from-purple-300 to-pink-300 text-gray-800 px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl border-2 sm:border-3 border-gray-800 cozy-shadow-sm">
                    <div className="text-sm sm:text-base md:text-lg font-bold username-glow break-all">
                      u/{currentUsername}
                    </div>
                  </div>
                </div>

                <div className="flex-1 grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 w-full max-w-md sm:max-w-2xl">
                  <div
                    className={`bg-gradient-to-r ${getKarmaColor(
                      userData.totalKarma
                    )} border-2 sm:border-3 border-gray-800 cozy-shadow-sm p-2 sm:p-3 rounded-lg sm:rounded-xl text-center`}
                  >
                    <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
                      {userData.totalKarma.toLocaleString()}
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-gray-700">
                      Total Karma
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-300 to-cyan-300 border-2 sm:border-3 border-gray-800 cozy-shadow-sm p-2 sm:p-3 rounded-lg sm:rounded-xl text-center">
                    <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
                      {userData.commentKarma.toLocaleString()}
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-gray-700">
                      Comment Karma
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-300 to-emerald-300 border-2 sm:border-3 border-gray-800 cozy-shadow-sm p-2 sm:p-3 rounded-lg sm:rounded-xl text-center">
                    <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
                      {userData.linkKarma.toLocaleString()}
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-gray-700">
                      Link Karma
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-pink-300 to-rose-300 border-2 sm:border-3 border-gray-800 cozy-shadow-sm p-2 sm:p-3 rounded-lg sm:rounded-xl text-center">
                    <div className="text-sm sm:text-base md:text-lg font-bold text-gray-800">
                      {userData.accountAge}
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-gray-700">
                      Account Age
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-3 sm:mt-4 flex flex-wrap justify-center gap-2 sm:gap-3">
                <div className="bg-white border-2 border-gray-800 px-2 sm:px-3 py-1 rounded-md sm:rounded-lg">
                  <span className="text-xs sm:text-sm font-medium text-gray-700">
                    📅 Joined: {formatDate(userData.createdDate)}
                  </span>
                </div>

                {userData.isMod && (
                  <div className="bg-gradient-to-r from-red-400 to-pink-400 border-2 border-gray-800 px-2 sm:px-3 py-1 rounded-md sm:rounded-lg">
                    <span className="text-xs sm:text-sm font-bold text-white">
                      🛡️ MODERATOR
                    </span>
                  </div>
                )}

                {userData.isGold && (
                  <div className="bg-gradient-to-r from-yellow-400 to-amber-400 border-2 border-gray-800 px-2 sm:px-3 py-1 rounded-md sm:rounded-lg">
                    <span className="text-xs sm:text-sm font-bold text-white">
                      ⭐ GOLD
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Roast Section */}
            <div className="bg-gradient-to-r from-red-100 to-orange-100 border-3 sm:border-4 border-gray-800 cozy-shadow-red p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bounce-in">
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-center">
                <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl inline-block cozy-shadow-coral">
                  🔥 Fresh Off The Grill
                </span>
              </h3>

              <div className="bg-white border-3 sm:border-4 border-gray-800 cozy-shadow-sm p-4 sm:p-6 mb-4 sm:mb-6 rounded-lg sm:rounded-xl">
                <div className="flex items-start gap-3 mb-4">
                  <div className="flex-1">
                    <p className="text-sm sm:text-base mono whitespace-pre-line text-gray-800 leading-relaxed">
                      {roast}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                <button
                  onClick={copyRoast}
                  className={`${
                    copySuccess
                      ? "bg-gradient-to-r from-green-400 to-emerald-400"
                      : "bg-gradient-to-r from-green-300 to-emerald-300 hover:from-green-400 hover:to-emerald-400"
                  } text-gray-800 font-bold py-3 px-4 sm:px-6 border-3 sm:border-4 border-gray-800 cozy-shadow-emerald rounded-lg sm:rounded-xl transition-all duration-200 hover:scale-105 text-sm sm:text-base`}
                >
                  {copySuccess ? "✅ Copied!" : "📋 Copy Roast"}
                </button>
                <button
                  onClick={resetForm}
                  className="bg-gradient-to-r from-yellow-300 to-amber-300 text-gray-800 font-bold py-3 px-4 sm:px-6 border-3 sm:border-4 border-gray-800 cozy-shadow-yellow rounded-lg sm:rounded-xl hover:from-yellow-400 hover:to-amber-400 transition-all duration-200 hover:scale-105 text-sm sm:text-base"
                >
                  🔄 Grill Another User
                </button>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-gradient-to-r from-red-200 to-pink-200 border-3 sm:border-4 border-gray-800 cozy-shadow-coral p-4 sm:p-6 md:p-8 text-center mb-6 sm:mb-8 rounded-xl sm:rounded-2xl">
            <div className="text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4">
              ❌
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 text-gray-800">
              Oops! Something went wrong
            </h3>
            <p className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6 text-gray-700 px-2">
              {error}
            </p>
            <button
              onClick={resetForm}
              className="bg-gradient-to-r from-yellow-300 to-amber-300 text-gray-800 font-bold py-3 px-4 sm:px-6 md:px-8 border-3 sm:border-4 border-gray-800 cozy-shadow-sm rounded-lg sm:rounded-xl hover:from-yellow-400 hover:to-amber-400 transition-all duration-200 hover:scale-105 text-sm sm:text-base"
            >
              🔄 Try Again
            </button>
          </div>
        )}
      </main>

      <footer className="mt-8 sm:mt-12 md:mt-16 p-4 sm:p-6 text-center">
        <p className="text-sm sm:text-base md:text-lg font-medium text-gray-600 px-2">
          <span className="bg-gradient-to-r from-pink-300 to-rose-300 text-gray-800 px-3 py-1 inline-block border-2 border-gray-800 rounded-lg cozy-shadow-sm">
            All roasts are AI-generated — no feelings were harmed (except maybe
            yours) 🔥
          </span>
        </p>
      </footer>
    </div>
  );
}

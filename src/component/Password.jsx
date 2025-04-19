import React from "react";
import { useCallback, useEffect, useRef, useState } from "react";

const Password = () => {
  const [length, setlength] = useState(8);
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [Password, setPassword] = useState("");

  //useRef hook

  const passwordRef = useRef(null);

  const passwordgenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#&-_";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipBoard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(Password);
  }, [Password]);

  useEffect(() => {
    passwordgenerator();
  }, [length, numberAllowed, charAllowed, passwordgenerator]);
  return (
    <div className="flex justify-center items-center min-h-screen bg-cyan-900 px-4">
      <div className="bg-white text-black w-full max-w-md mx-auto rounded-2xl shadow-2xl p-6">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Password Generator
        </h1>

        {/* Password Display */}
        <div className="flex shadow rounded overflow-hidden mb-5">
          <input
            type="text"
            ref={passwordRef}
            value={Password}
            className="w-full py-2 px-3 border border-cyan-900 rounded-l outline-none"
            placeholder="Password"
            readOnly
          />
          <button
            onClick={copyPasswordToClipBoard}
            className="bg-cyan-900 text-white px-4 hover:bg-cyan-800 transition-all"
          >
            Copy
          </button>
        </div>

        {/* Range Slider */}
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium">
            Length: {length}
          </label>
          <input
            type="range"
            min={8}
            max={40}
            className="w-full cursor-pointer"
            value={length}
            onChange={(e) => setlength(e.target.value)}
          />
        </div>

        {/* Checkboxes */}
        <div className="flex flex-col gap-3 text-sm">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => setnumberAllowed((prev) => !prev)}
            />
            <label htmlFor="numberInput">Include Numbers</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => setcharAllowed((prev) => !prev)}
            />
            <label htmlFor="characterInput">Include Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Password;

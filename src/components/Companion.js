/** @format */
import { MenuBar } from "./Menubar";
import { ArrowLongUpIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export function TextInputWithButton({ submitText }) {
  let [text, setText] = useState("");

  return (
    <div>
      <div className="mt-1 flex rounded-md shadow-sm">
        <div className="relative flex flex-grow items-stretch focus-within:z-10">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                submitText(text);
                setText("");
              }
            }}
            className="block w-full rounded-none rounded-l-md border-gray-300 pl-5 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="button"
          className="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 active:bg-gray-200"
          onClick={() => {
            submitText(text);
            setText("");
          }}
        >
          <span>
            <ArrowLongUpIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </button>
      </div>
    </div>
  );
}

export function Companion() {
  let [answers, setAnswers] = useState([]);
  let [conversation, setConversation] = useState([
    {
      role: "system",
      content:
        'you are a helpful assistant who enjoys using emoticons like :D :P :) :(. You also never say "how may I assist you today?", or anything similar to it.',
    },
  ]);
  let [key, setKey] = useState("");
  function submitText(question) {
    setAnswers([
      ...answers,
      {
        key: key,
        question: question,
        answer: "...",
      },
    ]);
    console.log(conversation);
    fetch(
      "https://55dzshtlzc.execute-api.us-east-1.amazonaws.com/prod/question",
      {
        method: "POST",
        body: JSON.stringify({
          question: [...conversation, { role: "user", content: question }],
          token: "thesneakybackdoor",
        }),
      }
    )
      .then((response) => response.json())
      .then((answer) => {
        const key = answers.length;
        console.log(answer);

        setConversation([
          ...conversation,
          { role: "user", content: question },
          { role: "assistant", content: answer },
        ]);
        setAnswers([
          ...answers,
          {
            key: key,
            question: question,
            answer: answer,
          },
        ]);
      })
      .then(() => {
        console.log(conversation);
      });
  }
  return (
    <>
      <MenuBar currentState={0} />
      <div className="h-screen bg-stone-300 flex items-center justify-center flex-col">
        <div className="bg-stone-100  rounded-lg shadow-lg w-3/4 h-3/4 flex items-center justify-between flex-col">
          <div className="py-2">
            <h1 className="text-3xl ">Companion (ツ)</h1>
          </div>
          <div className="py-2 w-full overflow-y-auto flex items-center justify-between flex-col">
            {/* display all answers */}
            <ul>
              {answers.map((answer) => (
                <li key={answer.key}>
                  <div className="mx-48 max-w-7xl bg-slate-200 ">
                    <p className="break-words px-10">{answer.question} </p>
                  </div>
                  <div className="mx-48 max-w-7xl ">
                    <p className="break-words px-10">{answer.answer} </p>
                  </div>

                  <br></br>
                </li>
              ))}
            </ul>
          </div>
          <div className="py-2 w-1/2">
            <TextInputWithButton submitText={submitText} />
          </div>
        </div>
        <div>
          <div className="mt-1 flex rounded-md shadow-sm">
            <div className="relative flex flex-grow items-stretch focus-within:z-10">
              <input
                type="text"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                className="block w-full rounded-md border-gray-300 pl-3 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

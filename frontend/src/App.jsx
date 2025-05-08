import "./App.css";
import { useEffect, useState } from "react";

import "prismjs/themes/prism-tomorrow.css";
import Prism, { highlight, languages } from "prismjs";
import "prismjs/components/prism-javascript";

import Editor from "react-simple-code-editor";
import axios from "axios";
import Markdown from "react-markdown";

import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { Loader2 } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

function App() {
  const [code, setCode] = useState(``);
  const [review, setReview] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const reviewCode = async () => {
    try {
      setShow(true);
      setLoading(true);
      setError("");
      //Pass code to backend
      const res = await axios.post("http://localhost:8000/ai/get-review", {
        code,
      });
      setReview(res?.data);
      setLoading(false);
    } catch (error) {
      console.log("Error:", error);
      setError("Failed to fetch review. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <main className="flex flex-col md:flex-row items-center gap-4 w-full h-screen p-4 bg-gradient-to-br from-[#1b2b4f] via-[#570f8f] to-[#294ba6]">
        {/* Left part  */}
        <div className="w-full md:w-1/2 h-full relative bg-white p-2 rounded-md">
          <Editor
            value={code}
            onValueChange={(code) => setCode(code)}
            highlight={(code) => highlight(code, languages.js, "javascript")}
            padding={10}
            placeholder="Write or paste your code here..."
            className="hide-scroll"
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 16,
              height: "100%",
              width: "100%",
              overflow: "auto",
            }}
            textareaClassName="editor-textarea"
          />
          <button
            type="submit"
            onClick={reviewCode}
            className="bg-blue-600 hover:bg-blue-500 px-5 py-2 rounded-full text-lg text-white font-semibold absolute bottom-2 right-2 cursor-pointer select-none "
          >
            Check
          </button>
        </div>

        {/* Right part */}
        {show ? (
          <div className="w-full md:w-1/2 h-full bg-[rgba(255,255,255,0.3)] backdrop-blur-xl rounded-md p-4 overflow-auto hide-scroll">
            {loading ? (
              <span className="flex items-center h-full justify-center">
                <Loader2 className="h-8 w-8 animate-spin mr-2" />
                <span>Reviewing code...</span>
              </span>
            ) : error ? (
              // Display error message if there's an error
              <div className="text-red-600 font-semibold text-center">
                {error}
              </div>
            ) : (
              // Display the review once it's fetched
              <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
            )}
          </div>
        ) : (
          // Lottie animation before review is fetched
          <div className="w-full md:w-1/2 h-full">
            <DotLottieReact
              src="https://lottie.host/d2ef1bd5-a7e4-407c-8fa7-dc6b8e711b12/D0X4uYXiQW.lottie"
              loop
              height={50}
              width={50}
              autoplay
            />
          </div>
        )}
      </main>
    </>
  );
}

export default App;

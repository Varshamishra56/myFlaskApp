import { useState, useEffect } from "react";

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // Handle adding/removing dark mode class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("http://localhost:8080/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
      setResponse(text || "No response from Gemini");
    } catch (err) {
      console.error(err);
      setResponse("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen transition-colors duration-500 bg-gradient-to-br from-blue-100 via-white to-pink-100 dark:from-gray-900 dark:via-gray-950 dark:to-black flex items-center justify-center px-4">
      <div className="absolute top-4 right-6"></div>

      <div className="w-full max-w-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 transition-all duration-300">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800 dark:text-white tracking-tight">
          🤖 Ask{" "}
          <span className="text-blue-600 dark:text-blue-400">Gemini</span>
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          <input
            type="text"
            placeholder="Ask me anything..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="flex-1 px-5 py-3 text-lg rounded-full border border-gray-300 dark:border-gray-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white transition"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-full text-white bg-blue-500 hover:bg-blue-600 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Thinking..." : "Ask Gemini"}
          </button>
        </form>

        {response && (
          <div className="bg-white dark:bg-gray-800 border border-blue-200 dark:border-gray-700 p-6 rounded-2xl shadow-inner text-gray-700 dark:text-gray-200 whitespace-pre-wrap">
            <p className="text-md">
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                Gemini says:
              </span>
              <br />
              {response}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

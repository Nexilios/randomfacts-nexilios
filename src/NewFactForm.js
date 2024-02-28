import { useState } from "react";
import supabase from "./supabase";
import { CATEGORIES } from "./App";

function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}
export default function NewFactForm({ setShowForm, setFacts }) {
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const textLimit = 200;

  async function handleSubmit(e) {
    e.preventDefault();

    if (text && isValidHttpUrl(source) && category) {
      setIsUploading(true);
      const { newFact, error } = await supabase
        .from("facts")
        .insert([{ text, source, category }])
        .select();
      setIsUploading(false);

      if (!error) setFacts((facts) => [newFact[0], ...facts]);
      else alert(error.message);

      setShowForm(false);
    }
  }

  return (
    <form className="fact-form" onSubmit={handleSubmit}>
      <input
        value={text}
        type="text"
        placeholder="Share a fact with the world..."
        onChange={(e) => setText(e.target.value)}
        maxLength={textLimit}
        disabled={isUploading}
      />

      <span>{textLimit - text.length}</span>

      <input
        value={source}
        type="text"
        placeholder="https://example.com"
        onChange={(e) => setSource(e.target.value)}
        disabled={isUploading}
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        disabled={isUploading}
      >
        <option value="">Choose category:</option>

        {CATEGORIES.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className="btn btn-large" disabled={isUploading}>
        Post
      </button>
    </form>
  );
}

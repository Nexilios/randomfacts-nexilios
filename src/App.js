import { useEffect, useState } from "react";
import supabase from "./supabase";

import Header from "./Header";
import NewFactForm from "./NewFactForm";
import CategoryFilter from "./CategoryFilter";
import FactList from "./FactList";

import "./style.css";

export const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

function App() {
  const [showForm, setShowForm] = useState(false);
  const [facts, setFacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("all");

  useEffect(
    function () {
      async function getFacts() {
        setIsLoading(true);

        let query = supabase.from("facts").select("*");
        if (currentCategory !== "all") {
          query = query.eq("category", currentCategory);
        }

        const { data: facts, error } = await query
          .order("votesInteresting", { ascending: false })
          .limit(20);

        if (!error) setFacts(facts);
        else alert(error.message);

        setIsLoading(false);
      }
      getFacts();
    },
    [currentCategory]
  );

  function handleShowForm() {
    setShowForm((show) => !show);
  }

  return (
    <>
      <Header showForm={showForm} handleShowForm={handleShowForm} />

      {showForm ? (
        <NewFactForm setShowForm={setShowForm} setFacts={setFacts} />
      ) : null}

      <main className="main">
        <CategoryFilter setCurrentCategory={setCurrentCategory} />
        {isLoading ? (
          <Loader />
        ) : (
          <FactList setFacts={setFacts} facts={facts} />
        )}
      </main>
    </>
  );
}

function Loader() {
  return <p className="message">Loading data ...</p>;
}

export default App;

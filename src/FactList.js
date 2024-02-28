import Fact from "./Fact";

export default function FactList({ setFacts, facts }) {
  return (
    <section>
      <ul className="facts-list">
        {facts.length > 0 ? (
          facts.map((fact) => (
            <Fact key={fact.id} setFacts={setFacts} fact={fact} />
          ))
        ) : (
          <p className="message">
            No fact for this category yet! Post the first one ✌
          </p>
        )}
      </ul>
    </section>
  );
}

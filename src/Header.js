export default function Header({ showForm, handleShowForm }) {
  const appTitle = "Random Facts";

  return (
    <header className="header">
      <div className="logo">
        <img src="logo.png" alt="Web Logo" />
        <h1>{appTitle}</h1>
      </div>
      <button className="btn btn-large btn-open" onClick={handleShowForm}>
        {showForm ? "Close" : "Share a fact"}
      </button>
    </header>
  );
}

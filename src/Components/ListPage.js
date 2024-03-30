const List = () => {
  const [items, setItems] = useState([]);

  const addItem = () => {
    const newItemName = `Item ${items.length + 1}`;
    const newItem = { name: newItemName };
    setItems([...items, newItem]);
  };

  return (
    <div className="content">
      <div className="sidebar">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/list">List</Link>
            </li>
          </ul>
        </nav>
      </div>
      <header>
        <button onClick={addItem} className="new-button">
          New
        </button>
      </header>
      <div className="item-list">
        {items.map((item, index) => (
          <div className="item" key={index}>
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};

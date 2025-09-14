import React from "react";

// Reusable ProductCard Component
function ProductCard({ name, price, status }) {
  return (
    <div style={styles.card}>
      <h3 style={{ fontWeight: "bold" }}>{name}</h3>
      <p>Price: ${price}</p>
      <p>Status: {status}</p>
    </div>
  );
}

// Main Component
export default function App() {
  return (
    <div style={styles.container}>
      <h2 style={{ textAlign: "center", fontWeight: "bold" }}>Products List</h2>
      <div style={styles.products}>
        <ProductCard name="Wireless Mouse" price="25.99" status="In Stock" />
        <ProductCard name="Keyboard" price="45.5" status="Out of Stock" />
        <ProductCard name="Monitor" price="199.99" status="In Stock" />
      </div>
    </div>
  );
}

// Inline Styles
const styles = {
  container: {
    border: "1px solid black",
    padding: "20px",
    width: "80%",
    margin: "20px auto",
  },
  products: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "20px",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "15px",
    textAlign: "center",
    width: "200px",
    boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
  },
};

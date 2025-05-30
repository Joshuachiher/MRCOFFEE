import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db, auth } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import { signOut } from "firebase/auth";
import "./home.css";

export function Home() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    const getTopProducts = async () => {
      try {
        const productCollectionRef = collection(db, "products");
        const data = await getDocs(productCollectionRef);
        const sortedData = data.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .sort((a, b) => b.orders - a.orders) // Assuming 'orders' field exists
          .slice(0, 5);
        setTopProducts(sortedData);
      } catch (error) {
        console.error("Failed to load products:", error);
      }
    };

    getTopProducts();
  }, [currentUser, navigate]);

  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  if (!currentUser) {
    return null; // Or a loading spinner while redirect happens
  }

  return (
    <div className="home-page">
      <div style={{ padding: 20, textAlign: "right" }}>
        <p>Welcome, {currentUser.email}</p>
        <button onClick={logout}>Logout</button>
      </div>

      {/* Banner */}
      <section className="banner">
        <img src="/banner.jpg" alt="Coffee Banner" className="banner-image" />
        <h1 className="slogan">Every Cup Tells a Story</h1>
      </section>

      {/* Most Ordered */}
      <section className="most-ordered">
        <h2>Most Ordered</h2>
        <div className="product-list">
          {topProducts.map((item) => (
            <div key={item.id} className="product-card">
              <img src={item.imageUrl} alt={item.name} />
              <h3>{item.name}</h3>
              <p>${item.price}</p>
              <Link to="/menu"><button>Order Now</button></Link>
            </div>
          ))}
        </div>
      </section>

      {/* Rewards Preview */}
      <section className="rewards-preview">
        <h2>Limited-Time Promo</h2>
        <div className="reward-card">
          <img src="/reward.jpg" alt="Promo Reward" />
          <div>
            <h3>Buy 2 Get 1 Free</h3>
            <p>Only available this week! Don’t miss it.</p>
            <Link to="/rewards"><button>See More</button></Link>
          </div>
        </div>
      </section>

      {/* CEO Section */}
      <section className="ceo-section">
        <img src="/ceo.jpg" alt="Susanto Liman" className="ceo-image" />
        <div>
          <h3>Susanto Liman</h3>
          <p>Founder & CEO of MR.COFFEE</p>
          <p>"We brew more than coffee, we brew connection."</p>
          <Link to="/about"><button>About Us</button></Link>
        </div>
      </section>
    </div>
  );
}

export default Home;

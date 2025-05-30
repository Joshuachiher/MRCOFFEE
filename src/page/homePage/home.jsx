import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import "./home.css";

export function Home() {
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    const getTopProducts = async () => {
      try {
        const productCollectionRef = collection(db, "products");
        const data = await getDocs(productCollectionRef);
        const sortedData = data.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .sort((a, b) => b.orders - a.orders) // Assuming 'orders' field in Firebase
          .slice(0, 5); // Top 5
        setTopProducts(sortedData);
      } catch (error) {
        console.error("Failed to load products:", error);
      }
    };

    getTopProducts();
  }, []);

  return (
    <div className="home-page">
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

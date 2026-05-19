import { useEffect, useMemo, useState } from "react";

const api = {
  user: import.meta.env.VITE_USER_SERVICE_URL || "http://localhost:8081",
  food: import.meta.env.VITE_FOOD_SERVICE_URL || "http://localhost:8082",
  order: import.meta.env.VITE_ORDER_SERVICE_URL || "http://localhost:8083",
  payment: import.meta.env.VITE_PAYMENT_SERVICE_URL || "http://localhost:8084",
};

const fetchJson = async (url, options = {}) => {
  const response = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const text = await response.text();
  if (!response.ok) {
    throw new Error(text || response.statusText);
  }
  return text ? JSON.parse(text) : null;
};

const initialForm = { username: "", password: "" };
const paymentMethods = ["Credit Card", "Bank Transfer", "Cash"];

function App() {
  const [mode, setMode] = useState("login");
  const [auth, setAuth] = useState(() => {
    const saved = localStorage.getItem("foodOrderAuth");
    return saved ? JSON.parse(saved) : null;
  });
  const [form, setForm] = useState(initialForm);
  const [foods, setFoods] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [method, setMethod] = useState(paymentMethods[0]);

  const cartItems = useMemo(
    () => cart.filter((item) => item.quantity > 0),
    [cart],
  );
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0,
  );

  useEffect(() => {
    fetchFoods();
    if (auth) {
      fetchOrders(auth.userId);
    }
  }, [auth]);

  useEffect(() => {
    localStorage.setItem("foodOrderAuth", JSON.stringify(auth));
  }, [auth]);

  const fetchFoods = async () => {
    try {
      const data = await fetchJson(`${api.food}/foods`);
      setFoods(data);
    } catch (error) {
      setMessage("Không tải được danh sách món ăn: " + error.message);
    }
  };

  const fetchOrders = async (userId) => {
    try {
      const data = await fetchJson(`${api.order}/order?userId=${userId}`);
      setOrders(data.orders || []);
    } catch (error) {
      setMessage("Không tải được đơn hàng: " + error.message);
    }
  };

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleAuth = async () => {
    try {
      const url =
        mode === "login" ? `${api.user}/login` : `${api.user}/register`;
      const result = await fetchJson(url, {
        method: "POST",
        body: JSON.stringify(form),
      });

      if (mode === "login") {
        setAuth({
          token: result.token,
          userId: result.id,
          username: result.username,
          role: result.role,
        });
        setMessage("Đăng nhập thành công");
        setMode("menu");
      } else {
        setMessage("Đăng ký thành công, mời đăng nhập");
        setMode("login");
      }
      setForm(initialForm);
    } catch (error) {
      setMessage("Lỗi đăng nhập/đăng ký: " + error.message);
    }
  };

  const logout = () => {
    setAuth(null);
    setCart([]);
    setOrders([]);
    localStorage.removeItem("foodOrderAuth");
    setMessage("Đã đăng xuất");
  };

  const addToCart = (food) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === food.id);
      if (exists) {
        return prev.map((item) =>
          item.id === food.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...prev, { ...food, quantity: 1 }];
    });
  };

  const changeQuantity = (foodId, quantity) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === foodId
            ? { ...item, quantity: Math.max(0, quantity) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const placeOrder = async () => {
    if (!auth) {
      setMessage("Vui lòng đăng nhập trước khi đặt hàng");
      return;
    }
    if (cartItems.length === 0) {
      setMessage("Giỏ hàng trống");
      return;
    }

    const payload = {
      userId: auth.userId,
      items: cartItems.map((item) => ({
        foodId: item.id,
        quantity: item.quantity,
      })),
    };

    try {
      const result = await fetchJson(`${api.order}/order`, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      setMessage("Đã tạo đơn hàng: " + result.message);
      setCart([]);
      fetchOrders(auth.userId);
    } catch (error) {
      setMessage("Lỗi tạo đơn hàng: " + error.message);
    }
  };

  const payOrder = async (order) => {
    if (!auth) {
      setMessage("Vui lòng đăng nhập để thanh toán");
      return;
    }
    try {
      const result = await fetchJson(`${api.payment}/payments`, {
        method: "POST",
        body: JSON.stringify({
          orderId: order.id,
          userId: auth.userId,
          method,
        }),
      });
      setMessage("Thanh toán thành công: " + result.message);
      fetchOrders(auth.userId);
      setSelectedOrder(null);
    } catch (error) {
      setMessage("Lỗi thanh toán: " + error.message);
    }
  };

  const selectedOrderItems = selectedOrder ? selectedOrder.items || [] : [];

  return (
    <div className="app-shell">
      <header>
        <div>
          <h1>Food Order App</h1>
          {auth && <p className="subtitle">Xin chào, {auth.username}</p>}
        </div>
        <nav>
          {auth ? (
            <button onClick={logout}>Đăng xuất</button>
          ) : (
            <>
              <button onClick={() => setMode("login")}>Đăng nhập</button>
              <button onClick={() => setMode("register")}>Đăng ký</button>
            </>
          )}
        </nav>
      </header>

      {message && <div className="message">{message}</div>}

      {!auth ? (
        <section className="card auth-card">
          <h2>{mode === "login" ? "Đăng nhập" : "Đăng ký"}</h2>
          <div className="form-field">
            <label>Username</label>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
            />
          </div>
          <div className="form-field">
            <label>Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
            />
          </div>
          <button onClick={handleAuth}>
            {mode === "login" ? "Đăng nhập" : "Đăng ký"}
          </button>
          <p className="hint">
            {mode === "login" ? "Chưa có tài khoản?" : "Đã có tài khoản?"}{" "}
            <button
              className="link-button"
              onClick={() => setMode(mode === "login" ? "register" : "login")}
            >
              {mode === "login" ? "Đăng ký" : "Đăng nhập"}
            </button>
          </p>
        </section>
      ) : (
        <main>
          <section className="card grid-two">
            <div>
              <h2>Thực đơn</h2>
              {foods.length === 0 ? (
                <p>Không có món ăn để hiển thị</p>
              ) : (
                <div className="food-grid">
                  {foods.map((food) => (
                    <article key={food.id} className="food-card">
                      <strong>{food.name}</strong>
                      <p>{food.description || "Không có mô tả"}</p>
                      <div className="food-meta">
                        <span>
                          {food.price?.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </span>
                        <button onClick={() => addToCart(food)}>
                          Thêm vào giỏ
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h2>Giỏ hàng</h2>
              {cartItems.length === 0 ? (
                <p>Giỏ hàng trống</p>
              ) : (
                <div className="cart-list">
                  {cartItems.map((item) => (
                    <div key={item.id} className="cart-item">
                      <div>
                        <strong>{item.name}</strong>
                        <p>
                          {item.price.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </p>
                      </div>
                      <div className="quantity-control">
                        <button
                          onClick={() =>
                            changeQuantity(item.id, item.quantity - 1)
                          }
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() =>
                            changeQuantity(item.id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="cart-total">
                    <strong>Tổng:</strong>
                    <span>
                      {cartTotal.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </span>
                  </div>
                  <button className="primary" onClick={placeOrder}>
                    Đặt hàng
                  </button>
                </div>
              )}
            </div>
          </section>

          <section className="card">
            <h2>Đơn hàng của bạn</h2>
            {orders.length === 0 ? (
              <p>Chưa có đơn hàng</p>
            ) : (
              <div className="order-list">
                {orders.map((order) => (
                  <article key={order.id} className="order-card">
                    <div>
                      <strong>Đơn #{order.id}</strong>
                      <small>Trạng thái: {order.status}</small>
                    </div>
                    <div>
                      <span>
                        {order.totalAmount?.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </span>
                      <button onClick={() => setSelectedOrder(order)}>
                        Chi tiết
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

          {selectedOrder && (
            <section className="card">
              <h2>Chi tiết đơn #{selectedOrder.id}</h2>
              <div className="order-detail">
                <p>
                  <strong>Trạng thái:</strong> {selectedOrder.status}
                </p>
                <p>
                  <strong>Tổng tiền:</strong>{" "}
                  {selectedOrder.totalAmount?.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </p>
                <h3>Danh sách món</h3>
                <ul>
                  {selectedOrder.items?.map((item, index) => (
                    <li key={index}>
                      {item.foodName} x {item.quantity} ={" "}
                      {(item.price * item.quantity).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </li>
                  ))}
                </ul>

                {selectedOrder.status !== "PAID" &&
                selectedOrder.status !== "COMPLETED" ? (
                  <div className="payment-panel">
                    <label>Phương thức thanh toán</label>
                    <select
                      value={method}
                      onChange={(event) => setMethod(event.target.value)}
                    >
                      {paymentMethods.map((methodOption) => (
                        <option key={methodOption} value={methodOption}>
                          {methodOption}
                        </option>
                      ))}
                    </select>
                    <button
                      className="primary"
                      onClick={() => payOrder(selectedOrder)}
                    >
                      Thanh toán đơn này
                    </button>
                  </div>
                ) : (
                  <div className="paid-note">Đơn hàng đã thanh toán</div>
                )}
                <button
                  className="link-button"
                  onClick={() => setSelectedOrder(null)}
                >
                  Đóng
                </button>
              </div>
            </section>
          )}
        </main>
      )}
    </div>
  );
}

export default App;

const express = require('express');
const Redis = require('ioredis');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Kết nối Data Grid chung của nhóm
const redis = new Redis({
  host: '172.16.67.164', 
  port: 6379
});

/**
 * API: Checkout (Thanh toán)
 * POST /checkout
 * Body: { "userId": "101" }
 */
app.post('/checkout', async (req, res) => {
  const { userId } = req.body;

  try {
    // 1. Lấy giỏ hàng của Người số 3 từ Redis
    const cartItems = await redis.hgetall(`cart:${userId}`);

    if (!cartItems || Object.keys(cartItems).length === 0) {
      return res.status(400).json({ error: "Giỏ hàng trống, không thể checkout!" });
    }

    let totalAmount = 0;
    const orderDetails = [];

    // 2. Duyệt qua từng sản phẩm trong giỏ để tính tiền & kiểm tra kho lần cuối
    for (const [productId, quantity] of Object.entries(cartItems)) {
      const productJSON = await redis.get(`product:${productId}`);
      
      if (!productJSON) continue;

      const product = JSON.parse(productJSON);
      const qty = parseInt(quantity);

      // Kiểm tra kho lần cuối (Atomic Check)
      if (product.stock < qty) {
        return res.status(400).json({ error: `Sản phẩm ${product.name} đã hết hàng!` });
      }

      // Tính tổng tiền
      totalAmount += product.price * qty;
      orderDetails.push({
        productId,
        name: product.name,
        quantity: qty,
        price: product.price
      });

      // 3. Cập nhật giảm kho trực tiếp trên vùng nhớ của Người 2/5
      product.stock -= qty;
      await redis.set(`product:${productId}`, JSON.stringify(product));
    }

    // 4. Lưu đơn hàng vào Redis
    const orderId = Date.now();
    const orderData = {
      orderId,
      userId,
      items: orderDetails,
      totalAmount,
      status: 'SUCCESS',
      createdAt: new Date().toISOString()
    };

    await redis.set(`order:${userId}:${orderId}`, JSON.stringify(orderData));

    // 5. Xóa giỏ hàng sau khi thanh toán thành công (Nhiệm vụ dọn dẹp cho Người 3)
    await redis.del(`cart:${userId}`);

    console.log(`✅ Order ${orderId} created for User ${userId}`);
    res.json({ message: "Thanh toán thành công!", order: orderData });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Lỗi hệ thống khi xử lý đơn hàng" });
  }
});

const PORT = 8083; // Port quy định cho PU3 - Order
const MY_IP = '172.16.67.184'; // IP máy của bạn (hoặc máy bạn đang ngồi)

app.listen(PORT, '0.0.0.0', () => {
    console.log(`=============================================`);
    console.log(`🚀 ORDER PROCESSING UNIT (PU3) RUNNING`);
    console.log(`🌐 API Checkout: http://${MY_IP}:${PORT}/checkout`);
    console.log(`=============================================`);
});
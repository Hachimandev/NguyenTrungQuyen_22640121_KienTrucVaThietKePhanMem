package order.state;

import order.content.OrderContext;

class DeliveredState implements OrderState {
    public void handle(OrderContext context) {
        System.out.println("Đơn hàng đã giao.");
    }
}

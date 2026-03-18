package order.state;

import order.content.OrderContext;

public interface OrderState {
    void handle(OrderContext context);
}

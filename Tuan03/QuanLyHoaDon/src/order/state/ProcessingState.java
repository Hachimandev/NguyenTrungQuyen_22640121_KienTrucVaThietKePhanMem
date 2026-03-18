package order.state;

import order.content.OrderContext;
import order.strategy.ShippingStrategy;

public class ProcessingState implements OrderState {
    public void handle(OrderContext context) {
        System.out.println("Đóng gói và vận chuyển...");
        context.setStrategy(new ShippingStrategy());
        context.executeStrategy();
        context.setState(new DeliveredState());
    }
}
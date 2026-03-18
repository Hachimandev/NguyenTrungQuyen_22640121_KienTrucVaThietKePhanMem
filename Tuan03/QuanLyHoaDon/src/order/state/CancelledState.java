package order.state;

import order.content.OrderContext;
import order.strategy.RefundStrategy;


public class CancelledState implements OrderState {
    public void handle(OrderContext context) {
        System.out.println("Hủy đơn và hoàn tiền...");
        context.setStrategy(new RefundStrategy());
        context.executeStrategy();
    }
}
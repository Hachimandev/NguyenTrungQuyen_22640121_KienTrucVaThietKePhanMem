package order.state;

import order.content.OrderContext;
import order.strategy.ValidateStrategy;

public class NewOrderState implements OrderState {
    public void handle(OrderContext context) {
        System.out.println("Kiểm tra thông tin đơn hàng...");
        context.setStrategy(new ValidateStrategy());
        context.executeStrategy();
        context.setState(new ProcessingState());
    }
}

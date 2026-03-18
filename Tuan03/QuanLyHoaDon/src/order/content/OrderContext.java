package order.content;

import order.decorator.LoggingDecorator;
import order.state.OrderState;
import order.strategy.OrderStrategy;  

public class OrderContext {
    private OrderState state;
    private OrderStrategy strategy;

    public OrderContext(OrderState state) {
        this.state = state;
    }

    public void setState(OrderState state) {
        this.state = state;
    }

    public void setStrategy(OrderStrategy strategy) {
        this.strategy = new LoggingDecorator(strategy);
    }

    public void executeStrategy() {
        strategy.execute();
    }

    public void process() {
        state.handle(this);
    }
}
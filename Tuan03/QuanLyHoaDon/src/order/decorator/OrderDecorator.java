package order.decorator;

import order.strategy.OrderStrategy;

public abstract class OrderDecorator implements OrderStrategy {
    protected OrderStrategy strategy;

    public OrderDecorator(OrderStrategy strategy) {
        this.strategy = strategy;
    }

    public void execute() {
        strategy.execute();
    }
}
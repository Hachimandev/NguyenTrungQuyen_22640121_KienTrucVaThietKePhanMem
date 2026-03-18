package order.decorator;

import order.strategy.OrderStrategy;

public class LoggingDecorator extends OrderDecorator {
    public LoggingDecorator(OrderStrategy strategy) {
        super(strategy);
    }

    public void execute() {
        System.out.println("[LOG] Start");
        super.execute();
        System.out.println("[LOG] End");
    }
}
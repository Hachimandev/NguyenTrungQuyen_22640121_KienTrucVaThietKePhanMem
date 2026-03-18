package payment.context;

import payment.state.PaymentState;
import payment.strategy.PaymentStrategy;

public class PaymentContext {
    private PaymentState state;
    private PaymentStrategy strategy;

    public PaymentContext(PaymentState state, PaymentStrategy strategy) {
        this.state = state;
        this.strategy = strategy;
    }

    public void setState(PaymentState state) {
        this.state = state;
    }

    public PaymentStrategy getStrategy() {
        return strategy;
    }

    public void process(double amount) {
        state.process(this, amount);
    }
}
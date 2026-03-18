package payment.decorator;

import payment.strategy.PaymentStrategy;

public class FeeDecorator extends PaymentDecorator {
    public FeeDecorator(PaymentStrategy payment) {
        super(payment);
    }

    public double pay(double amount) {
        return super.pay(amount + 10);
    }
}
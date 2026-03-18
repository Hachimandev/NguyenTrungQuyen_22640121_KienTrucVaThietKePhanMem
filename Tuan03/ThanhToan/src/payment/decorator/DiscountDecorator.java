package payment.decorator;

import payment.strategy.PaymentStrategy;

public class DiscountDecorator extends PaymentDecorator {
    public DiscountDecorator(PaymentStrategy payment) {
        super(payment);
    }

    public double pay(double amount) {
        return super.pay(amount * 0.9);
    }
}

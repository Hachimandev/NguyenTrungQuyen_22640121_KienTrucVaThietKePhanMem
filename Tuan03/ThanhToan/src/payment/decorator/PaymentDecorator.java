package payment.decorator;

import payment.strategy.PaymentStrategy;

public abstract class PaymentDecorator implements PaymentStrategy {
    protected PaymentStrategy payment;

    public PaymentDecorator(PaymentStrategy payment) {
        this.payment = payment;
    }

    public double pay(double amount) {
        return payment.pay(amount);
    }
}
package payment.state;

import payment.context.PaymentContext;

public interface PaymentState {
    void process(PaymentContext context, double amount);
}
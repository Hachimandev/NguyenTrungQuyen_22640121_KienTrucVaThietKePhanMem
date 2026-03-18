package payment.state;

import payment.context.PaymentContext;

public class CompletedState implements PaymentState {
    public void process(PaymentContext context, double amount) {
        System.out.println("Thanh toán đã hoàn tất");
    }
}

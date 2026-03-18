package payment.state;

import payment.context.PaymentContext;

public class PendingState implements PaymentState {
    public void process(PaymentContext context, double amount) {
        double result = context.getStrategy().pay(amount);
        System.out.println("Đã thanh toán: " + result);
        context.setState(new CompletedState());
    }
}

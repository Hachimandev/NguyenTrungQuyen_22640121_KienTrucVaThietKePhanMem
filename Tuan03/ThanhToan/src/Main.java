import payment.context.PaymentContext;
import payment.decorator.DiscountDecorator;
import payment.decorator.FeeDecorator;
import payment.state.PendingState;
import payment.strategy.CreditCardPayment;
import payment.strategy.PaymentStrategy;

public class Main {
    public static void main(String[] args) {
        PaymentStrategy payment = new DiscountDecorator(
            new FeeDecorator(new CreditCardPayment())
        );

        PaymentContext context = new PaymentContext(
            new PendingState(),
            payment
        );

        context.process(100);
        context.process(100);
    }
}

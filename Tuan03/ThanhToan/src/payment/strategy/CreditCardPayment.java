package payment.strategy;

public class CreditCardPayment implements PaymentStrategy {
    public double pay(double amount) {
        System.out.println("Thanh toán bằng thẻ");
        return amount;
    }
}
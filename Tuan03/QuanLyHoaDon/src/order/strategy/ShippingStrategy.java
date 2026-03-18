package order.strategy;

public class ShippingStrategy implements OrderStrategy {
    public void execute() {
        System.out.println("Ship đơn hàng");
    }
}
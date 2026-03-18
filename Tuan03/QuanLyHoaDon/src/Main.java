import order.content.OrderContext;
import order.state.NewOrderState;

public class Main {
    public static void main(String[] args) {
        OrderContext order = new OrderContext(new NewOrderState());

        order.process(); 
        order.process(); 
      order.process(); 
}
    }

import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';

const OrderPage = () => {
  return (
    <div>
      <Link
        className={buttonVariants({ variant: 'default' })}
        href="/admin/orders/create-order"
      >
        Create Order
      </Link>
    </div>
  );
};

export default OrderPage;

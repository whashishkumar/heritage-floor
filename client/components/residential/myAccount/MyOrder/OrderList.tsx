'use client';
import { useState, useMemo, useEffect } from 'react';
import OrderCard from './OrderCard';
import OrderCardMobile from './OrderCardMobile';
import orders from './orders.json';
import { OrderEndPoints } from '@/lib/api/orderEndPoints';
import Pagination from '@/components/ui/Pagnation';
import Loader from '@/components/ui/Loader';
import { useToast } from '@/components/ui/Tooltip';

interface OrderListProps {
  filteredOrders?: any;
  isSearching?: boolean;
  onOrderSelect: (orderId: number) => void;
}

export default function OrderList({ filteredOrders, isSearching, onOrderSelect }: OrderListProps) {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState('all');
  const [myOrdersList, setMyOrderList] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Use filtered orders from search if available, otherwise use fetched orders
  const displayOrders = filteredOrders || myOrdersList;
  const { data, meta } = displayOrders || {};
  const { current_page, last_page } = meta || [];
  const [currentPage, setCurrentPage] = useState(1);
  const [orderTabs, setOrderTabs] = useState<any | null>(null);

  // Calculate counts and filter orders based on status
  const { tabFilteredOrders, processingCount, shippedCount, canceledCount } = useMemo(() => {
    const processingStatuses = ['Pending', 'In Process', 'Processing'];
    const shippedStatuses = ['Deliverde', 'Delivered', 'Shipped'];
    const canceledStatuses = ['Canceled', 'Cancelled'];

    const processing = orders.filter((order) =>
      processingStatuses.some((status) => status.toLowerCase() === order.status.toLowerCase())
    );
    const shipped = orders.filter((order) =>
      shippedStatuses.some((status) => status.toLowerCase() === order.status.toLowerCase())
    );
    const canceled = orders.filter((order) =>
      canceledStatuses.some((status) => status.toLowerCase() === order.status.toLowerCase())
    );

    let filtered = orders;
    if (activeTab === 'processing') {
      filtered = processing;
    } else if (activeTab === 'shipped') {
      filtered = shipped;
    } else if (activeTab === 'canceled') {
      filtered = canceled;
    }

    return {
      tabFilteredOrders: filtered,
      processingCount: processing.length,
      shippedCount: shipped.length,
      canceledCount: canceled.length,
    };
  }, [activeTab]);

  const fetchMyOrdersList = async () => {
    setIsLoading(true);
    try {
      const resp = await OrderEndPoints.getAllOrderItems();
      setMyOrderList(resp);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchOrderStaus = async () => {
    const resp = await OrderEndPoints.getOrderStatus();
    setOrderTabs(resp?.data);
  };

  const handlePagination = (page: number) => {
    setCurrentPage(page);
  };

  const getOrderDetail = async (id: number) => {
    onOrderSelect(id);
  };

  const handleActiveTab = async (status: any, code: any) => {
    setActiveTab(code);
    setCurrentPage(1); // Reset to first page when changing tabs
    setIsLoading(true);
    try {
      const resp = await OrderEndPoints.filterOrderListItems('', status);
      setMyOrderList(resp);
    } catch (err) {
      console.error('Error filtering orders:', err);
      showToast('Failed to load orders');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancleOrder = async (id: number) => {
    const respCancel = await OrderEndPoints.cancleOrder(id);
    showToast(respCancel?.message);
    const resp = await OrderEndPoints.getAllOrderItems();
    setMyOrderList(resp);
  };
  const handleReOrder = async (id: number) => {
    const respOrder = await OrderEndPoints.reOrderItem(id);
    if (respOrder.status === 200) {
      showToast('ReOrder Item sucess');
    }
    const resp = await OrderEndPoints.getAllOrderItems();
    setMyOrderList(resp);
  };

  const handleTrackingOrder = async (id: number) => {
    const payload = {
      tracking_number: id,
    };
    const resp = await OrderEndPoints.trackingOrder(payload);
    console.log(resp, 'tracking');
  };

  useEffect(() => {
    fetchMyOrdersList();
    fetchOrderStaus();
  }, []);

  return (
    <div className="space-y-4">
      {/* Tabs - Responsive with horizontal scroll on mobile */}
      <div className="overflow-x-auto">
        <div className="flex gap-4 md:gap-6 text-gray-700 border-b pb-3 min-w-max md:min-w-0">
          {orderTabs?.map((t: any) => (
            <button
              key={t.code}
              onClick={() => handleActiveTab(t.status, t.code)}
              className={`pb-2 cursor-pointer poppins-font font-medium text-sm md:text-base whitespace-nowrap ${
                activeTab === t.code ? 'border-b-2 border-black text-black' : 'text-gray-500'
              }`}
            >
              {`${typeof t.label === 'object' ? t.label.name : t.label} (${t.count})`}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Order Table - Hidden on mobile */}
      <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow-sm">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b font-medium poppins-font">
              <th className="text-left p-4 text-sm font-semibold text-gray-700">Order ID</th>
              <th className="text-left p-4 text-sm font-semibold text-gray-700">Customer</th>
              <th className="text-left p-4 text-sm font-semibold text-gray-700">Date</th>
              <th className="text-left p-4 text-sm font-semibold text-gray-700">Price</th>
              <th className="text-left p-4 text-sm font-semibold text-gray-700">Payment</th>
              <th className="text-left p-4 text-sm font-semibold text-gray-700">Status</th>
              <th className="text-left p-4 text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isSearching || isLoading ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-gray-500">
                  <Loader />
                </td>
              </tr>
            ) : data?.length > 0 ? (
              data?.map((order: any, index: any) => (
                <OrderCard
                  key={`${order.id}-${index}`}
                  order={order}
                  getOrderDetail={getOrderDetail}
                  handleCancleOrder={handleCancleOrder}
                  handleTrackingOrder={handleTrackingOrder}
                  handleReOrder={handleReOrder}
                />
              ))
            ) : (
              <tr>
                <td colSpan={7} className="p-8 text-center text-gray-500">
                  {filteredOrders
                    ? 'No orders found matching your search.'
                    : 'No orders found for this status.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Order Cards - Hidden on desktop */}
      <div className="md:hidden space-y-3">
        {isSearching || isLoading ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center text-gray-500 poppins-font">
            <Loader />
          </div>
        ) : data?.length > 0 ? (
          data?.map((order: any, index: any) => (
            <OrderCardMobile
              key={`${order.id}-${index}`}
              order={order}
              getOrderDetail={getOrderDetail}
            />
          ))
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center text-gray-500 poppins-font">
            {filteredOrders
              ? 'No orders found matching your search.'
              : 'No orders found for this status.'}
          </div>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={last_page}
        onPageChange={handlePagination}
      />
    </div>
  );
}

import React, { useState } from 'react'
import { useUpdateOrderStatusMutation } from '../../../../redux/features/orders/orderApi';

const UpdateOrderModal = ({order, isOpen, onClose}) => {
    const [orderStatus, setOrderStatus] = useState(order?.orderStatus);

    const [updateOrderStatus, {isLoading, error}] = useUpdateOrderStatusMutation();

    const handleUpdateOrderStatus = async ()=> {
        try {
            await updateOrderStatus({id: order?._id, orderStatus})
            onClose();
        } catch (error) {
            console.error("Failed to update order status:", err);
        }
    }

    if(!isOpen) return null;
  return (
    <div className="inset-0 z-50 fixed flex items-center justify-center  bg-opacity-20 bg-black">
            <div className="bg-white p-10 rounded-lg shadow-xl  w-1/3">
                <h2 className="text-xl font-bold mb-4 mt-4">Update Order Status</h2>
                <div className="mb-4 space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Order Id
          </label>
          <input
            type="email"
            value={order?.orderId}
            readOnly
            className=" block focus:outline-none mt-2 p-3 w-full border rounded-md shadow-sm  "
          />
        </div>
                <div className="mb-4 space-y-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="orderStatus">Status</label>
                    <select
                        id="orderStatus"
                        value={orderStatus}
                        onChange={(e) => setOrderStatus(e.target.value)}
                        className="mt-2 p-3 w-full border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
                    >
                        <option value="Ordered">Ordered</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
                
                {error && <p className="text-red-500 mb-4">Failed to update status.</p>}
                
                <div className="flex justify-end pt-5">
                    <button
                        onClick={onClose}
                        className="text-primary ring-1 ring-primary text-sm bg-white px-4 py-2 rounded mr-2"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleUpdateOrderStatus}
                        disabled={isLoading}
                        className="bg-primary text-sm text-white px-4 py-2 rounded"
                    >
                        {isLoading ? 'Updating...' : 'Update'}
                    </button>
                </div>
            </div>
        </div>
  )
}

export default UpdateOrderModal

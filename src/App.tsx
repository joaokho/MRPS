import React, { useState, useCallback, useMemo } from 'react';
import { categories, menuItems, MenuItem } from './data/menuData';
import { OrderItem, Order } from './types';
import {
  ShoppingCart, Plus, Minus, Trash2, X, Search,
  CreditCard, Banknote, Receipt, Clock, Users,
  ChefHat, CheckCircle, Coffee,
  UtensilsCrossed, Percent, ArrowLeft,
  History, Grid3X3,
} from 'lucide-react';

// ============ UTILITY FUNCTIONS ============
const generateId = () => Math.random().toString(36).substr(2, 9);
const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`;
const TAX_RATE = 0.08;

// ============ MAIN APP COMPONENT ============
export default function App() {
  const [view, setView] = useState<'pos' | 'orders' | 'settings'>('pos');
  const [selectedCategory, setSelectedCategory] = useState('popular');
  const [searchQuery, setSearchQuery] = useState('');
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [tableNumber, setTableNumber] = useState<number | null>(null);
  const [orderType, setOrderType] = useState<'dine-in' | 'takeaway'>('dine-in');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showTableModal, setShowTableModal] = useState(false);
  const [showOrderNotes, setShowOrderNotes] = useState(false);
  const [orderNotes, setOrderNotes] = useState('');
  const [completedOrders, setCompletedOrders] = useState<Order[]>([]);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Calculate totals
  const subtotal = useMemo(() =>
    orderItems.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0),
    [orderItems]
  );
  const discountAmount = subtotal * (discountPercent / 100);
  const taxableAmount = subtotal - discountAmount;
  const tax = taxableAmount * TAX_RATE;
  const total = taxableAmount + tax;
  const itemCount = orderItems.reduce((sum, item) => sum + item.quantity, 0);

  // Filter menu items
  const filteredItems = useMemo(() => {
    let items = menuItems;
    if (searchQuery) {
      items = items.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else if (selectedCategory !== 'all') {
      items = items.filter(item => item.category === selectedCategory);
    }
    return items;
  }, [selectedCategory, searchQuery]);

  // Add item to order
  const addItem = useCallback((menuItem: MenuItem) => {
    setOrderItems(prev => {
      const existing = prev.find(item => item.menuItem.id === menuItem.id);
      if (existing) {
        return prev.map(item =>
          item.menuItem.id === menuItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { menuItem, quantity: 1 }];
    });
  }, []);

  // Update quantity
  const updateQuantity = useCallback((itemId: string, delta: number) => {
    setOrderItems(prev => {
      return prev.map(item => {
        if (item.menuItem.id === itemId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  }, []);

  // Remove item
  const removeItem = useCallback((itemId: string) => {
    setOrderItems(prev => prev.filter(item => item.menuItem.id !== itemId));
  }, []);

  // Get quantity of item in order
  const getItemQuantity = useCallback((itemId: string) => {
    const item = orderItems.find(i => i.menuItem.id === itemId);
    return item ? item.quantity : 0;
  }, [orderItems]);

  // Complete order
  const completeOrder = useCallback((paymentMethod: 'cash' | 'card' | 'split') => {
    const order: Order = {
      id: generateId(),
      items: [...orderItems],
      tableNumber,
      orderType,
      status: 'completed',
      createdAt: new Date(),
      completedAt: new Date(),
      subtotal,
      tax,
      discount: discountAmount,
      total,
      paymentMethod,
      notes: orderNotes,
    };
    setCompletedOrders(prev => [order, ...prev]);
    setOrderItems([]);
    setTableNumber(null);
    setDiscountPercent(0);
    setOrderNotes('');
    setShowPaymentModal(false);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
  }, [orderItems, tableNumber, orderType, subtotal, tax, discountAmount, total, orderNotes]);

  // Clear order
  const clearOrder = useCallback(() => {
    if (orderItems.length > 0) {
      if (window.confirm('Clear all items from current order?')) {
        setOrderItems([]);
        setDiscountPercent(0);
        setOrderNotes('');
      }
    }
  }, [orderItems.length]);

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-3 py-2 md:px-6 md:py-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="bg-orange-500 text-white p-1.5 md:p-2 rounded-lg">
              <UtensilsCrossed size={20} className="md:w-6 md:h-6" />
            </div>
            <div>
              <h1 className="text-base md:text-xl font-bold text-gray-800">QuickBite POS</h1>
              <p className="text-[10px] md:text-xs text-gray-500 hidden sm:block">Restaurant Order System</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-1 md:gap-2">
            <button
              onClick={() => setView('pos')}
              className={`flex items-center gap-1 px-2 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-all ${
                view === 'pos' ? 'bg-orange-100 text-orange-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Grid3X3 size={14} className="md:w-4 md:h-4" />
              <span className="hidden sm:inline">POS</span>
            </button>
            <button
              onClick={() => setView('orders')}
              className={`flex items-center gap-1 px-2 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-all ${
                view === 'orders' ? 'bg-orange-100 text-orange-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <History size={14} className="md:w-4 md:h-4" />
              <span className="hidden sm:inline">Orders</span>
              {completedOrders.length > 0 && (
                <span className="bg-orange-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                  {completedOrders.length}
                </span>
              )}
            </button>
          </nav>

          {/* Order Info */}
          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={() => setShowTableModal(true)}
              className="flex items-center gap-1 bg-gray-100 px-2 md:px-3 py-1.5 rounded-lg text-xs md:text-sm hover:bg-gray-200 transition-colors"
            >
              <Users size={14} className="text-gray-600" />
              <span className="text-gray-700">
                {tableNumber ? `T-${tableNumber}` : orderType === 'takeaway' ? 'Takeaway' : 'Select Table'}
              </span>
            </button>
            <div className="text-right hidden md:block">
              <p className="text-xs text-gray-500">
                <Clock size={12} className="inline mr-1" />
                {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      {view === 'pos' ? (
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Menu Section */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Search Bar */}
            <div className="px-3 py-2 md:px-4 md:py-3 bg-white border-b border-gray-100">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search menu items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 md:py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>

            {/* Category Tabs */}
            <div className="bg-white border-b border-gray-100 overflow-x-auto flex-shrink-0">
              <div className="flex gap-1 px-3 py-2 min-w-max">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => { setSelectedCategory(cat.id); setSearchQuery(''); }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium whitespace-nowrap transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-orange-500 text-white shadow-md shadow-orange-200'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <span>{cat.emoji}</span>
                    <span>{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Menu Grid */}
            <div className="flex-1 overflow-y-auto p-3 md:p-4">
              {filteredItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <Search size={48} className="mb-3 opacity-50" />
                  <p className="text-lg font-medium">No items found</p>
                  <p className="text-sm">Try a different search or category</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-3">
                  {filteredItems.map(item => {
                    const qty = getItemQuantity(item.id);
                    return (
                      <button
                        key={item.id}
                        onClick={() => addItem(item)}
                        className={`relative text-left p-3 md:p-4 rounded-xl border-2 transition-all active:scale-[0.97] ${
                          qty > 0
                            ? 'border-orange-400 bg-orange-50 shadow-md shadow-orange-100'
                            : 'border-gray-100 bg-white hover:border-orange-200 hover:shadow-md'
                        }`}
                      >
                        {qty > 0 && (
                          <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold shadow-lg">
                            {qty}
                          </span>
                        )}
                        {item.popular && (
                          <span className="absolute top-2 left-2 text-[10px] bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded-full font-medium">
                            ⭐ Popular
                          </span>
                        )}
                        <div className="text-2xl md:text-3xl mb-2 mt-1">{item.emoji}</div>
                        <h3 className="font-semibold text-gray-800 text-xs md:text-sm leading-tight mb-1">
                          {item.name}
                        </h3>
                        <p className="text-[10px] md:text-xs text-gray-500 line-clamp-1 mb-2">
                          {item.description}
                        </p>
                        <p className="font-bold text-orange-600 text-sm md:text-base">
                          {formatCurrency(item.price)}
                        </p>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Order Panel - Desktop: Right side, Mobile: Bottom drawer */}
          <div className="md:w-96 lg:w-[420px] bg-white border-t md:border-t-0 md:border-l border-gray-200 flex flex-col max-h-[45vh] md:max-h-full">
            {/* Order Header */}
            <div className="px-4 py-3 border-b border-gray-100 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingCart size={18} className="text-orange-500" />
                  <h2 className="font-bold text-gray-800">Current Order</h2>
                  {itemCount > 0 && (
                    <span className="bg-orange-100 text-orange-700 text-xs px-2 py-0.5 rounded-full font-medium">
                      {itemCount} items
                    </span>
                  )}
                </div>
                {orderItems.length > 0 && (
                  <button
                    onClick={clearOrder}
                    className="text-red-500 hover:text-red-700 text-xs font-medium flex items-center gap-1"
                  >
                    <Trash2 size={12} />
                    Clear
                  </button>
                )}
              </div>
              {/* Order type toggle */}
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => setOrderType('dine-in')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    orderType === 'dine-in' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  🍽️ Dine In
                </button>
                <button
                  onClick={() => setOrderType('takeaway')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    orderType === 'takeaway' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  🥡 Takeaway
                </button>
              </div>
            </div>

            {/* Order Items */}
            <div className="flex-1 overflow-y-auto px-4 py-2">
              {orderItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 py-8">
                  <Coffee size={40} className="mb-3 opacity-40" />
                  <p className="text-sm font-medium">No items yet</p>
                  <p className="text-xs">Tap menu items to add</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {orderItems.map(item => (
                    <div
                      key={item.menuItem.id}
                      className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg"
                    >
                      <span className="text-lg">{item.menuItem.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs md:text-sm font-medium text-gray-800 truncate">
                          {item.menuItem.name}
                        </p>
                        <p className="text-xs text-orange-600 font-semibold">
                          {formatCurrency(item.menuItem.price * item.quantity)}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => updateQuantity(item.menuItem.id, -1)}
                          className="w-6 h-6 md:w-7 md:h-7 flex items-center justify-center bg-white border border-gray-200 rounded-md hover:bg-gray-100 active:scale-95 transition-all"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-6 text-center text-xs md:text-sm font-bold text-gray-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.menuItem.id, 1)}
                          className="w-6 h-6 md:w-7 md:h-7 flex items-center justify-center bg-orange-500 text-white rounded-md hover:bg-orange-600 active:scale-95 transition-all"
                        >
                          <Plus size={12} />
                        </button>
                        <button
                          onClick={() => removeItem(item.menuItem.id)}
                          className="w-6 h-6 md:w-7 md:h-7 flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md ml-1 transition-all"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Order Summary & Actions */}
            {orderItems.length > 0 && (
              <div className="border-t border-gray-100 px-4 py-3 flex-shrink-0 bg-gray-50">
                <div className="space-y-1.5 text-sm mb-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  {discountPercent > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({discountPercent}%)</span>
                      <span>-{formatCurrency(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-600">
                    <span>Tax ({(TAX_RATE * 100).toFixed(0)}%)</span>
                    <span>{formatCurrency(tax)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-gray-800 text-base pt-1.5 border-t border-gray-200">
                    <span>Total</span>
                    <span className="text-orange-600">{formatCurrency(total)}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-3 gap-2 mb-2">
                  <button
                    onClick={() => setShowDiscountModal(true)}
                    className="flex flex-col items-center gap-0.5 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors text-xs font-medium"
                  >
                    <Percent size={14} />
                    Discount
                  </button>
                  <button
                    onClick={() => setShowOrderNotes(true)}
                    className="flex flex-col items-center gap-0.5 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-xs font-medium"
                  >
                    <Receipt size={14} />
                    Notes
                  </button>
                  <button
                    onClick={() => setShowTableModal(true)}
                    className="flex flex-col items-center gap-0.5 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors text-xs font-medium"
                  >
                    <Users size={14} />
                    Table
                  </button>
                </div>

                <button
                  onClick={() => setShowPaymentModal(true)}
                  className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-200 active:scale-[0.98] transition-all text-sm md:text-base flex items-center justify-center gap-2"
                >
                  <CreditCard size={18} />
                  Charge {formatCurrency(total)}
                </button>
              </div>
            )}
          </div>
        </div>
      ) : view === 'orders' ? (
        <OrdersView orders={completedOrders} onBack={() => setView('pos')} />
      ) : null}

      {/* Payment Modal */}
      {showPaymentModal && (
        <PaymentModal
          total={total}
          itemCount={itemCount}
          onPay={completeOrder}
          onClose={() => setShowPaymentModal(false)}
        />
      )}

      {/* Table Selection Modal */}
      {showTableModal && (
        <TableModal
          selectedTable={tableNumber}
          onSelect={(num) => { setTableNumber(num); setShowTableModal(false); }}
          onClose={() => setShowTableModal(false)}
        />
      )}

      {/* Discount Modal */}
      {showDiscountModal && (
        <DiscountModal
          currentDiscount={discountPercent}
          onApply={(percent) => { setDiscountPercent(percent); setShowDiscountModal(false); }}
          onClose={() => setShowDiscountModal(false)}
        />
      )}

      {/* Order Notes Modal */}
      {showOrderNotes && (
        <NotesModal
          notes={orderNotes}
          onSave={(notes) => { setOrderNotes(notes); setShowOrderNotes(false); }}
          onClose={() => setShowOrderNotes(false)}
        />
      )}

      {/* Success Toast */}
      {showSuccessToast && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-bounce z-50">
          <CheckCircle size={20} />
          <span className="font-medium">Order completed successfully!</span>
        </div>
      )}
    </div>
  );
}

// ============ PAYMENT MODAL ============
function PaymentModal({ total, itemCount, onPay, onClose }: {
  total: number;
  itemCount: number;
  onPay: (method: 'cash' | 'card' | 'split') => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-end md:items-center justify-center z-50 p-0 md:p-4">
      <div className="bg-white w-full md:max-w-md md:rounded-2xl rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Payment</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X size={20} />
          </button>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">{itemCount} items</span>
            <span className="text-sm text-gray-500">Total</span>
          </div>
          <p className="text-3xl font-bold text-orange-600">{formatCurrency(total)}</p>
        </div>

        <p className="text-sm text-gray-500 mb-3 font-medium">Select payment method:</p>

        <div className="space-y-3">
          <button
            onClick={() => onPay('card')}
            className="w-full flex items-center gap-4 p-4 border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all active:scale-[0.98]"
          >
            <div className="bg-blue-100 p-3 rounded-xl">
              <CreditCard size={24} className="text-blue-600" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-800">Card Payment</p>
              <p className="text-xs text-gray-500">Credit / Debit Card</p>
            </div>
          </button>

          <button
            onClick={() => onPay('cash')}
            className="w-full flex items-center gap-4 p-4 border-2 border-gray-200 rounded-xl hover:border-green-400 hover:bg-green-50 transition-all active:scale-[0.98]"
          >
            <div className="bg-green-100 p-3 rounded-xl">
              <Banknote size={24} className="text-green-600" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-800">Cash Payment</p>
              <p className="text-xs text-gray-500">Pay with cash</p>
            </div>
          </button>

          <button
            onClick={() => onPay('split')}
            className="w-full flex items-center gap-4 p-4 border-2 border-gray-200 rounded-xl hover:border-purple-400 hover:bg-purple-50 transition-all active:scale-[0.98]"
          >
            <div className="bg-purple-100 p-3 rounded-xl">
              <Receipt size={24} className="text-purple-600" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-800">Split Payment</p>
              <p className="text-xs text-gray-500">Multiple payment methods</p>
            </div>
          </button>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-4 py-3 border border-gray-200 rounded-xl text-gray-600 font-medium hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

// ============ TABLE MODAL ============
function TableModal({ selectedTable, onSelect, onClose }: {
  selectedTable: number | null;
  onSelect: (num: number) => void;
  onClose: () => void;
}) {
  const tables = Array.from({ length: 20 }, (_, i) => i + 1);
  return (
    <div className="fixed inset-0 bg-black/50 flex items-end md:items-center justify-center z-50 p-0 md:p-4">
      <div className="bg-white w-full md:max-w-md md:rounded-2xl rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Select Table</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X size={20} />
          </button>
        </div>

        <div className="grid grid-cols-4 gap-3 mb-4">
          {tables.map(num => (
            <button
              key={num}
              onClick={() => onSelect(num)}
              className={`aspect-square rounded-xl flex flex-col items-center justify-center font-bold text-lg transition-all active:scale-95 ${
                selectedTable === num
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-orange-100 hover:text-orange-700'
              }`}
            >
              <Users size={18} className="mb-1 opacity-60" />
              {num}
            </button>
          ))}
        </div>

        <button
          onClick={() => { onSelect(0); }}
          className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 font-medium hover:border-orange-300 hover:text-orange-600 transition-colors flex items-center justify-center gap-2"
        >
          <ChefHat size={16} />
          Takeaway / No Table
        </button>
      </div>
    </div>
  );
}

// ============ DISCOUNT MODAL ============
function DiscountModal({ currentDiscount, onApply, onClose }: {
  currentDiscount: number;
  onApply: (percent: number) => void;
  onClose: () => void;
}) {
  const presets = [0, 5, 10, 15, 20, 25];
  const [custom, setCustom] = useState(currentDiscount > 0 && !presets.includes(currentDiscount) ? String(currentDiscount) : '');

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end md:items-center justify-center z-50 p-0 md:p-4">
      <div className="bg-white w-full md:max-w-sm md:rounded-2xl rounded-t-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Discount</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X size={20} />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4">
          {presets.map(percent => (
            <button
              key={percent}
              onClick={() => onApply(percent)}
              className={`py-3 rounded-xl font-bold text-sm transition-all active:scale-95 ${
                currentDiscount === percent
                  ? 'bg-purple-500 text-white shadow-lg'
                  : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
              }`}
            >
              {percent}%
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Custom %"
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            min="0"
            max="100"
            className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
          <button
            onClick={() => onApply(Number(custom) || 0)}
            className="px-6 py-3 bg-purple-500 text-white rounded-xl font-medium hover:bg-purple-600 transition-colors"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

// ============ NOTES MODAL ============
function NotesModal({ notes, onSave, onClose }: {
  notes: string;
  onSave: (notes: string) => void;
  onClose: () => void;
}) {
  const [text, setText] = useState(notes);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end md:items-center justify-center z-50 p-0 md:p-4">
      <div className="bg-white w-full md:max-w-sm md:rounded-2xl rounded-t-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Order Notes</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X size={20} />
          </button>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Special instructions, allergies, etc."
          className="w-full h-32 px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
        />

        <div className="flex gap-2 mt-4">
          <button
            onClick={onClose}
            className="flex-1 py-3 border border-gray-200 rounded-xl text-gray-600 font-medium hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(text)}
            className="flex-1 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

// ============ ORDERS VIEW ============
function OrdersView({ orders, onBack }: { orders: Order[]; onBack: () => void }) {
  const totalSales = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      <div className="p-4 md:p-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-2 hover:bg-gray-200 rounded-lg">
              <ArrowLeft size={20} />
            </button>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Order History</h2>
              <p className="text-sm text-gray-500">{orders.length} orders today</p>
            </div>
          </div>
          <div className="bg-green-50 px-4 py-2 rounded-xl">
            <p className="text-xs text-green-600 font-medium">Today's Sales</p>
            <p className="text-lg font-bold text-green-700">{formatCurrency(totalSales)}</p>
          </div>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <Receipt size={48} className="mb-3 opacity-40" />
            <p className="text-lg font-medium">No completed orders</p>
            <p className="text-sm">Completed orders will appear here</p>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map(order => (
              <div key={order.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1">
                      <CheckCircle size={12} />
                      Completed
                    </span>
                    <span className="text-xs text-gray-500">
                      {order.completedAt?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <span className="font-bold text-gray-800">{formatCurrency(order.total)}</span>
                </div>

                <div className="space-y-1">
                  {order.items.map(item => (
                    <div key={item.menuItem.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {item.menuItem.emoji} {item.menuItem.name} × {item.quantity}
                      </span>
                      <span className="text-gray-500">{formatCurrency(item.menuItem.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span>{order.orderType === 'dine-in' ? `Table ${order.tableNumber || '-'}` : '🥡 Takeaway'}</span>
                    <span className="capitalize">💳 {order.paymentMethod}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

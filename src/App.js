import React, { useState, useMemo } from 'react';
import { ChefHat, User, Clock, CheckCircle, XCircle, Store, MessageCircle, Send, Users, Hourglass, UtensilsCrossed, ArrowRight, LogIn, ArrowLeft, Code, Lock, MapPin, Tag, Flame, X, Trash2, Check, ChevronRight } from 'lucide-react';
import './App.css'; 

// --- DATABASE ---
const INITIAL_DATA = [
  {
    id: 1,
    username: 'vendor1',
    password: '123',
    name: "Roti Canai Corner",
    image: "https://images.unsplash.com/photo-1621256272828-b80c102a9019?q=80&w=600&auto=format&fit=crop", 
    location: "Stall 01",
    isOpen: true,
    operatingHours: "7:00 AM - 11:00 AM",
    description: "Authentic Roti Canai, Naan, and Special Rolls.",
    queueLevel: 'medium',
    activePromos: [], 
    menu: [
      // --- ROTI CANAI ---
      { category: "Roti Canai", name: "Roti Canai Kosong", inStock: true, price: "RM 1.20" },
      { category: "Roti Canai", name: "Roti Telur", inStock: true, price: "RM 2.50" },
      { category: "Roti Canai", name: "Roti Susu", inStock: true, price: "RM 2.00" },
      { category: "Roti Canai", name: "Roti Planta", inStock: true, price: "RM 2.00" },
      { category: "Roti Canai", name: "Roti Bom", inStock: true, price: "RM 2.00" },
      { category: "Roti Canai", name: "Roti Bawang", inStock: true, price: "RM 1.80" },
      { category: "Roti Canai", name: "Roti Cheese", inStock: true, price: "RM 2.50" },
      { category: "Roti Canai", name: "Roti Pisang", inStock: true, price: "RM 4.00" },
      { category: "Roti Canai", name: "Roti Tampal", inStock: true, price: "RM 2.50" },
      { category: "Roti Canai", name: "Roti Sardin", inStock: true, price: "RM 3.50" },
      { category: "Roti Canai", name: "Roti Sosej", inStock: true, price: "RM 2.50" },
      { category: "Roti Canai", name: "Roti Sarang Burung", inStock: true, price: "RM 4.00" },
      { category: "Roti Canai", name: "Roti Telur Cheese", inStock: true, price: "RM 3.50" },
      { category: "Roti Canai", name: "Roti Telur Bawang", inStock: true, price: "RM 3.00" },
      { category: "Roti Canai", name: "Roti Telur Sosej", inStock: true, price: "RM 3.50" },
      { category: "Roti Canai", name: "Roti Telur Susu", inStock: true, price: "RM 3.50" },
      { category: "Roti Canai", name: "Roti Telur Sosej Cheese", inStock: true, price: "RM 4.50" },
      { category: "Roti Canai", name: "Roti Telur Cheese Susu", inStock: true, price: "RM 3.50" },
      { category: "Roti Canai", name: "Roti Cheese Susu", inStock: true, price: "RM 3.50" },
      { category: "Roti Canai", name: "Roti Madu", inStock: true, price: "RM 2.50" },
      { category: "Roti Canai", name: "Roti Telur Madu", inStock: true, price: "RM 3.50" },
      { category: "Roti Canai", name: "Roti Cheese Madu", inStock: true, price: "RM 3.50" },

      // --- MIX ---
      { category: "Mix", name: "Mix Omelette", inStock: true, price: "RM 4.50" },
      { category: "Mix", name: "Mix Omelette Cheese", inStock: true, price: "RM 5.50" },
      { category: "Mix", name: "Mix Sosej", inStock: true, price: "RM 4.00" },
      { category: "Mix", name: "Mix Sosej Cheese", inStock: true, price: "RM 5.00" },
      { category: "Mix", name: "Mix Ayam", inStock: true, price: "RM 5.00" },
      { category: "Mix", name: "Mix Ayam Cheese", inStock: true, price: "RM 6.00" },
      { category: "Mix", name: "Mix Campur", inStock: true, price: "RM 7.50" },
      { category: "Mix", name: "Campur Cheese", inStock: true, price: "RM 8.00" },

      // --- NAAN ---
      { category: "Naan", name: "Roti Naan Biasa", inStock: true, price: "RM 1.50" },
      { category: "Naan", name: "Roti Naan Cheese", inStock: true, price: "RM 2.50" },
      { category: "Naan", name: "Roti Naan Garlic", inStock: true, price: "RM 2.00" },
      { category: "Naan", name: "Roti Naan Butter", inStock: true, price: "RM 2.00" },
      { category: "Naan", name: "Roti Naan Pizza", inStock: true, price: "RM 5.50" },
      { category: "Naan", name: "Ayam Tandoori", inStock: true, price: "RM 6.00" },

      // --- SPECIAL MENU ---
      { category: "Special", name: "Special Egyptian", inStock: true, price: "RM 5.00" },
      { category: "Special", name: "Special Khalid", inStock: true, price: "RM 7.50" },
      { category: "Special", name: "Special Ismail", inStock: true, price: "RM 7.00" },
      { category: "Special", name: "Egg Cheese Roll", inStock: true, price: "RM 3.50" },
      { category: "Special", name: "Chicken Roll", inStock: true, price: "RM 5.00" },
      { category: "Special", name: "Chicken Wrap", inStock: true, price: "RM 5.00" },
      { category: "Special", name: "Chicken Egg Cheese Roll", inStock: true, price: "RM 5.50" },
      { category: "Special", name: "Murtabak Ayam", inStock: true, price: "RM 4.00" },
      { category: "Special", name: "Murtabak Beef", inStock: true, price: "RM 5.00" }
    ]
  },
  {
    id: 2,
    username: 'vendor2',
    password: '123',
    name: "Shawarma / Pizza",
    image: "https://images.unsplash.com/photo-1529006557810-274bc0b61f9a?q=80&w=600&auto=format&fit=crop",
    location: "Stall 05",
    isOpen: false,
    operatingHours: "12:00 PM - 9:00 PM",
    description: "Tasty Shawarma and Pizza for everyone.",
    queueLevel: 'low',
    activePromos: [],
    menu: [
      { category: "Shawarma", name: "Shawarma Chicken", inStock: true, price: "RM 6.00" },
      { category: "Shawarma", name: "Shawarma Egg", inStock: true, price: "RM 7.50" },
      { category: "Shawarma", name: "Shawarma Cheese", inStock: true, price: "RM 7.50" },
      { category: "Pizza", name: "All Pizza", inStock: true, price: "RM 3.00" }
    ]
  },
  {
    id: 3,
    username: 'vendor3',
    password: '123',
    name: "Burger / Chicken Chop",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop",
    location: "Stall 03",
    isOpen: true,
    operatingHours: "4:00 PM - 11:00 PM",
    description: "Juicy street burgers, crispy chicken, and oblong specials.",
    queueLevel: 'high',
    activePromos: [],
    menu: [
      // --- ORDINARY ---
      { category: "Ordinary", name: "Beef Burger", inStock: true, price: "RM 3.50" },
      { category: "Ordinary", name: "Chicken Burger", inStock: true, price: "RM 3.50" },
      { category: "Ordinary", name: "Double Burger", inStock: true, price: "RM 5.00" },
      { category: "Ordinary", name: "Crispy Chicken", inStock: true, price: "RM 5.00" },
      { category: "Ordinary", name: "Double Crispy Chicken", inStock: true, price: "RM 8.00" },
      { category: "Ordinary", name: "Oblong Chicken / Beef", inStock: true, price: "RM 5.50" },
      { category: "Ordinary", name: "Double Oblong", inStock: true, price: "RM 10.00" },
      { category: "Ordinary", name: "Egg Banjo", inStock: true, price: "RM 3.00" },
      { category: "Ordinary", name: "Double Egg Banjo", inStock: true, price: "RM 4.00" },

      // --- SPECIAL ---
      { category: "Special", name: "Beef Burger Special", inStock: true, price: "RM 4.50" },
      { category: "Special", name: "Chicken Burger Special", inStock: true, price: "RM 4.50" },
      { category: "Special", name: "Double Burger Special", inStock: true, price: "RM 6.00" },
      { category: "Special", name: "Crispy Chicken Special", inStock: true, price: "RM 6.00" },
      { category: "Special", name: "Double Crispy Special", inStock: true, price: "RM 9.00" },
      { category: "Special", name: "Oblong Special", inStock: true, price: "RM 6.50" },
      { category: "Special", name: "Double Oblong Special", inStock: true, price: "RM 11.00" },

      // --- CHICKEN CHOP ---
      { category: "Chicken Chop", name: "Chicken Chop", inStock: true, price: "RM 7.00" },
      { category: "Chicken Chop", name: "Fries", inStock: true, price: "RM 4.00" },

      // --- ADD ON ---
      { category: "Add On", name: "Cheese", inStock: true, price: "RM 1.50" }
    ]
  },
  {
    id: 4,
    username: 'vendor4',
    password: '123',
    name: "Mee & Sup Station",
    image: "https://images.unsplash.com/photo-1596450523276-24707f912ae8?q=80&w=600&auto=format&fit=crop", 
    location: "Stall 02",
    isOpen: true,
    operatingHours: "12:00 PM - 10:00 PM",
    description: "Hot soups, fried noodles, and flavorful Thai dishes.",
    queueLevel: 'medium',
    activePromos: [],
    menu: [
      // --- NOODLES (Mee / Bihun / Kuetiaw / Maggi) ---
      { category: "Noodles", name: "Goreng Biasa", inStock: true, price: "RM 5.00" },
      { category: "Noodles", name: "Sup", inStock: true, price: "RM 5.00" },
      { category: "Noodles", name: "Hailam", inStock: true, price: "RM 5.00" },
      { category: "Noodles", name: "Bandung", inStock: true, price: "RM 6.00" },
      { category: "Noodles", name: "Goreng Mamak", inStock: true, price: "RM 6.00" },
      { category: "Noodles", name: "Goreng Tomyam", inStock: true, price: "RM 6.00" },
      { category: "Noodles", name: "Char Kuetiaw", inStock: true, price: "RM 6.00" },
      { category: "Noodles", name: "Tomyam Ayam/Daging", inStock: true, price: "RM 6.00" },
      { category: "Noodles", name: "Kungfu/Ladna", inStock: true, price: "RM 6.00" },
      { category: "Noodles", name: "Tomyam Campur", inStock: true, price: "RM 6.00" },
      { category: "Noodles", name: "Tomyam Udang", inStock: true, price: "RM 6.50" },

      // --- SUP ---
      { category: "Sup", name: "Sup Sayur", inStock: true, price: "RM 4.00" },
      { category: "Sup", name: "Sup Ayam / Daging", inStock: true, price: "RM 5.00" },
      { category: "Sup", name: "Tomyam Ayam / Daging", inStock: true, price: "RM 5.00" },
      { category: "Sup", name: "Tomyam Campur", inStock: true, price: "RM 6.00" },
      { category: "Sup", name: "Tomyam Udang", inStock: true, price: "RM 6.00" },

      // --- SPECIAL DISHES ---
      { category: "Special Dishes", name: "Telur Goreng / Dadar", inStock: true, price: "RM 1.50" },
      { category: "Special Dishes", name: "Kangkung Belacan", inStock: true, price: "RM 4.00" },
      { category: "Special Dishes", name: "Kailan Ikan Masin", inStock: true, price: "RM 4.00" },
      { category: "Special Dishes", name: "Telur Bungkus / Bistik", inStock: true, price: "RM 5.00" },
      { category: "Special Dishes", name: "Ayam Goreng", inStock: true, price: "RM 5.00" },
      { category: "Special Dishes", name: "Ayam Goreng Halia", inStock: true, price: "RM 5.00" },
      { category: "Special Dishes", name: "Ayam Paprik", inStock: true, price: "RM 5.00" },
      { category: "Special Dishes", name: "Daging Paprik", inStock: true, price: "RM 6.00" },
      { category: "Special Dishes", name: "Daging Merah", inStock: true, price: "RM 6.00" }
    ]
  },
  {
    id: 5,
    username: 'vendor5',
    password: '123',
    name: "Nasi Ayam / Ayam Gepuk",
    image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?q=80&w=600&auto=format&fit=crop", 
    location: "Stall 04",
    isOpen: true,
    operatingHours: "10:00 AM - 9:00 PM",
    description: "Spicy Ayam Gepuk and classic Nasi Ayam.",
    queueLevel: 'high',
    activePromos: [],
    menu: [
      { category: "Ayam Gepuk", name: "Ayam Gepuk + Kobis Goreng", inStock: true, price: "RM 10.00" },
      { category: "Ayam Gepuk", name: "Ayam Gepuk", inStock: true, price: "RM 8.00" },
      { category: "Nasi Ayam", name: "Nasi Ayam", inStock: true, price: "RM 6.00" }
    ]
  },
  {
    id: 6,
    username: 'vendor6',
    password: '123',
    name: "Sizzling & Claypot",
    image: "https://images.unsplash.com/photo-1534939561126-855b8675edd7?q=80&w=600&auto=format&fit=crop", 
    location: "Stall 06",
    isOpen: true,
    operatingHours: "12:00 PM - 9:00 PM",
    description: "Hot sizzling plates and claypot delights.",
    queueLevel: 'medium',
    activePromos: [],
    menu: [
      { category: "Sizzling", name: "Kuey Tiaw", inStock: true, price: "RM 8.00" },
      { category: "Sizzling", name: "Chicken / Beef", inStock: true, price: "RM 8.00" },
      { category: "Claypot", name: "Tomyam Noodle", inStock: true, price: "RM 8.00" },
      { category: "Claypot", name: "Chicken Rice", inStock: true, price: "RM 8.00" }
    ]
  },
  {
    id: 7,
    username: 'vendor7',
    password: '123',
    name: "Minuman Panas & Sejuk",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=600&auto=format&fit=crop", // Coffee/Tea image
    location: "Stall 07",
    isOpen: true,
    operatingHours: "8:00 AM - 10:00 PM",
    description: "Classic hot and cold beverages.",
    queueLevel: 'low',
    activePromos: [],
    menu: [
      // --- PANAS ---
      { category: "Panas", name: "Teh'O", inStock: true, price: "RM 1.20" },
      { category: "Panas", name: "Teh", inStock: true, price: "RM 2.00" },
      { category: "Panas", name: "Teh'O Limau", inStock: true, price: "RM 2.00" },
      { category: "Panas", name: "Teh'O Lemon", inStock: true, price: "RM 2.50" },
      { category: "Panas", name: "Kopi O", inStock: true, price: "RM 1.50" },
      { category: "Panas", name: "Kopi", inStock: true, price: "RM 2.00" },
      { category: "Panas", name: "Nescafe'O", inStock: true, price: "RM 2.00" },
      { category: "Panas", name: "Nescafe", inStock: true, price: "RM 2.50" },
      { category: "Panas", name: "Milo", inStock: true, price: "RM 2.50" },
      { category: "Panas", name: "Neslo", inStock: true, price: "RM 3.00" },
      { category: "Panas", name: "Horlicks", inStock: true, price: "RM 2.50" },
      { category: "Panas", name: "Sirap", inStock: true, price: "RM 1.50" },
      { category: "Panas", name: "Sirap Limau", inStock: true, price: "RM 2.00" },
      { category: "Panas", name: "Sirap Bandung", inStock: true, price: "RM 2.00" },
      { category: "Panas", name: "Limau", inStock: true, price: "RM 1.50" },
      { category: "Panas", name: "Lemon", inStock: true, price: "RM 2.00" },

      // --- OTHER ---
      { category: "Other", name: "Teh Hijau", inStock: true, price: "RM 3.00" },
      { category: "Other", name: "Air Balang", inStock: true, price: "RM 2.50" },
      { category: "Other", name: "Ais", inStock: true, price: "RM 0.50" },
      { category: "Other", name: "Air Suam", inStock: true, price: "Free" },
      { category: "Other", name: "Cendol", inStock: true, price: "RM 3.00" }
    ]
  }
];

const DEV_CREDENTIALS = { username: 'admin', password: 'admin' };

// --- MAIN RENDER WRAPPER ---
const PhoneFrame = ({ children }) => (
  <div id="phone-shell">
    <div className="side-button button-silent"></div>
    <div className="side-button button-vol-up"></div>
    <div className="side-button button-vol-down"></div>
    <div className="side-button button-power"></div>
    <div className="dynamic-island"></div>
    <div className="app-container">
      {children}
    </div>
  </div>
);

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('landing'); 
  const [viewMode, setViewMode] = useState('list'); 
  const [selectedVendor, setSelectedVendor] = useState(null); 
  
  const [loginId, setLoginId] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  
  const [stalls, setStalls] = useState(INITIAL_DATA);
  
  // --- Modals State ---
  const [showPromoModal, setShowPromoModal] = useState(false);
  const [showHoursModal, setShowHoursModal] = useState(false);
  
  // Promo Form State
  const [selectedItems, setSelectedItems] = useState([]); 
  const [promoPrices, setPromoPrices] = useState({}); 
  const [promoDuration, setPromoDuration] = useState('1 Hour');
  const [tempHours, setTempHours] = useState('');

  // --- ACTIONS ---
  const handleLogin = () => {
    setLoginError('');
    if (loginId === DEV_CREDENTIALS.username && loginPass === DEV_CREDENTIALS.password) {
      setCurrentScreen('dev');
      setCurrentUser({ name: 'Developer', role: 'admin' });
      return;
    }
    const foundVendor = stalls.find(s => s.username === loginId && s.password === loginPass);
    if (foundVendor) {
      setCurrentUser(foundVendor);
      setSelectedVendor(foundVendor); 
      setCurrentScreen('vendor');
      setViewMode('detail');
    } else {
      setLoginError('Invalid ID or Password');
    }
  };

  const toggleShopStatus = (id) => {
    setStalls(stalls.map(s => s.id === id ? { ...s, isOpen: !s.isOpen } : s));
  };

  const toggleItemStock = (stallId, itemName) => {
    setStalls(stalls.map(s => {
      if (s.id === stallId) {
        const updatedMenu = s.menu.map(item => item.name === itemName ? { ...item, inStock: !item.inStock } : item);
        return { ...s, menu: updatedMenu };
      }
      return s;
    }));
  };

  const setQueueLevel = (stallId, level) => {
    setStalls(stalls.map(s => s.id === stallId ? { ...s, queueLevel: level } : s));
  };

  // --- PROMO LOGIC ---
  const openPromoModal = () => {
    setSelectedItems([]); 
    setPromoPrices({}); 
    setPromoDuration('30 Mins');
    setShowPromoModal(true);
  };

  const togglePromoSelection = (itemName) => {
    if (selectedItems.includes(itemName)) {
      setSelectedItems(selectedItems.filter(i => i !== itemName));
    } else {
      setSelectedItems([...selectedItems, itemName]);
    }
  };

  const handlePriceChange = (itemName, value) => {
    const cleanValue = value.replace(/[^0-9.]/g, '');
    setPromoPrices(prev => ({ ...prev, [itemName]: cleanValue }));
  };

  const blastPromo = () => {
    if (selectedItems.length === 0) {
      alert("Please select at least one item!");
      return;
    }
    const missingPrice = selectedItems.find(item => !promoPrices[item] || promoPrices[item].trim() === '');
    if (missingPrice) {
      alert(`Please enter a promo price for ${missingPrice}`);
      return;
    }

    setStalls(stalls.map(s => {
      if (s.id === selectedVendor.id) {
        const newPromos = selectedItems.map((item, index) => {
          const rawPrice = parseFloat(promoPrices[item]);
          const formattedPrice = isNaN(rawPrice) ? promoPrices[item] : `RM ${rawPrice.toFixed(2)}`;
          return {
            id: Date.now() + index,
            item: item,
            price: formattedPrice,
            duration: promoDuration
          };
        });
        const existingPromos = s.activePromos || [];
        const cleanedPromos = existingPromos.filter(p => !selectedItems.includes(p.item));
        return { ...s, activePromos: [...cleanedPromos, ...newPromos] };
      }
      return s;
    }));
    setShowPromoModal(false);
  };

  const deletePromo = (vendorId, promoId) => {
    setStalls(stalls.map(s => {
      if (s.id === vendorId) {
        return { ...s, activePromos: s.activePromos.filter(p => p.id !== promoId) };
      }
      return s;
    }));
  };

  // --- HOURS LOGIC ---
  const openHoursModal = () => {
    setTempHours(stalls.find(s => s.id === selectedVendor.id).operatingHours);
    setShowHoursModal(true);
  };

  const saveHours = () => {
    setStalls(stalls.map(s => s.id === selectedVendor.id ? { ...s, operatingHours: tempHours } : s));
    setShowHoursModal(false);
  };

  // --- HELPERS ---
  const renderQueueBadge = (level) => {
    const config = {
      low: { label: 'Low', class: 'q-low', icon: <User size={12} /> },
      medium: { label: 'Med', class: 'q-med', icon: <Users size={12} /> },
      high: { label: 'High', class: 'q-high', icon: <Hourglass size={12} /> }
    };
    const c = config[level] || config.low;
    return <span className={`queue-badge ${c.class}`}>{c.icon} {c.label}</span>;
  };

  // --- COMPONENTS ---
  
  const VendorListCard = ({ stall }) => (
    <div 
      className="vendor-list-card animate-fade-in"
      onClick={() => {
        setSelectedVendor(stall);
        setViewMode('detail');
      }}
    >
      <div className="vendor-image-container">
        <img src={stall.image} alt={stall.name} className="vendor-image" />
        <div className={`vendor-status-overlay ${stall.isOpen ? 'open' : 'closed'}`}>
          {stall.isOpen ? 'OPEN' : 'CLOSED'}
        </div>
        {stall.isOpen && stall.activePromos?.length > 0 && (
          <div className="vendor-promo-badge">
            <Flame size={14} fill="white" /> {stall.activePromos.length} OFFER{stall.activePromos.length > 1 ? 'S' : ''}
          </div>
        )}
      </div>
      <div className="vendor-info">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <h3 className="vendor-name">{stall.name}</h3>
          {stall.isOpen && renderQueueBadge(stall.queueLevel)}
        </div>
        <div className="vendor-meta">
          <span><MapPin size={12}/> {stall.location}</span>
          <span>•</span>
          <span><Clock size={12}/> {stall.operatingHours}</span>
        </div>
        <p className="vendor-desc">{stall.description}</p>
      </div>
    </div>
  );

  const VendorDetailView = ({ stall, isVendorMode }) => {
    const liveStallData = stalls.find(s => s.id === stall.id) || stall;

    // --- NEW: Category Logic ---
    const categories = useMemo(() => {
      // Get unique categories from menu items
      const cats = [...new Set(liveStallData.menu.map(item => item.category || 'General'))];
      return cats;
    }, [liveStallData.menu]);

    const [activeCategory, setActiveCategory] = useState(categories[0]);

    // Filter items based on active tab
    const filteredMenu = liveStallData.menu.filter(item => (item.category || 'General') === activeCategory);

    return (
      <div className="detail-view animate-fade-in">
        
        {/* Safe Area Header */}
        <div className="detail-safe-area-header">
           <button 
            className="detail-back-btn-dark" 
            onClick={() => {
              if (currentScreen === 'vendor') {
                setCurrentScreen('landing');
                setSelectedVendor(null);
                setViewMode('list');
              } else {
                setViewMode('list');
                setSelectedVendor(null);
              }
            }}
          >
            <ArrowLeft size={24} color="var(--primary-dark)"/>
          </button>
          <span style={{fontWeight:'700', fontSize:'0.9rem', marginLeft:'12px', color:'var(--primary-dark)'}}>
            {liveStallData.name}
          </span>
        </div>

        <div className="detail-hero">
          <img src={liveStallData.image} alt={liveStallData.name} />
          <div className="detail-hero-gradient"></div>
          
          <div className="detail-title-block">
            <div className="detail-chips">
              <span className={`chip ${liveStallData.isOpen ? 'open' : 'closed'}`}>
                {liveStallData.isOpen ? 'OPEN' : 'CLOSED'}
              </span>
              <span className="chip location"><MapPin size={12}/> {liveStallData.location}</span>
            </div>
          </div>
        </div>

        <div style={{padding:'20px', flex:1, display:'flex', flexDirection:'column'}}>
          {/* VENDOR CONTROLS */}
          {isVendorMode && (
            <div className="control-panel">
               <div className="control-card" onClick={() => toggleShopStatus(liveStallData.id)}>
                <div className="control-icon"><Store size={24}/></div>
                <div className="control-label">{liveStallData.isOpen ? 'Close Shop' : 'Open Shop'}</div>
              </div>
              <div className="control-card" onClick={openPromoModal}>
                <div className="control-icon"><Send size={24}/></div>
                <div className="control-label">Blast Promo</div>
              </div>
              <div className="control-card" onClick={openHoursModal}>
                <div className="control-icon"><Clock size={24}/></div>
                <div className="control-label">Edit Hours</div>
              </div>
               <div className="control-card" style={{gridColumn:'span 2', flexDirection:'row', justifyContent:'space-between'}}>
                 <span className="control-label">Queue:</span>
                 <div style={{display:'flex', gap:'4px'}}>
                  {['low', 'medium', 'high'].map(lvl => (
                    <button 
                      key={lvl}
                      onClick={(e) => { e.stopPropagation(); setQueueLevel(liveStallData.id, lvl); }}
                      style={{
                        padding:'4px 8px', borderRadius:'6px', border:'none', fontSize:'0.7rem', fontWeight:'700', cursor:'pointer',
                        background: liveStallData.queueLevel === lvl ? '#007A73' : '#f1f5f9',
                        color: liveStallData.queueLevel === lvl ? 'white' : '#64748b'
                      }}
                    >
                      {lvl.toUpperCase()}
                    </button>
                  ))}
                 </div>
              </div>
            </div>
          )}

          {/* ACTIVE PROMOS */}
          {liveStallData.isOpen && liveStallData.activePromos?.length > 0 && (
            <div className="promo-stack" style={{marginBottom:'24px'}}>
              {liveStallData.activePromos.map((promo) => (
                <div key={promo.id} className="active-promo-banner">
                  <div className="promo-icon"><Flame size={20} fill="#EA580C" /></div>
                  <div className="promo-text">
                    <span className="promo-title">
                      {promo.item}
                      <span className="promo-price">{promo.price}</span>
                    </span>
                    <p className="promo-details">Ends in {promo.duration}</p>
                  </div>
                  {isVendorMode && (
                    <button 
                      onClick={() => deletePromo(liveStallData.id, promo.id)} 
                      style={{background:'rgba(255,255,255,0.5)', border:'none', borderRadius:'6px', padding:'6px', cursor:'pointer'}}
                    >
                      <Trash2 size={16} color="#9A3412"/>
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* --- NEW: CATEGORY TABS --- */}
          <div className="menu-header-section">
            <h3 style={{fontSize:'1rem', fontWeight:'700', color:'#64748b', margin:0}}>MENU</h3>
          </div>
          
          <div className="category-tabs-container">
            {categories.map((cat, idx) => (
              <button 
                key={idx} 
                className={`category-tab ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* MENU LIST (Filtered) */}
          <div className="menu-list-container">
            {filteredMenu.map((item, idx) => {
              const activePromo = liveStallData.activePromos?.find(p => p.item === item.name);
              return (
                <div key={idx} className="menu-item">
                  <div className="item-name">
                    <span className="stock-indicator" style={{background: item.inStock ? 'var(--success)' : '#e5e5ea'}}></span>
                    <span style={{color: !item.inStock && '#8e8e93', textDecoration: !item.inStock && 'line-through', marginLeft:'8px'}}>{item.name}</span>
                    {activePromo && <Tag size={12} color="#EA580C" style={{marginLeft:'6px'}}/>}
                  </div>
                  
                  <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
                    <div style={{display:'flex', flexDirection:'column', alignItems:'flex-end'}}>
                       {activePromo ? (
                         <>
                           <span className="old-price">{item.price}</span>
                           <span className="new-price">{activePromo.price}</span>
                         </>
                       ) : (
                         <span style={{fontSize:'0.9rem', fontWeight:'600', color:'var(--text-main)'}}>{item.price}</span>
                       )}
                    </div>
                    {isVendorMode && (
                      <button 
                        onClick={() => toggleItemStock(liveStallData.id, item.name)}
                        style={{
                          background: item.inStock ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.1)',
                          color: item.inStock ? 'var(--success)' : 'var(--danger)',
                          border: 'none', padding: '6px 12px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: '700', cursor: 'pointer'
                        }}
                      >
                        {item.inStock ? 'IN' : 'OUT'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
            {filteredMenu.length === 0 && (
              <div style={{padding:'20px', textAlign:'center', color:'#94a3b8', fontSize:'0.9rem'}}>
                No items in this category.
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const Header = () => (
    <header className="app-header">
      {viewMode === 'list' && currentScreen !== 'landing' ? (
        <button className="back-btn" onClick={() => setCurrentScreen('landing')}>
          <ArrowLeft size={20} />
        </button>
      ) : <div style={{width:36}}></div>}
      
      <div className="header-content">
        <h1>{currentScreen === 'vendor' ? 'Vendor Portal' : 'Foodie IIUM'}</h1>
        <p>{currentScreen === 'login' ? 'Secure Access' : 'Mahallah Bilal'}</p>
      </div>
      <div style={{marginLeft: 'auto'}}>
        {currentScreen === 'student' && viewMode === 'list' && <Store size={24} color="#007A73" />}
        {currentScreen === 'vendor' && <div className="vendor-avatar"><User size={16} color="white"/></div>}
      </div>
    </header>
  );

  // --- RENDER SCREENS ---

  if (currentScreen === 'landing') {
    return (
      <PhoneFrame>
        <div className="landing-container animate-fade-in">
          <div className="landing-icon-wrapper">
            <UtensilsCrossed size={48} color="#007A73" />
          </div>
          <h1 className="landing-title">Foodie</h1>
          <h1 className="landing-title" style={{marginTop:'-10px', fontSize:'2rem', opacity:0.8}}>IIUM</h1>
          <p className="landing-subtitle">Mahallah Bilal Pilot Program</p>
          <div style={{width:'100%'}}>
            <button className="btn-glass-primary" onClick={() => setCurrentScreen('student')}>
              Check Food Status <ArrowRight size={20} />
            </button>
            <button className="btn-glass-outline" onClick={() => { setLoginId(''); setLoginPass(''); setLoginError(''); setCurrentScreen('login'); }}>
              <LogIn size={18} /> Vendor Login
            </button>
          </div>
          <p style={{marginTop:'32px', fontSize:'0.7rem', opacity:0.5}}>v1.0.0 • Green & Gold Edition</p>
        </div>
      </PhoneFrame>
    );
  }

  if (currentScreen === 'login') {
    return (
      <PhoneFrame>
        <Header />
        <main className="login-wrapper animate-fade-in">
          <div style={{textAlign:'center', marginBottom:'32px'}}>
            <div style={{background:'rgba(0, 122, 115, 0.1)', width:'64px', height:'64px', borderRadius:'20px', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px'}}>
              <Lock size={32} color="var(--primary)"/>
            </div>
            <h2 style={{fontSize:'1.5rem', fontWeight:'800', margin:0, color:'var(--primary-dark)'}}>Welcome Back</h2>
            <p style={{color:'var(--text-muted)', marginTop:'8px'}}>Enter your vendor credentials.</p>
          </div>
          <input type="text" placeholder="Username" className="modern-input" value={loginId} onChange={(e) => setLoginId(e.target.value)} />
          <input type="password" placeholder="Password" className="modern-input" value={loginPass} onChange={(e) => setLoginPass(e.target.value)} />
          {loginError && <p style={{color:'red', textAlign:'center', fontSize:'0.9rem'}}>{loginError}</p>}
          <button className="login-btn" onClick={handleLogin}>Login</button>
        </main>
      </PhoneFrame>
    );
  }

  // --- STUDENT & VENDOR MAIN VIEW ---
  return (
    <PhoneFrame>
      {viewMode === 'list' && <Header />}
      
      <main className="main-content" style={{padding: viewMode === 'detail' ? 0 : '20px'}}>
        
        {viewMode === 'list' && (
          <div className="animate-fade-in">
             <h2 style={{fontSize:'1.2rem', marginBottom:'16px', color:'var(--primary-dark)'}}>Available Stalls</h2>
             {stalls.map(stall => <VendorListCard key={stall.id} stall={stall} />)}
          </div>
        )}

        {viewMode === 'detail' && selectedVendor && (
          <VendorDetailView 
            stall={selectedVendor} 
            isVendorMode={currentScreen === 'vendor'} 
          />
        )}

      </main>

      {/* --- PROMO MODAL --- */}
      {showPromoModal && (
        <div className="modal-overlay">
          <div className="modal-content animate-fade-in" style={{maxHeight:'80vh', display:'flex', flexDirection:'column'}}>
            <h3 style={{margin:0, color:'var(--primary-dark)'}}>📢 Blast Promo</h3>
            <p style={{fontSize:'0.9rem', color:'#666'}}>Select items and set prices.</p>
            <label className="modal-label">Select Items & Price ({selectedItems.length})</label>
            <div className="promo-multi-select-list">
              {stalls.find(s => s.id === selectedVendor.id)?.menu.map((m, i) => {
                const isSelected = selectedItems.includes(m.name);
                return (
                  <div key={i} className={`promo-select-item ${isSelected ? 'selected' : ''}`} onClick={() => togglePromoSelection(m.name)}>
                    <div style={{display:'flex', alignItems:'center', gap:'8px', flex:1}}>
                      {isSelected ? <CheckCircle size={18} color="var(--primary)" fill="#d1fae5"/> : <div style={{width:18}}/>}
                      <span style={{fontWeight: isSelected?600:400}}>{m.name}</span>
                    </div>
                    {isSelected && (
                      <input type="text" inputMode="decimal" className="promo-inline-input" placeholder="Price (e.g. 5)"
                        value={promoPrices[m.name] || ''} onClick={(e) => e.stopPropagation()} onChange={(e) => handlePriceChange(m.name, e.target.value)}
                      />
                    )}
                  </div>
                );
              })}
            </div>
            <label className="modal-label">Duration</label>
            <select className="modal-select" value={promoDuration} onChange={(e) => setPromoDuration(e.target.value)}>
              <option value="30 Mins">30 Mins</option>
              <option value="1 Hour">1 Hour</option>
              <option value="2 Hours">2 Hours</option>
              <option value="All Day">All Day</option>
            </select>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setShowPromoModal(false)}>Cancel</button>
              <button className="btn-save" onClick={blastPromo}>Blast Promo</button>
            </div>
          </div>
        </div>
      )}

      {/* --- HOURS MODAL --- */}
      {showHoursModal && (
        <div className="modal-overlay">
          <div className="modal-content animate-fade-in">
            <h3 style={{margin:0, color:'var(--primary-dark)'}}>🕒 Edit Hours</h3>
            <input type="text" className="modal-input" value={tempHours} onChange={(e) => setTempHours(e.target.value)} />
            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setShowHoursModal(false)}>Cancel</button>
              <button className="btn-save" onClick={saveHours}>Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </PhoneFrame>
  );
}
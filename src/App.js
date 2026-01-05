import React, { useState } from 'react';
import { ChefHat, User, Clock, CheckCircle, XCircle, Store, MessageCircle, Send, Users, Hourglass, UtensilsCrossed, ArrowRight, LogIn, ArrowLeft, Code, Lock, MapPin, Tag, Flame, X, Trash2 } from 'lucide-react';
import './App.css'; 

// --- DATABASE ---
const INITIAL_DATA = [
  {
    id: 1,
    username: 'vendor1',
    password: '123',
    name: "Pak Cik Nasi Lemak",
    location: "Stall 01",
    isOpen: true,
    operatingHours: "7:00 AM - 11:00 AM",
    description: "Best Nasi Lemak in Mahallah Bilal.",
    queueLevel: 'medium',
    activePromos: [], 
    menu: [
      { name: "Nasi Lemak Ayam", inStock: true, price: "RM 6.00" },
      { name: "Nasi Lemak Biasa", inStock: true, price: "RM 3.00" },
      { name: "Teh Tarik", inStock: false, price: "RM 1.50" }
    ]
  },
  {
    id: 2,
    username: 'vendor2',
    password: '123',
    name: "Mahallah Western Grill",
    location: "Stall 05",
    isOpen: false,
    operatingHours: "12:00 PM - 9:00 PM",
    description: "Chicken chops, pasta, and grill.",
    queueLevel: 'low',
    activePromos: [],
    menu: [
      { name: "Chicken Chop", inStock: true, price: "RM 12.00" },
      { name: "Spaghetti Bolognese", inStock: true, price: "RM 8.00" }
    ]
  },
  {
    id: 3,
    username: 'vendor3',
    password: '123',
    name: "Gerai Buah-Buahan",
    location: "Stall 03",
    isOpen: true,
    operatingHours: "10:00 AM - 6:00 PM",
    description: "Fresh fruits and juices.",
    queueLevel: 'high',
    activePromos: [],
    menu: [
      { name: "Watermelon Slice", inStock: true, price: "RM 2.00" },
      { name: "Papaya", inStock: false, price: "RM 2.00" },
      { name: "Apple Juice", inStock: true, price: "RM 4.00" }
    ]
  }
];

const DEV_CREDENTIALS = { username: 'admin', password: 'admin' };

// --- MAIN RENDER WRAPPER (PHONE FRAME) ---
// MOVED OUTSIDE: Prevents re-rendering issues
const PhoneFrame = ({ children }) => (
  <div id="phone-shell">
    {/* Updated Button Classes to match new CSS */}
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
  const [loginId, setLoginId] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [devActiveTab, setDevActiveTab] = useState('student');
  const [stalls, setStalls] = useState(INITIAL_DATA);
  
  // --- Modals State ---
  const [showPromoModal, setShowPromoModal] = useState(false);
  const [showHoursModal, setShowHoursModal] = useState(false);
  
  // Promo Form State
  const [selectedFood, setSelectedFood] = useState('');
  const [promoPrice, setPromoPrice] = useState('');
  const [promoDuration, setPromoDuration] = useState('1 Hour');
  
  const [tempHours, setTempHours] = useState('');
  const [activeVendorId, setActiveVendorId] = useState(null);

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
      setCurrentScreen('vendor');
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
  const openPromoModal = (vendorId) => {
    setActiveVendorId(vendorId);
    const vendor = stalls.find(s => s.id === vendorId);
    setSelectedFood(vendor.menu[0]?.name || '');
    setPromoPrice('RM 5.00'); // Default example
    setPromoDuration('30 Mins');
    setShowPromoModal(true);
  };

  const blastPromo = () => {
    setStalls(stalls.map(s => {
      if (s.id === activeVendorId) {
        const newPromo = {
          id: Date.now(),
          item: selectedFood,
          price: promoPrice,
          duration: promoDuration
        };
        // Add new promo to existing array
        const currentPromos = s.activePromos || [];
        return { 
          ...s, 
          activePromos: [...currentPromos, newPromo]
        };
      }
      return s;
    }));
    setShowPromoModal(false);
    alert("Promo Blasted! Students can now see it.");
  };

  const deletePromo = (vendorId, promoId) => {
    setStalls(stalls.map(s => {
      if (s.id === vendorId) {
        return {
          ...s,
          activePromos: s.activePromos.filter(p => p.id !== promoId)
        };
      }
      return s;
    }));
  };

  // --- HOURS LOGIC ---
  const openHoursModal = (vendorId) => {
    setActiveVendorId(vendorId);
    setTempHours(stalls.find(s => s.id === vendorId).operatingHours);
    setShowHoursModal(true);
  };

  const saveHours = () => {
    setStalls(stalls.map(s => s.id === activeVendorId ? { ...s, operatingHours: tempHours } : s));
    setShowHoursModal(false);
  };

  // --- RENDER HELPERS ---
  const renderQueueBadge = (level) => {
    const config = {
      low: { label: 'Low (<5m)', class: 'q-low', icon: <User size={12} /> },
      medium: { label: 'Med (5-15m)', class: 'q-med', icon: <Users size={12} /> },
      high: { label: 'High (>15m)', class: 'q-high', icon: <Hourglass size={12} /> }
    };
    const c = config[level] || config.low;
    return <span className={`queue-badge ${c.class}`}>{c.icon} {c.label}</span>;
  };

  // --- COMPONENT: Stall Card ---
  const StallCard = ({ stall, isVendor }) => (
    <div className="stall-card animate-fade-in">
      <div className="card-header">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'start'}}>
          <div>
            <h3 style={{fontSize:'1.1rem', fontWeight:'800', margin:0, color:'var(--primary-dark)'}}>{stall.name}</h3>
            <div style={{display:'flex', alignItems:'center', gap:'4px', color:'#64748b', fontSize:'0.75rem', marginTop:'2px'}}>
              <MapPin size={12}/> {stall.location}
            </div>
          </div>
          {isVendor ? (
            <button 
              onClick={() => toggleShopStatus(stall.id)}
              className={`status-pill ${stall.isOpen ? 'open' : 'closed'}`}
              style={{border:'none', cursor:'pointer'}}
            >
              {stall.isOpen ? 'OPEN' : 'CLOSED'}
            </button>
          ) : (
            <span className={`status-pill ${stall.isOpen ? 'open' : 'closed'}`}>
              {stall.isOpen ? 'OPEN' : 'CLOSED'}
            </span>
          )}
        </div>
        
        {/* Active Promos Stack */}
        {stall.isOpen && stall.activePromos && stall.activePromos.length > 0 && (
          <div className="promo-stack">
            {stall.activePromos.map((promo) => (
              <div key={promo.id} className="active-promo-banner">
                <div className="promo-icon"><Flame size={20} fill="#EA580C" /></div>
                <div className="promo-text">
                  <span className="promo-title">
                    FLASH SALE: {promo.item}
                    <span className="promo-price">{promo.price}</span>
                  </span>
                  <p className="promo-details">Ends in {promo.duration}</p>
                </div>
                {isVendor && (
                  <button 
                    onClick={() => deletePromo(stall.id, promo.id)} 
                    style={{background:'rgba(255,255,255,0.5)', border:'none', borderRadius:'6px', padding:'6px', cursor:'pointer'}}
                  >
                    <Trash2 size={16} color="#9A3412"/>
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        <div style={{marginTop:'12px', display:'flex', alignItems:'center', gap:'6px', fontSize:'0.8rem', color:'var(--text-main)'}}>
          <Clock size={14}/> {stall.operatingHours}
        </div>

        {/* Queue Display / Control */}
        <div className="queue-bar">
          <span style={{fontSize:'0.75rem', fontWeight:'700', color:'var(--text-muted)'}}>CROWD LEVEL</span>
          {isVendor ? (
            <div style={{display:'flex', gap:'4px'}}>
              {['low', 'medium', 'high'].map(lvl => (
                <button 
                  key={lvl}
                  onClick={() => setQueueLevel(stall.id, lvl)}
                  style={{
                    padding:'4px 8px', borderRadius:'6px', border:'none', fontSize:'0.7rem', fontWeight:'700', cursor:'pointer',
                    background: stall.queueLevel === lvl ? '#007A73' : 'transparent',
                    color: stall.queueLevel === lvl ? 'white' : '#8e8e93'
                  }}
                >
                  {lvl.toUpperCase()}
                </button>
              ))}
            </div>
          ) : (
            stall.isOpen && renderQueueBadge(stall.queueLevel)
          )}
        </div>
      </div>

      {/* Menu Section */}
      <div className="menu-list">
        {stall.isOpen ? (
          stall.menu.map((item, idx) => (
            <div key={idx} className="menu-item">
              <div className="item-name">
                <span className="stock-indicator" style={{background: item.inStock ? 'var(--success)' : '#e5e5ea'}}></span>
                <span style={{color: !item.inStock && '#8e8e93', textDecoration: !item.inStock && 'line-through', marginLeft:'8px'}}>{item.name}</span>
                {/* Show Promo Tag if this item has an active promo */}
                {stall.activePromos?.some(p => p.item === item.name) && <Tag size={12} color="#EA580C" style={{marginLeft:'6px'}}/>}
              </div>
              
              <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
                <span style={{fontSize:'0.9rem', fontWeight:'600', color:'var(--text-main)'}}>{item.price}</span>
                {isVendor && (
                  <button 
                    onClick={() => toggleItemStock(stall.id, item.name)}
                    style={{
                      background: item.inStock ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.1)',
                      color: item.inStock ? 'var(--success)' : 'var(--danger)',
                      border: 'none', padding: '6px 12px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: '700', cursor: 'pointer'
                    }}
                  >
                    {item.inStock ? 'IN STOCK' : 'OUT'}
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div style={{textAlign:'center', padding:'20px', color:'var(--text-muted)', fontSize:'0.9rem', fontStyle:'italic'}}>
            Shop is closed.
          </div>
        )}
      </div>
    </div>
  );

  // --- SCREENS ---

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

  const Header = () => (
    <header className="app-header">
      <button className="back-btn" onClick={() => setCurrentScreen('landing')}>
        <ArrowLeft size={20} />
      </button>
      <div className="header-content">
        <h1>{currentScreen === 'vendor' ? 'Vendor Portal' : currentScreen === 'dev' ? 'Dev Mode' : 'Foodie IIUM'}</h1>
        <p>{currentScreen === 'login' ? 'Secure Access' : 'Mahallah Bilal'}</p>
      </div>
      <div style={{marginLeft: 'auto'}}>
        <Store size={24} color="#007A73" />
      </div>
    </header>
  );

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

          <input 
            type="text" placeholder="Username" className="modern-input"
            value={loginId} onChange={(e) => setLoginId(e.target.value)}
          />
          <input 
            type="password" placeholder="Password" className="modern-input"
            value={loginPass} onChange={(e) => setLoginPass(e.target.value)}
          />

          {loginError && <p style={{color:'red', textAlign:'center', fontSize:'0.9rem'}}>{loginError}</p>}

          <button className="login-btn" onClick={handleLogin}>Login</button>
          <p style={{textAlign:'center', fontSize:'0.75rem', color:'#666', marginTop:'24px'}}>
            Dev: admin/admin • Vendor: vendor1/123
          </p>
        </main>
      </PhoneFrame>
    );
  }

  return (
    <PhoneFrame>
      <Header />

      {currentScreen === 'dev' && (
        <div className="dev-nav">
          <div className={`dev-tab ${devActiveTab === 'student' ? 'active' : ''}`} onClick={() => setDevActiveTab('student')}>Student View</div>
          <div className={`dev-tab ${devActiveTab === 'vendor' ? 'active' : ''}`} onClick={() => setDevActiveTab('vendor')}>Vendor View</div>
        </div>
      )}

      <main className="main-content">
        {/* STUDENT VIEW */}
        {(currentScreen === 'student' || (currentScreen === 'dev' && devActiveTab === 'student')) && (
          <div className="animate-fade-in">
            {stalls.map(stall => <StallCard key={stall.id} stall={stall} isVendor={false} />)}
          </div>
        )}

        {/* VENDOR VIEW */}
        {(currentScreen === 'vendor' || (currentScreen === 'dev' && devActiveTab === 'vendor')) && (
          <div className="animate-fade-in">
            {(currentScreen === 'vendor' && currentUser?.role !== 'admin' 
              ? stalls.filter(s => s.id === currentUser?.id) 
              : stalls
            ).map(stall => (
              <div key={stall.id}>
                {/* Vendor Tools */}
                <div className="control-panel">
                  <div className="control-card" onClick={() => openPromoModal(stall.id)}>
                    <div className="control-icon"><Send size={28}/></div>
                    <div className="control-label">Blast Promo</div>
                  </div>
                  <div className="control-card" onClick={() => openHoursModal(stall.id)}>
                    <div className="control-icon"><Clock size={28}/></div>
                    <div className="control-label">Edit Hours</div>
                  </div>
                </div>
                <StallCard stall={stall} isVendor={true} />
              </div>
            ))}
          </div>
        )}
      </main>

      {/* --- PROMO MODAL --- */}
      {showPromoModal && (
        <div className="modal-overlay">
          <div className="modal-content animate-fade-in">
            <h3 style={{margin:0, color:'var(--primary-dark)'}}>📢 Blast Promo</h3>
            <p style={{fontSize:'0.9rem', color:'#666'}}>Select food and set discount.</p>
            
            <label className="modal-label">Select Item</label>
            <select 
              className="modal-select"
              value={selectedFood}
              onChange={(e) => setSelectedFood(e.target.value)}
            >
              {stalls.find(s => s.id === activeVendorId)?.menu.map((m, i) => (
                <option key={i} value={m.name}>{m.name}</option>
              ))}
            </select>

            <label className="modal-label">Promo Price</label>
            <input 
              type="text" 
              className="modal-input"
              value={promoPrice}
              placeholder="e.g. RM 5.00"
              onChange={(e) => setPromoPrice(e.target.value)}
            />

            <label className="modal-label">Duration</label>
            <select 
              className="modal-select"
              value={promoDuration}
              onChange={(e) => setPromoDuration(e.target.value)}
            >
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
            <p style={{fontSize:'0.9rem', color:'#666'}}>Update operating hours for today.</p>
            <input 
              type="text" 
              className="modal-input"
              value={tempHours}
              onChange={(e) => setTempHours(e.target.value)}
            />
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
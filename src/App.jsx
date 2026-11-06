import { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router';
import { AnimatePresence, motion } from 'motion/react';
import { QRCodeSVG } from 'qrcode.react';
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  CheckCircle2,
  Gift,
  Heart,
  MapPin,
  Menu as MenuIcon,
  Minus,
  Music2,
  Plus,
  Search,
  ShoppingBag,
  Sparkles,
  Ticket,
  Trash2,
  Users,
  UtensilsCrossed,
  X,
} from 'lucide-react';

const image = (id, width = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

const photos = {
  hero: '/images/hero-grill.webp',
  burger: '/images/feature-burger.jpg',
  restaurant: '/images/interior.webp',
  cocktails: '/images/cocktail.jpg',
  dessert: '/images/dessert.jpg',
  table: image('photo-1517248135467-4c7edcad34c4'),
  celebration: image('photo-1511795409834-ef04bbd61622'),
  wine: image('photo-1510812431401-41d2bd2722f3'),
  food: image('photo-1504674900247-0877df9cc836'),
  steak: image('photo-1544025162-d76694265947'),
  wings: image('photo-1527477396000-e27163b481c2'),
  seafood: image('photo-1559737558-2f5a35f4523b'),
  breakfast: image('photo-1533089860892-a7c6f0a88666'),
  salad: image('photo-1512621776951-a57141f2eefd'),
  grill: image('photo-1558030006-450675393462'),
  bar: image('photo-1574096079513-d8259312b785'),
};

const categories = [
  'All',
  'Starters',
  'Burgers',
  'Grills',
  'Seafood',
  'Breakfast',
  'Lighter Bites',
  'Cocktails',
  'Wine',
  'Desserts',
];

const menuItems = [
  {
    id: 'buffalo-wings',
    name: 'Buffalo Wings',
    category: 'Starters',
    description: 'Saucy, flavour-packed wings made for sharing.',
    price: 129,
    photo: photos.wings,
    label: 'CROWD FAVOURITE',
  },
  {
    id: 'chicken-livers',
    name: 'Peri-Peri Chicken Livers',
    category: 'Starters',
    description: 'Rich peri-peri flavour, served the Crawdaddy’s way.',
    price: 99,
    photo: photos.food,
  },
  {
    id: 'cheese-burger',
    name: 'The Cheese Burger',
    category: 'Burgers',
    description: 'Juicy beef, melted cheese and all the good stuff.',
    price: 149,
    photo: photos.burger,
    label: 'A CLASSIC',
  },
  {
    id: 'jalapeno-burger',
    name: 'Jalapeño Bacon & Cheese Burger',
    category: 'Burgers',
    description: 'Smoky, cheesy and with just the right kick.',
    price: 179,
    photo: image('photo-1568901346375-23c9450c58cd'),
  },
  {
    id: 'sirloin',
    name: 'Flame-Grilled Sirloin',
    category: 'Grills',
    description: 'A beautifully grilled cut for a proper steak night.',
    price: 259,
    photo: photos.steak,
    label: 'FROM THE GRILL',
  },
  {
    id: 'ribs',
    name: 'Sticky BBQ Ribs',
    category: 'Grills',
    description: 'Tender ribs, smoky basting and big flavour.',
    price: 239,
    photo: photos.hero,
  },
  {
    id: 'calamari',
    name: 'Calamari',
    category: 'Seafood',
    description: 'Golden and delicious with a coastal touch.',
    price: 169,
    photo: photos.seafood,
  },
  {
    id: 'prawns',
    name: 'Grilled Prawns',
    category: 'Seafood',
    description: 'Beautifully grilled seafood with rich, vibrant flavour.',
    price: 279,
    photo: image('photo-1625944525533-473f1a3d54e7'),
  },
  {
    id: 'breakfast',
    name: 'The Breakfast Table',
    category: 'Breakfast',
    description: 'A slow morning, something delicious and good coffee.',
    price: 119,
    photo: photos.breakfast,
  },
  {
    id: 'salad',
    name: 'Fresh Garden Salad',
    category: 'Lighter Bites',
    description: 'Fresh greens and colourful seasonal ingredients.',
    price: 109,
    photo: photos.salad,
  },
  {
    id: 'margarita',
    name: 'Classic Margarita',
    category: 'Cocktails',
    description: 'Bright citrus notes and a little bar-side magic.',
    price: 95,
    photo: photos.cocktails,
    label: 'SIP SOMETHING GOOD',
  },
  {
    id: 'wine',
    name: 'A Glass of Red',
    category: 'Wine',
    description: 'A relaxed evening deserves a beautiful glass of wine.',
    price: 89,
    photo: photos.wine,
  },
  {
    id: 'dessert',
    name: 'Chocolate Indulgence',
    category: 'Desserts',
    description: 'A rich, sweet finish to a really good meal.',
    price: 105,
    photo: photos.dessert,
  },
];

const rewards = [
  {
    id: 'birthday',
    title: 'Your Birthday Moment',
    type: 'Birthday',
    image: photos.dessert,
    description:
      'Make another trip around the sun worth celebrating. A birthday surprise is one delicious possibility for club members.',
    terms:
      'Proposed membership benefit. The reward, eligibility and redemption conditions require Crawdaddy’s management approval.',
  },
  {
    id: 'dining',
    title: 'Something for the Regulars',
    type: 'Dining',
    image: photos.burger,
    description:
      'A little extra appreciation for the guests who keep coming back for their favourites.',
    terms:
      'Proposed member benefit. No discount, gift or entitlement is currently confirmed.',
  },
  {
    id: 'experiences',
    title: 'Good Times, Together',
    type: 'Experiences',
    image: photos.cocktails,
    description:
      'From a special table to an unforgettable occasion, the good times are better shared.',
    terms:
      'Proposed experience benefit. Availability and conditions would be determined by management.',
  },
];

const spaces = [
  {
    name: 'Tapas',
    category: 'OUTDOOR SOCIAL DINING',
    description: 'A vibrant place to gather, linger and enjoy the atmosphere.',
    image: photos.restaurant,
  },
  {
    name: 'The Deck',
    category: 'OPEN-AIR DINING',
    description: 'An upstairs escape for good food and easy conversation.',
    image: photos.table,
  },
  {
    name: 'Inside Dining',
    category: 'THE MAIN RESTAURANT',
    description: 'Beautifully plated meals, lively tables and great hospitality.',
    image: photos.food,
  },
  {
    name: 'Wine Cellar',
    category: 'WINE & SOCIAL OCCASIONS',
    description: 'A more intimate setting for drinks and winding down.',
    image: photos.wine,
  },
];

const initialMember = {
  name: 'Amara Mokoena',
  email: 'amara@example.com',
  birthday: '2000-11-02',
  marketing: false,
};

function birthdayCountdown(dateString) {
  if (!dateString) return null;

  const parts = dateString.split('-').map(Number);
  const today = new Date();
  const current = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  let next = new Date(today.getFullYear(), parts[1] - 1, parts[2]);

  if (next < current) {
    next = new Date(today.getFullYear() + 1, parts[1] - 1, parts[2]);
  }

  return Math.round((next - current) / 86400000);
}

function money(amount) {
  return `R${amount.toFixed(2)}`;
}

function Eyebrow({ children, light = false }) {
  return (
    <span className={`eyebrow ${light ? 'eyebrow-light' : ''}`}>
      <span className="eyebrow-mark" />
      {children}
    </span>
  );
}

function PrimaryButton({
  children,
  to,
  onClick,
  light = false,
  outline = false,
  type = 'button',
  disabled = false,
}) {
  const className = [
    'button',
    light ? 'button-light' : 'button-primary',
    outline ? 'button-outline' : '',
  ]
    .filter(Boolean)
    .join(' ');

  if (to) {
    return (
      <Link className={className} to={to}>
        {children}
        <ArrowUpRight size={18} />
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
      <ArrowUpRight size={18} />
    </button>
  );
}

function Brand() {
  return (
    <Link to="/" className="brand" aria-label="Crawdaddy's home">
      <img src="/brand/crawdaddys-logo.png" alt="Crawdaddy's" />
      <div>
        <strong>CRAWDADDY’S</strong>
        <span>GOOD FOOD & PUB CO.</span>
      </div>
    </Link>
  );
}

function Header({ cartCount }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="announcement">
        <span>GOOD FOOD. GREAT COMPANY. SINCE 1995.</span>
        <span className="announcement-divider">✳</span>
        <span>THE GOOD TIMES LIVE IN TZANEEN</span>
      </div>

      <header className="site-header">
        <div className="header-inner">
          <Brand />

          <nav className="desktop-nav" aria-label="Main navigation">
            <NavLink to="/" end>Discover</NavLink>
            <NavLink to="/menu">Food & Drinks</NavLink>
            <NavLink to="/experiences">Experiences</NavLink>
            <NavLink to="/rewards">Rewards</NavLink>
            <NavLink to="/membership">My Club</NavLink>
          </nav>

          <div className="header-actions">
            <Link to="/menu" className="header-order">
              ORDER FOOD <ArrowUpRight size={16} />
            </Link>

            <Link
              to="/cart"
              className="header-cart"
              aria-label={`Cart, ${cartCount} items`}
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && <span>{cartCount}</span>}
            </Link>

            <button
              className="menu-toggle"
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              {open ? <X size={25} /> : <MenuIcon size={25} />}
            </button>
          </div>
        </div>

        {open && (
          <nav className="mobile-menu">
            <NavLink to="/">Discover</NavLink>
            <NavLink to="/menu">Food & Drinks</NavLink>
            <NavLink to="/experiences">Experiences</NavLink>
            <NavLink to="/rewards">Rewards</NavLink>
            <NavLink to="/membership">My Membership</NavLink>
            <NavLink to="/join">Join the Club</NavLink>
          </nav>
        )}
      </header>
    </>
  );
}

function MobileNav({ cartCount }) {
  return (
    <nav className="bottom-nav" aria-label="Mobile navigation">
      <NavLink to="/" end>
        <UtensilsCrossed size={20} />
        <span>Discover</span>
      </NavLink>

      <NavLink to="/menu">
        <Search size={21} />
        <span>Menu</span>
      </NavLink>

      <NavLink to="/cart">
        <span className="nav-cart-icon">
          <ShoppingBag size={20} />
          {cartCount > 0 && <b>{cartCount}</b>}
        </span>
        <span>Cart</span>
      </NavLink>

      <NavLink to="/rewards">
        <Gift size={21} />
        <span>Rewards</span>
      </NavLink>

      <NavLink to="/experiences">
        <Sparkles size={21} />
        <span>Explore</span>
      </NavLink>
    </nav>
  );
}

function Reveal({ children, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

function HomePage({ onDish }) {
  const featured = [
    menuItems[2],
    menuItems[4],
    menuItems[0],
    menuItems[10],
  ];

  const categoryTiles = [
    { name: 'Burgers', photo: photos.burger },
    { name: 'Grills', photo: photos.steak },
    { name: 'Seafood', photo: photos.seafood },
    { name: 'Cocktails', photo: photos.cocktails },
  ];

  return (
    <>
      <section className="home-hero">
        <div className="hero-copy">
          <Eyebrow light>WELCOME TO CRAW DADDY’S</Eyebrow>

          <h1>
            GOOD FOOD.
            <br />
            <em>GREAT TIMES.</em>
            <br />
            ALWAYS.
          </h1>

          <p>
            Big flavours. Beautiful moments. Great people around the
            table. There’s always a reason to come together.
          </p>

          <div className="hero-ctas">
            <PrimaryButton to="/menu">EXPLORE THE MENU</PrimaryButton>
            <PrimaryButton to="/experiences" outline light>
              THE EXPERIENCE
            </PrimaryButton>
          </div>

          <div className="hero-lower">
            <span>01 / THE CRAW DADDY’S EXPERIENCE</span>
            <span>TZANEEN · SOUTH AFRICA</span>
          </div>
        </div>

        <div className="hero-image">
          <img src={photos.hero} alt="Beautifully prepared grilled food" />
          <div className="hero-image-shade" />
          <div className="hero-circle">
            <span>COME HUNGRY</span>
            <UtensilsCrossed size={27} />
            <span>LEAVE HAPPY</span>
          </div>
          <span className="hero-image-label">A TASTE OF THE GOOD LIFE.</span>
        </div>
      </section>

      <div className="marquee-strip" aria-label="Restaurant highlights">
        <div>
          <span>GOOD FOOD</span><span>✳</span>
          <span>COCKTAIL HOURS</span><span>✳</span>
          <span>THE WINE CELLAR</span><span>✳</span>
          <span>GREAT COMPANY</span><span>✳</span>
          <span>GOOD FOOD</span><span>✳</span>
        </div>
      </div>

      <section className="quick-links page-container">
        <Link to="/menu" className="quick-link quick-link-pink">
          <span>01 / FOOD & DRINKS</span>
          <div>
            <UtensilsCrossed size={31} />
            <ArrowUpRight size={24} />
          </div>
          <h2>THE MENU.</h2>
          <p>Find something worth coming hungry for.</p>
        </Link>

        <Link to="/cart" className="quick-link quick-link-yellow">
          <span>02 / YOUR WAY</span>
          <div>
            <ShoppingBag size={31} />
            <ArrowUpRight size={24} />
          </div>
          <h2>ORDER & COLLECT.</h2>
          <p>Your favourites, ready when you are.</p>
        </Link>

        <Link to="/experiences" className="quick-link quick-link-blue">
          <span>03 / MAKE IT A MOMENT</span>
          <div>
            <CalendarDays size={31} />
            <ArrowUpRight size={24} />
          </div>
          <h2>GET TOGETHER.</h2>
          <p>Birthdays, good company and memorable occasions.</p>
        </Link>
      </section>

      <section className="section-pad page-container">
        <Reveal className="section-title-row">
          <div>
            <Eyebrow>STRAIGHT FROM THE KITCHEN</Eyebrow>
            <h2 className="display-title">
              SOMETHING <em>DELICIOUS.</em>
            </h2>
          </div>
          <Link className="inline-link" to="/menu">
            SEE THE FULL MENU <ArrowUpRight size={18} />
          </Link>
        </Reveal>

        <div className="category-grid">
          {categoryTiles.map((tile, index) => (
            <Reveal key={tile.name} className="category-tile">
              <Link to={`/menu?category=${tile.name}`}>
                <img src={tile.photo} alt="" loading="lazy" />
                <div className="category-tile-shade" />
                <span>0{index + 1} / TAKE YOUR PICK</span>
                <h3>{tile.name}</h3>
                <ArrowUpRight size={24} />
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="editorial-split">
        <div className="editorial-image">
          <img src={photos.table} alt="Warm, lively restaurant atmosphere" />
        </div>
        <div className="editorial-copy">
          <Eyebrow light>NOT JUST DINNER</Eyebrow>
          <h2>
            STAY FOR
            <br />
            <em>THE FEELING.</em>
          </h2>
          <p>
            The first sip. The favourite dish. The laughter across
            the table. From casual catch-ups to unforgettable
            celebrations, every visit has its own story.
          </p>
          <PrimaryButton to="/experiences" light>
            DISCOVER OUR SPACES
          </PrimaryButton>
          <span className="editorial-signature">Good times are better shared.</span>
        </div>
      </section>

      <section className="section-pad page-container">
        <Reveal className="section-title-row">
          <div>
            <Eyebrow>ON EVERY GOOD TABLE</Eyebrow>
            <h2 className="display-title">
              THE <em>FAVOURITES.</em>
            </h2>
          </div>
          <p className="section-aside">
            The kind of food that makes you plan your next visit
            before you’ve even left.
          </p>
        </Reveal>

        <div className="featured-grid">
          {featured.map((dish) => (
            <button
              key={dish.id}
              className="featured-item"
              onClick={() => onDish(dish)}
            >
              <div className="featured-photo">
                <img src={dish.photo} alt="" loading="lazy" />
                <span><Plus size={18} /></span>
              </div>
              <div className="featured-name">
                <h3>{dish.name}</h3>
                <ArrowUpRight size={20} />
              </div>
              <p>{dish.category}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="membership-promo">
        <div className="membership-promo-copy">
          <Eyebrow light>THE GOOD FOOD CLUB</Eyebrow>
          <h2>
            YOUR TABLE.
            <br />
            <em>YOUR REWARDS.</em>
          </h2>
          <p>
            Great food deserves great rewards. Keep your favourites
            close, celebrate your birthday and carry your membership
            wherever you go.
          </p>
          <PrimaryButton to="/join" light>JOIN THE CLUB</PrimaryButton>
        </div>

        <div className="membership-promo-graphic">
          <div className="preview-membership">
            <img
              src="/brand/crawdaddys-logo.png"
              alt="Crawdaddy’s"
            />
            <span>THE GOOD FOOD CLUB</span>
            <strong>GOOD TIMES.<br />GREAT REWARDS.</strong>
            <small>MEMBER SINCE 2026</small>
          </div>
          <span className="membership-promo-orbit">✳</span>
        </div>
      </section>

      <section className="events-teaser page-container section-pad">
        <Reveal className="section-title-row">
          <div>
            <Eyebrow>THERE’S ALWAYS SOMETHING HAPPENING</Eyebrow>
            <h2 className="display-title">
              MAKE IT <em>A NIGHT.</em>
            </h2>
          </div>
          <Link className="inline-link" to="/experiences">
            EXPLORE EXPERIENCES <ArrowUpRight size={18} />
          </Link>
        </Reveal>

        <div className="events-teaser-grid">
          <Link to="/experiences" className="event-wide-card">
            <img src={photos.cocktails} alt="Colourful cocktails" />
            <div>
              <span>COCKTAILS · THE BAR · GOOD COMPANY</span>
              <h3>RAISE A GLASS.</h3>
              <ArrowUpRight />
            </div>
          </Link>

          <Link to="/experiences" className="event-wide-card">
            <img src={photos.celebration} alt="Beautiful celebration table" />
            <div>
              <span>BIRTHDAYS · GROUPS · OCCASIONS</span>
              <h3>GATHER ROUND.</h3>
              <ArrowUpRight />
            </div>
          </Link>
        </div>
      </section>
    </>
  );
}

function MenuPage({ onDish, onSave, saved }) {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState('');

  const category = params.get('category') || 'All';

  const visible = menuItems.filter((item) => {
    const categoryMatch =
      category === 'All' || item.category === category;

    const searchMatch = (
      `${item.name} ${item.description} ${item.category}`
    )
      .toLowerCase()
      .includes(query.toLowerCase());

    return categoryMatch && searchMatch;
  });

  return (
    <div className="menu-page">
      <section className="inner-hero menu-hero">
        <div className="page-container inner-hero-content">
          <Eyebrow light>THE CRAW DADDY’S MENU</Eyebrow>
          <h1>
            FIND YOUR
            <br />
            <em>CRAVING.</em>
          </h1>
          <p>From the grill to the cocktail glass. Let’s eat.</p>
        </div>
      </section>

      <div className="menu-toolbar page-container">
        <div className="menu-toolbar-heading">
          <div>
            <span>FOOD & DRINKS</span>
            <h2>TAKE YOUR PICK.</h2>
          </div>

          <div className="menu-search">
            <Search size={20} />
            <input
              type="search"
              placeholder="Search the menu..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              aria-label="Search the menu"
            />
          </div>
        </div>

        <div className="category-tabs" aria-label="Menu categories">
          {categories.map((item) => (
            <button
              key={item}
              className={item === category ? 'selected' : ''}
              onClick={() =>
                setParams(item === 'All' ? {} : { category: item })
              }
            >
              {item}
            </button>
          ))}
        </div>

        <div className="menu-results-row">
          <span>{visible.length} DELICIOUS POSSIBILITIES</span>
          <span>AVAILABLE FOR YOUR NEXT VISIT</span>
        </div>
      </div>

      <section className="menu-grid page-container">
        {visible.map((dish) => (
          <article className="menu-item" key={dish.id}>
            <button
              className="menu-item-image"
              onClick={() => onDish(dish)}
              aria-label={`View ${dish.name}`}
            >
              <img src={dish.photo} alt={dish.name} loading="lazy" />
              {dish.label && <span className="dish-label">{dish.label}</span>}
            </button>

            <div className="menu-item-info">
              <div className="menu-item-head">
                <span>{dish.category.toUpperCase()}</span>
                <button
                  onClick={() => onSave(dish.id)}
                  aria-label={
                    saved.includes(dish.id)
                      ? `Remove ${dish.name} from favourites`
                      : `Save ${dish.name} to favourites`
                  }
                  className={`save-button ${
                    saved.includes(dish.id) ? 'saved' : ''
                  }`}
                >
                  <Heart
                    size={20}
                    fill={saved.includes(dish.id) ? 'currentColor' : 'none'}
                  />
                </button>
              </div>

              <h3>{dish.name}</h3>
              <p>{dish.description}</p>

              <div className="menu-item-bottom">
                <strong>{money(dish.price)}</strong>
                <button onClick={() => onDish(dish)}>
                  ADD <Plus size={16} />
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>

      {visible.length === 0 && (
        <div className="empty-state page-container">
          <Search size={36} />
          <h3>NOTHING ON THIS PLATE.</h3>
          <p>Try another search or choose a different category.</p>
          <PrimaryButton onClick={() => {
            setQuery('');
            setParams({});
          }}>
            SHOW ALL FOOD
          </PrimaryButton>
        </div>
      )}

      <p className="page-note page-container">
        Prices and item descriptions shown here are illustrative and
        must be checked against the restaurant’s current menu.
      </p>
    </div>
  );
}

function DishModal({ dish, onClose, onAdd }) {
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');

  if (!dish) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <section
        className="dish-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dish-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <X size={22} />
        </button>

        <div className="dish-dialog-image">
          <img src={dish.photo} alt={dish.name} />
        </div>

        <div className="dish-dialog-copy">
          <Eyebrow>{dish.category.toUpperCase()}</Eyebrow>
          <h2 id="dish-title">{dish.name}</h2>
          <p>{dish.description}</p>
          <strong className="dish-dialog-price">{money(dish.price)}</strong>

          <label className="field">
            <span>ANYTHING WE SHOULD KNOW?</span>
            <textarea
              rows={3}
              placeholder="Preference or special request..."
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
            />
          </label>

          <div className="dish-add-row">
            <div className="quantity-control">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                aria-label="Decrease quantity"
              >
                <Minus size={16} />
              </button>
              <strong>{quantity}</strong>
              <button
                onClick={() => setQuantity(quantity + 1)}
                aria-label="Increase quantity"
              >
                <Plus size={16} />
              </button>
            </div>

            <button
              className="add-to-cart-button"
              onClick={() => {
                onAdd(dish, quantity, notes.trim());
                onClose();
              }}
            >
              ADD TO BAG · {money(dish.price * quantity)}
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function CartPage({ cart, updateQuantity, removeItem, clearCart }) {
  const navigate = useNavigate();
  const [mode, setMode] = useState('collection');
  const [confirmed, setConfirmed] = useState(false);
  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    time: 'As soon as possible',
  });

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (confirmed) {
    return (
      <section className="checkout-success page-container">
        <div className="success-badge"><CheckCircle2 size={35} /></div>
        <Eyebrow>YOUR ORDER PREVIEW</Eyebrow>
        <h1>LOOKS<br /><em>DELICIOUS.</em></h1>
        <p>
          Your {mode} order preview is ready. No order has been sent
          to the restaurant and no payment has been made.
        </p>
        <PrimaryButton
          onClick={() => {
            clearCart();
            navigate('/menu');
          }}
        >
          BACK TO THE MENU
        </PrimaryButton>
      </section>
    );
  }

  return (
    <section className="cart-page page-container">
      <div className="page-heading">
        <Eyebrow>YOUR FOOD, YOUR WAY</Eyebrow>
        <h1>YOUR <em>BAG.</em></h1>
        <p>Almost time for something good.</p>
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <ShoppingBag size={48} />
          <h2>YOUR BAG IS HUNGRY.</h2>
          <p>Let’s find something delicious to put in it.</p>
          <PrimaryButton to="/menu">EXPLORE THE MENU</PrimaryButton>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-list">
            {cart.map((item) => (
              <div className="cart-row" key={item.key}>
                <img src={item.photo} alt="" />
                <div className="cart-row-info">
                  <span>{item.category.toUpperCase()}</span>
                  <h3>{item.name}</h3>
                  {item.notes && <p>{item.notes}</p>}
                  <strong>{money(item.price * item.quantity)}</strong>
                </div>
                <div className="cart-row-actions">
                  <button
                    onClick={() => removeItem(item.key)}
                    aria-label={`Remove ${item.name}`}
                  >
                    <Trash2 size={18} />
                  </button>
                  <div className="quantity-control">
                    <button
                      onClick={() => updateQuantity(item.key, -1)}
                      aria-label="Decrease quantity"
                    >
                      <Minus size={15} />
                    </button>
                    <b>{item.quantity}</b>
                    <button
                      onClick={() => updateQuantity(item.key, 1)}
                      aria-label="Increase quantity"
                    >
                      <Plus size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>HOW WOULD YOU LIKE IT?</h2>

            <div className="service-options">
              <button
                className={mode === 'collection' ? 'selected' : ''}
                onClick={() => setMode('collection')}
              >
                <ShoppingBag size={21} />
                <strong>COLLECTION</strong>
                <span>Pick it up</span>
              </button>

              <button
                className={mode === 'delivery' ? 'selected' : ''}
                onClick={() => setMode('delivery')}
              >
                <MapPin size={21} />
                <strong>DELIVERY</strong>
                <span>To your door</span>
              </button>
            </div>

            <p className="service-message">
              {mode === 'collection'
                ? 'Collection would be arranged with the Tzaneen restaurant.'
                : 'Delivery availability and fulfilment would need to be confirmed with the restaurant or its delivery partner.'}
            </p>

            <form onSubmit={(event) => {
              event.preventDefault();
              setConfirmed(true);
            }}>
              <label className="field">
                <span>YOUR NAME</span>
                <input
                  value={customer.name}
                  required
                  placeholder="Name for the order"
                  onChange={(event) => setCustomer({
                    ...customer,
                    name: event.target.value,
                  })}
                />
              </label>

              <label className="field">
                <span>CONTACT NUMBER</span>
                <input
                  value={customer.phone}
                  required
                  type="tel"
                  placeholder="Your phone number"
                  onChange={(event) => setCustomer({
                    ...customer,
                    phone: event.target.value,
                  })}
                />
              </label>

              <label className="field">
                <span>PREFERRED TIME</span>
                <select
                  value={customer.time}
                  onChange={(event) => setCustomer({
                    ...customer,
                    time: event.target.value,
                  })}
                >
                  <option>As soon as possible</option>
                  <option>In about 30 minutes</option>
                  <option>In about 1 hour</option>
                  <option>Later today</option>
                </select>
              </label>

              <div className="cart-totals">
                <div>
                  <span>SUBTOTAL</span>
                  <strong>{money(total)}</strong>
                </div>
                <small>
                  Illustrative pricing. Taxes, fees and availability
                  have not been confirmed.
                </small>
              </div>

              <button type="submit" className="checkout-button">
                PREVIEW MY ORDER <ArrowRight size={19} />
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

function MembershipCard({ member }) {
  const [flipped, setFlipped] = useState(false);
  const number = 'CDR-001842';

  return (
    <button
      className={`membership-flip ${flipped ? 'is-flipped' : ''}`}
      onClick={() => setFlipped(!flipped)}
      aria-label={
        flipped
          ? 'Show the front of your membership card'
          : 'Flip card to show QR code'
      }
      aria-pressed={flipped}
    >
      <span className="membership-flip-inner">
        <span className="membership-face membership-front">
          <span className="membership-top">
            <span>CRAWDADDY’S REWARDS</span>
            <Sparkles size={25} />
          </span>

          <span className="membership-middle">
            <small>THE GOOD FOOD CLUB</small>
            <strong>{member.name}</strong>
          </span>

          <span className="membership-bottom">
            <span>
              <small>MEMBERSHIP NUMBER</small>
              <b>{number}</b>
            </span>
            <span className="flip-hint">TAP TO SCAN ↗</span>
          </span>
        </span>

        <span className="membership-face membership-back">
          <small>CRAWDADDY’S REWARDS</small>
          <strong>SCAN YOUR CARD</strong>
          <span className="qr-frame">
            <QRCodeSVG
              value={`CRAWDADDYS-REWARDS:${number}`}
              size={145}
              level="M"
              marginSize={2}
            />
          </span>
          <b>{number}</b>
          <span className="scan-caption">
            Show your membership code at the restaurant
          </span>
          <span className="flip-back-hint">↶ TAP TO FLIP BACK</span>
        </span>
      </span>
    </button>
  );
}

function MembershipPage({ member, onReward, saved }) {
  const days = birthdayCountdown(member.birthday);
  const name = member.name.trim().split(' ')[0] || 'Friend';
  const favourites = menuItems.filter((item) => saved.includes(item.id));

  const birthdayTitle =
    days === 0
      ? 'IT’S YOUR BIRTHDAY!'
      : days === 1
      ? 'YOUR BIRTHDAY IS TOMORROW!'
      : `${days} DAYS TO GO.`;

  return (
    <section className="membership-page page-container">
      <div className="member-heading">
        <div>
          <Eyebrow>YOUR GOOD FOOD CLUB</Eyebrow>
          <h1>HEY, <em>{name.toUpperCase()}.</em></h1>
          <p>Good to have you back. Your table is waiting.</p>
        </div>
        <div className="member-avatar">
          {name.charAt(0).toUpperCase()}
        </div>
      </div>

      <div className="member-dashboard">
        <MembershipCard member={member} />

        <div className="birthday-panel">
          <div className="birthday-panel-top">
            <span><Gift size={18} /> YOUR SPECIAL DAY</span>
            <Sparkles size={27} />
          </div>

          <div>
            <small>ANOTHER YEAR. ANOTHER REASON TO CELEBRATE.</small>
            <h2>{birthdayTitle}</h2>
            <p>
              The best birthdays are spent around a table with
              great food and even better company.
            </p>
          </div>

          <button onClick={() => onReward(rewards[0])}>
            EXPLORE BIRTHDAY REWARDS <ArrowUpRight size={19} />
          </button>
        </div>
      </div>

      <div className="dashboard-below">
        <div className="dashboard-info">
          <Eyebrow>THE LITTLE DETAILS</Eyebrow>
          <h2>YOUR PROFILE.</h2>
          <div><span>NAME</span><strong>{member.name}</strong></div>
          <div><span>EMAIL</span><strong>{member.email}</strong></div>
          <div>
            <span>BIRTHDAY</span>
            <strong>{member.birthday || 'Not added yet'}</strong>
          </div>
          <div>
            <span>EMAIL UPDATES</span>
            <strong>{member.marketing ? 'Subscribed' : 'Not subscribed'}</strong>
          </div>
        </div>

        <div className="dashboard-info dashboard-favourites">
          <Eyebrow>GOOD TASTE, SAVED</Eyebrow>
          <h2>YOUR FAVOURITES.</h2>
          {favourites.length > 0 ? (
            favourites.map((dish) => (
              <div key={dish.id}>
                <span>{dish.category}</span>
                <strong>{dish.name}</strong>
              </div>
            ))
          ) : (
            <p>
              Love something on the menu? Tap the heart to keep
              it close.
            </p>
          )}
          <Link to="/menu" className="inline-link">
            EXPLORE THE MENU <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function RewardsPage({ onReward }) {
  const [filter, setFilter] = useState('All');

  const visible =
    filter === 'All'
      ? rewards
      : rewards.filter((reward) => reward.type === filter);

  return (
    <section className="rewards-page">
      <div className="rewards-banner">
        <div className="page-container">
          <Eyebrow light>THE GOOD FOOD CLUB</Eyebrow>
          <h1>GOOD FOOD.<br /><em>GREAT REWARDS.</em></h1>
          <p>
            Celebrate the little things. The big things.
            And everything delicious in between.
          </p>
          <PrimaryButton to="/membership" light>
            VIEW MY MEMBERSHIP
          </PrimaryButton>
        </div>
      </div>

      <div className="page-container rewards-content">
        <div className="section-title-row">
          <div>
            <Eyebrow>MORE REASONS TO RETURN</Eyebrow>
            <h2 className="display-title">
              THE GOOD <em>EXTRAS.</em>
            </h2>
          </div>
          <div className="reward-filters">
            {['All', 'Birthday', 'Dining', 'Experiences'].map((name) => (
              <button
                key={name}
                className={filter === name ? 'selected' : ''}
                onClick={() => setFilter(name)}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        <div className="reward-grid">
          {visible.map((reward) => (
            <article className="reward-item" key={reward.id}>
              <img src={reward.image} alt="" />
              <div>
                <span>{reward.type.toUpperCase()} REWARDS</span>
                <h3>{reward.title}</h3>
                <p>{reward.description}</p>
                <button onClick={() => onReward(reward)}>
                  VIEW DETAILS <ArrowUpRight size={18} />
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="rewards-cta">
          <div>
            <Eyebrow light>IT STARTS WITH GOOD FOOD</Eyebrow>
            <h2>YOU BELONG<br /><em>AT THE TABLE.</em></h2>
          </div>
          <PrimaryButton to="/join" light>JOIN THE CLUB</PrimaryButton>
        </div>
      </div>
    </section>
  );
}

function RewardModal({ reward, onClose }) {
  if (!reward) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <section
        className="reward-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="reward-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <X size={21} />
        </button>
        <img src={reward.image} alt="" />
        <div>
          <Eyebrow>{reward.type.toUpperCase()} BENEFIT</Eyebrow>
          <h2 id="reward-title">{reward.title}</h2>
          <p>{reward.description}</p>
          <div className="reward-disclosure">
            <Ticket size={20} />
            <div>
              <strong>REWARD CONCEPT</strong>
              <p>{reward.terms}</p>
            </div>
          </div>
          <PrimaryButton onClick={onClose}>BACK TO REWARDS</PrimaryButton>
        </div>
      </section>
    </div>
  );
}

function JoinPage({ member, onJoin, complete }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: member.name,
    email: member.email,
    birthday: member.birthday,
    marketing: member.marketing,
  });

  function update(event) {
    const { name, type, value, checked } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  return (
    <section className="join-page">
      <div className="join-photo">
        <img src={photos.table} alt="Crawdaddy's dining atmosphere" />
        <div className="join-photo-copy">
          <span>THE GOOD FOOD CLUB</span>
          <h2>
            COME HUNGRY.
            <br />
            <em>STAY A LITTLE LONGER.</em>
          </h2>
        </div>
      </div>

      <div className="join-content">
        {complete ? (
          <div className="join-complete">
            <CheckCircle2 size={48} />
            <Eyebrow>WELCOME TO THE CLUB</Eyebrow>
            <h1>YOU’RE <em>IN.</em></h1>
            <p>
              Your membership is ready to explore.
              Let’s get back to the good stuff.
            </p>
            <PrimaryButton onClick={() => navigate('/membership')}>
              VIEW MY CARD
            </PrimaryButton>
          </div>
        ) : (
          <>
            <Eyebrow>JOIN THE GOOD FOOD CLUB</Eyebrow>
            <h1>
              GOOD TIMES
              <br />
              <em>START HERE.</em>
            </h1>
            <p>
              Your favourites. Your birthday. Your very own
              Crawdaddy’s membership.
            </p>

            <form className="join-form" onSubmit={(event) => {
              event.preventDefault();
              onJoin(form);
            }}>
              <label className="field">
                <span>FULL NAME</span>
                <input
                  name="name"
                  value={form.name}
                  required
                  minLength={2}
                  placeholder="Your full name"
                  onChange={update}
                />
              </label>

              <label className="field">
                <span>EMAIL ADDRESS</span>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  required
                  placeholder="Your email"
                  onChange={update}
                />
              </label>

              <label className="field">
                <span>DATE OF BIRTH</span>
                <input
                  name="birthday"
                  type="date"
                  value={form.birthday}
                  required
                  max={new Date().toISOString().slice(0, 10)}
                  onChange={update}
                />
              </label>

              <label className="check-label">
                <input
                  name="marketing"
                  type="checkbox"
                  checked={form.marketing}
                  onChange={update}
                />
                <span>
                  I’d like to hear about birthday news, upcoming
                  events and special offers. This is optional.
                </span>
              </label>

              <button type="submit" className="checkout-button">
                JOIN THE CLUB <ArrowRight size={19} />
              </button>
              <small className="form-note">
                This interactive prototype does not transmit or store
                registration details on a server.
              </small>
            </form>
          </>
        )}
      </div>
    </section>
  );
}

function ExperiencesPage() {
  const [submitted, setSubmitted] = useState(false);
  const [event, setEvent] = useState({
    occasion: 'Birthday celebration',
    guests: '10–20',
    date: '',
    notes: '',
  });

  return (
    <>
      <section className="inner-hero experience-hero">
        <div className="page-container inner-hero-content">
          <Eyebrow light>MORE THAN A RESTAURANT</Eyebrow>
          <h1>COME FOR<br /><em>THE MOMENTS.</em></h1>
          <p>
            Good food brings us together. The right setting
            makes the moment unforgettable.
          </p>
        </div>
      </section>

      <section className="section-pad page-container">
        <Reveal className="section-title-row">
          <div>
            <Eyebrow>A PLACE FOR EVERY OCCASION</Eyebrow>
            <h2 className="display-title">
              PICK YOUR <em>VIBE.</em>
            </h2>
          </div>
          <p className="section-aside">
            A restaurant with many ways to spend the afternoon,
            the evening or a little longer.
          </p>
        </Reveal>

        <div className="spaces-grid">
          {spaces.map((space, index) => (
            <Reveal className="space-card" key={space.name}>
              <img src={space.image} alt={space.name} loading="lazy" />
              <div>
                <span>0{index + 1} / {space.category}</span>
                <h3>{space.name}</h3>
                <p>{space.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="live-music-section">
        <div className="live-music-image">
          <img
            src={image('photo-1493225457124-a3eb161ffa5f')}
            alt="Live music performance"
          />
        </div>
        <div className="live-music-copy">
          <Music2 size={36} />
          <Eyebrow light>WHEN THE WEEKEND CALLS</Eyebrow>
          <h2>SATURDAY<br /><em>SOUNDS.</em></h2>
          <p>
            Music, people and something good in your glass.
            Enjoy the energy of live entertainment and DJ moments.
          </p>
          <small>
            Entertainment schedules are subject to confirmation.
          </small>
        </div>
      </section>

      <section className="hotel-story page-container">
        <div className="hotel-story-icon">
          <Users size={35} />
        </div>
        <div>
          <Eyebrow>GOOD BUSINESS. GREAT COMPANY.</Eyebrow>
          <h2>GATHER HERE.<br /><em>MAKE IT COUNT.</em></h2>
          <p>
            Birthdays, team lunches, corporate gatherings,
            training days, wedding celebrations and memorable
            get-togethers. Crawdaddy’s and the neighbouring
            hotel experience can complement the same occasion.
          </p>
        </div>
        <a href="#event-enquiry" className="inline-link">
          PLAN AN OCCASION <ArrowUpRight size={19} />
        </a>
      </section>

      <section className="event-enquiry" id="event-enquiry">
        <div className="page-container event-enquiry-layout">
          <div>
            <Eyebrow light>LET’S MAKE SOMETHING HAPPEN</Eyebrow>
            <h2>HAVE A<br /><em>REASON TO CELEBRATE?</em></h2>
            <p>
              A special birthday? A corporate lunch? A group
              celebration? Start imagining your next get-together.
            </p>
            <div className="enquiry-points">
              <span><Check size={18} /> Group dining</span>
              <span><Check size={18} /> Special occasions</span>
              <span><Check size={18} /> Corporate gatherings</span>
            </div>
          </div>

          {submitted ? (
            <div className="enquiry-result">
              <CheckCircle2 size={44} />
              <h3>THAT SOUNDS LIKE A PLAN.</h3>
              <p>
                Your event idea is ready to discuss with the venue.
                This preview has not been submitted to Crawdaddy’s.
              </p>
              <button onClick={() => setSubmitted(false)}>
                PLAN ANOTHER OCCASION <ArrowRight size={17} />
              </button>
            </div>
          ) : (
            <form
              className="enquiry-form"
              onSubmit={(eventObject) => {
                eventObject.preventDefault();
                setSubmitted(true);
              }}
            >
              <label className="field">
                <span>WHAT’S THE OCCASION?</span>
                <select
                  value={event.occasion}
                  onChange={(e) =>
                    setEvent({ ...event, occasion: e.target.value })
                  }
                >
                  <option>Birthday celebration</option>
                  <option>Corporate gathering</option>
                  <option>Team lunch or training</option>
                  <option>Wedding celebration</option>
                  <option>Friends & family</option>
                  <option>Something else</option>
                </select>
              </label>

              <label className="field">
                <span>HOW MANY PEOPLE?</span>
                <select
                  value={event.guests}
                  onChange={(e) =>
                    setEvent({ ...event, guests: e.target.value })
                  }
                >
                  <option>2–9</option>
                  <option>10–20</option>
                  <option>21–40</option>
                  <option>41–80</option>
                  <option>80+</option>
                </select>
              </label>

              <label className="field">
                <span>PROPOSED DATE</span>
                <input
                  type="date"
                  value={event.date}
                  onChange={(e) =>
                    setEvent({ ...event, date: e.target.value })
                  }
                  required
                />
              </label>

              <label className="field">
                <span>TELL US A LITTLE MORE</span>
                <textarea
                  rows={3}
                  value={event.notes}
                  placeholder="What would make it special?"
                  onChange={(e) =>
                    setEvent({ ...event, notes: e.target.value })
                  }
                />
              </label>

              <button className="checkout-button" type="submit">
                PREVIEW MY EVENT <ArrowRight size={19} />
              </button>
              <small>
                No enquiry will be sent. Venue arrangements require
                direct confirmation.
              </small>
            </form>
          )}
        </div>
      </section>
    </>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-container footer-top">
        <div>
          <Brand />
          <p>GOOD FOOD. GOOD PEOPLE. GREAT TIMES.</p>
        </div>

        <div className="footer-links">
          <Link to="/menu">THE MENU</Link>
          <Link to="/experiences">EXPERIENCES</Link>
          <Link to="/rewards">REWARDS</Link>
          <Link to="/join">JOIN THE CLUB</Link>
        </div>

        <div className="footer-location">
          <span><MapPin size={17} /> TZANEEN, LIMPOPO</span>
          <a
            href="https://crawdaddys.co.za/"
            target="_blank"
            rel="noreferrer"
          >
            OFFICIAL WEBSITE <ArrowUpRight size={16} />
          </a>
        </div>
      </div>

      <div className="page-container footer-bottom">
        <span>© 2026 CRAW DADDY’S EXPERIENCE CONCEPT</span>
        <span>
          INDEPENDENT DESIGN CONCEPT · NO LIVE ORDERS OR BOOKINGS
        </span>
      </div>
    </footer>
  );
}

function AppContent() {
  const location = useLocation();

  const [member, setMember] = useState(initialMember);
  const [joined, setJoined] = useState(false);
  const [cart, setCart] = useState([]);
  const [saved, setSaved] = useState([]);
  const [selectedDish, setSelectedDish] = useState(null);
  const [selectedReward, setSelectedReward] = useState(null);

  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  useEffect(() => {
    const onEscape = (event) => {
      if (event.key === 'Escape') {
        setSelectedDish(null);
        setSelectedReward(null);
      }
    };

    window.addEventListener('keydown', onEscape);
    return () => window.removeEventListener('keydown', onEscape);
  }, []);

  function addToCart(dish, quantity, notes) {
    const key = `${dish.id}-${notes}`;

    setCart((current) => {
      const found = current.find((item) => item.key === key);

      if (found) {
        return current.map((item) =>
          item.key === key
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...current, { ...dish, key, quantity, notes }];
    });
  }

  function updateQuantity(key, change) {
    setCart((current) =>
      current
        .map((item) =>
          item.key === key
            ? { ...item, quantity: item.quantity + change }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function toggleSaved(id) {
    setSaved((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  function joinClub(form) {
    setMember({
      name: form.name.trim(),
      email: form.email.trim(),
      birthday: form.birthday,
      marketing: form.marketing,
    });
    setJoined(true);
  }

  return (
    <div className="app-shell">
      <Header key={location.pathname} cartCount={cartCount} />

      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22 }}
        >
          <Routes location={location}>
            <Route
              path="/"
              element={<HomePage onDish={setSelectedDish} />}
            />

            <Route
              path="/menu"
              element={
                <MenuPage
                  onDish={setSelectedDish}
                  onSave={toggleSaved}
                  saved={saved}
                />
              }
            />

            <Route
              path="/cart"
              element={
                <CartPage
                  cart={cart}
                  updateQuantity={updateQuantity}
                  removeItem={(key) =>
                    setCart((current) =>
                      current.filter((item) => item.key !== key)
                    )
                  }
                  clearCart={() => setCart([])}
                />
              }
            />

            <Route
              path="/experiences"
              element={<ExperiencesPage />}
            />

            <Route
              path="/membership"
              element={
                <MembershipPage
                  member={member}
                  onReward={setSelectedReward}
                  saved={saved}
                />
              }
            />

            <Route
              path="/dashboard"
              element={
                <MembershipPage
                  member={member}
                  onReward={setSelectedReward}
                  saved={saved}
                />
              }
            />

            <Route
              path="/rewards"
              element={<RewardsPage onReward={setSelectedReward} />}
            />

            <Route
              path="/join"
              element={
                <JoinPage
                  member={member}
                  onJoin={joinClub}
                  complete={joined}
                />
              }
            />

            <Route
              path="*"
              element={<HomePage onDish={setSelectedDish} />}
            />
          </Routes>
        </motion.main>
      </AnimatePresence>

      <Footer />
      <MobileNav cartCount={cartCount} />

      {selectedDish && (
        <DishModal
          key={selectedDish.id}
          dish={selectedDish}
          onClose={() => setSelectedDish(null)}
          onAdd={addToCart}
        />
      )}

      {selectedReward && (
        <RewardModal
          reward={selectedReward}
          onClose={() => setSelectedReward(null)}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
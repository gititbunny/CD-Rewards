import { useState } from 'react';
import {
  BrowserRouter,
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router';
import { AnimatePresence, motion } from 'motion/react';
import { QRCodeSVG } from 'qrcode.react';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  ChevronRight,
  Gift,
  Heart,
  PartyPopper,
  Sparkles,
  Ticket,
  UserRound,
  UtensilsCrossed,
  X,
} from 'lucide-react';

import './App.css';
import './brand-refresh.css';
import './member-card.css';

const images = {
  restaurant: '/images/interior.jpg',
  dining: '/images/interior.webp',
  food: '/images/hero-grill.jpg',
  burger: '/images/feature-burger.jpg',
  cocktail: '/images/cocktail.jpg',
  dessert: '/images/dessert.jpg',
};

const offers = [
  {
    id: 'birthday',
    category: 'Birthday',
    eyebrow: 'YOUR BIRTHDAY, YOUR TREAT',
    title: 'Birthday dessert',
    description:
      'Make your birthday sweeter with a delicious dessert on your special day.',
    image: images.dessert,
    terms:
      'Birthday treats are subject to availability and the applicable membership terms.',
  },
  {
    id: 'dining',
    category: 'Dining',
    eyebrow: 'FOR THE FOOD LOVERS',
    title: 'The wing thing',
    description:
      'Your favourite flavours just got more rewarding. Discover exclusive dining perks.',
    image: images.food,
    terms:
      'Dining rewards may vary by location and availability.',
  },
  {
    id: 'experience',
    category: 'Experiences',
    eyebrow: 'GOOD TIMES TOGETHER',
    title: 'More reasons to celebrate',
    description:
      'Make room for more great moments with exciting members-only experiences.',
    image: images.cocktail,
    terms:
      'Member experiences are subject to availability and participating locations.',
  },
];

const initialMember = {
  name: 'Amara Mokoena',
  email: 'amara@example.com',
  birthday: '2000-11-02',
  marketing: false,
};

function birthdayCountdown(birthday) {
  if (!birthday) return null;

  const [, month, day] = birthday.split('-').map(Number);
  const now = new Date();
  const today = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );

  let next = new Date(today.getFullYear(), month - 1, day);

  if (next < today) {
    next = new Date(today.getFullYear() + 1, month - 1, day);
  }

  return Math.round(
    (Date.UTC(
      next.getFullYear(),
      next.getMonth(),
      next.getDate()
    ) -
      Date.UTC(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      )) /
      86400000
  );
}

function birthdayMessage(days) {
  if (days === 0) return "It's your birthday!";
  if (days === 1) return 'Your birthday is tomorrow!';
  if (days === null) return 'Your birthday deserves a celebration!';

  return `${days} days until your birthday`;
}

function Logo() {
  return (
    <Link to="/" className="brand" aria-label="Crawdaddy's Rewards home">
      <img
        className="brand-image"
        src="/brand/crawdaddys-logo.png"
        alt="Crawdaddy's Good Food & Pub Co."
      />

      <span className="brand-rewards">
        <strong>REWARDS</strong>
        <small>THE GOOD FOOD CLUB</small>
      </span>
    </Link>
  );
}

function Header() {
  return (
    <header className="site-header">
      <div className="container header-content">
        <Logo />

        <nav className="desktop-nav">
          <NavLink to="/" end>
            Discover
          </NavLink>
          <NavLink to="/dashboard">My membership</NavLink>
          <NavLink to="/rewards">Rewards</NavLink>
        </nav>

        <Link to="/join" className="header-button">
          JOIN THE CLUB
          <ArrowUpRight size={17} />
        </Link>
      </div>
    </header>
  );
}

function MobileNavigation() {
  return (
    <nav className="mobile-navigation">
      <NavLink to="/" end>
        <Heart size={19} />
        <span>Discover</span>
      </NavLink>

      <NavLink to="/dashboard">
        <UserRound size={19} />
        <span>My club</span>
      </NavLink>

      <NavLink to="/rewards">
        <Gift size={19} />
        <span>Rewards</span>
      </NavLink>

      <NavLink to="/join">
        <Sparkles size={19} />
        <span>Join</span>
      </NavLink>
    </nav>
  );
}

function WelcomePage() {
  return (
    <>
      <section className="hero container">
        <div className="hero-content">
          <span className="eyebrow hero-eyebrow">
            GOOD FOOD & PUB CO. · SINCE 1995
          </span>

          <h1>
            BIG FOOD.
            <br />
            BIG VIBES.
            <br />
            <em>BIG REWARDS.</em>
          </h1>

          <p className="hero-description">
            Great food deserves great rewards. From birthday treats to
            exclusive offers, there's always another reason to pull
            up a chair.
          </p>

          <div className="hero-buttons">
            <Link to="/join" className="button button-dark">
              JOIN THE CLUB
              <ArrowRight size={19} />
            </Link>

            <Link to="/rewards" className="button button-outline">
              EXPLORE REWARDS
              <ChevronRight size={19} />
            </Link>
          </div>

          <div className="hero-footnote">
            <span className="footnote-icon">
              <UtensilsCrossed size={18} />
            </span>
            MADE FOR PEOPLE WHO LOVE GOOD FOOD.
          </div>
        </div>

        <div className="hero-visual">
          <img
            src={images.food}
            alt="Deliciously prepared grilled food"
          />

          <div className="hero-image-overlay" />

          <div className="hero-stamp">
            <span>COME HUNGRY</span>
            <UtensilsCrossed size={25} />
            <span>LEAVE HAPPY</span>
          </div>

          <div className="hero-photo-caption">
            <span>GOOD FOOD. GREAT COMPANY.</span>
            <span>EST. 1995</span>
          </div>
        </div>
      </section>

      <section className="intro-strip">
        <div className="container intro-strip-content">
          <span>BURGERS & GRILLS</span>
          <span className="strip-star">✳</span>
          <span>SEAFOOD & COMBOS</span>
          <span className="strip-star">✳</span>
          <span>WINGS & GOOD TIMES</span>
          <span className="strip-star">✳</span>
          <span>REWARDS WORTH SHARING</span>
        </div>
      </section>

      <section className="section container benefits-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">
              MORE REASONS TO COME HUNGRY
            </span>

            <h2>
              YOUR FAVOURITES.
              <br />
              <em>NOW WITH PERKS.</em>
            </h2>
          </div>

          <p>
            Good food brings us together. Great rewards give us
            something extra to celebrate.
          </p>
        </div>

        <div className="benefits-grid">
          <article className="benefit-card">
            <div className="benefit-card-top">
              <span className="benefit-icon">
                <Gift size={27} />
              </span>
              <span className="benefit-number">01</span>
            </div>

            <h3>BIRTHDAY TREATS</h3>
            <p>
              Your birthday deserves something delicious.
              We've got you.
            </p>
          </article>

          <article className="benefit-card">
            <div className="benefit-card-top">
              <span className="benefit-icon">
                <Ticket size={27} />
              </span>
              <span className="benefit-number">02</span>
            </div>

            <h3>EXCLUSIVE OFFERS</h3>
            <p>
              More of the food you love, with a little something extra.
            </p>
          </article>

          <article className="benefit-card">
            <div className="benefit-card-top">
              <span className="benefit-icon">
                <Heart size={27} />
              </span>
              <span className="benefit-number">03</span>
            </div>

            <h3>MORE GOOD TIMES</h3>
            <p>
              Delicious reasons to keep coming back to the table.
            </p>
          </article>
        </div>
      </section>

      <section className="feature-section container">
        <div className="feature-image">
          <img
            src={images.burger}
            alt="Juicy burger with fresh toppings"
          />

          <div className="feature-image-tag">
            MADE FOR FOOD LOVERS
          </div>
        </div>

        <div className="feature-content">
          <span className="eyebrow">THE GOOD FOOD CLUB</span>

          <h2>
            MORE BITES.
            <br />
            <em>MORE BENEFITS.</em>
          </h2>

          <p>
            The juicy burgers. The saucy wings. The unforgettable
            grill nights. Your favourite moments at Crawdaddy's
            just got more rewarding.
          </p>

          <Link to="/rewards" className="text-link">
            SEE WHAT'S COOKING
            <ArrowUpRight size={20} />
          </Link>
        </div>
      </section>

      <section className="closing-cta container">
        <UtensilsCrossed size={31} />

        <span>
          THE TABLE IS SET. ALL THAT'S MISSING IS YOU.
        </span>

        <h2>
          COME HUNGRY.
          <br />
          LEAVE REWARDED.
        </h2>

        <Link to="/join" className="button button-light">
          GET YOUR MEMBERSHIP
          <ArrowRight size={19} />
        </Link>
      </section>
    </>
  );
}

function JoinPage({ form, setForm, onSubmit, complete }) {
  const navigate = useNavigate();

  function updateForm(event) {
    const { name, value, type, checked } = event.target;

    setForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  return (
    <section className="join-layout container">
      <div className="join-panel">
        {!complete ? (
          <>
            <span className="eyebrow">
              WELCOME TO THE GOOD FOOD CLUB
            </span>

            <h1>
              GOOD FOOD.
              <br />
              <em>GREAT REWARDS.</em>
            </h1>

            <p className="join-intro">
              Join the club for birthday surprises, exclusive offers
              and more reasons to enjoy Crawdaddy's.
            </p>

            <form className="join-form" onSubmit={onSubmit}>
              <div className="form-field">
                <label htmlFor="fullName">FULL NAME</label>
                <input
                  id="fullName"
                  name="name"
                  type="text"
                  autoComplete="off"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={updateForm}
                  minLength={2}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="email">EMAIL ADDRESS</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="off"
                  placeholder="Your email address"
                  value={form.email}
                  onChange={updateForm}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="birthday">DATE OF BIRTH</label>
                <input
                  id="birthday"
                  name="birthday"
                  type="date"
                  value={form.birthday}
                  onChange={updateForm}
                  max={new Date().toISOString().slice(0, 10)}
                  required
                />
                <small>We love celebrating birthdays!</small>
              </div>

              <label className="checkbox-row">
                <input
                  type="checkbox"
                  name="marketing"
                  checked={form.marketing}
                  onChange={updateForm}
                />

                <span>
                  Yes, I'd like to receive special offers, birthday
                  news and occasional updates from Crawdaddy's.
                  This is optional.
                </span>
              </label>

              <button
                type="submit"
                className="button button-dark submit-button"
              >
                JOIN THE CLUB
                <ArrowRight size={19} />
              </button>

              <div className="form-privacy">
                <Check size={15} />
                Your details stay in this browser during your visit.
              </div>
            </form>
          </>
        ) : (
          <div className="join-success">
            <div className="success-icon">
              <CheckCircle2 size={43} />
            </div>

            <span className="eyebrow">WELCOME TO THE CLUB</span>

            <h1>
              YOU'RE
              <br />
              <em>IN!</em>
            </h1>

            <p>
              Your membership is ready. Let's see what delicious
              rewards are waiting for you.
            </p>

            <button
              className="button button-dark"
              onClick={() => navigate('/dashboard')}
            >
              VIEW MY MEMBERSHIP
              <ArrowRight size={19} />
            </button>
          </div>
        )}
      </div>

      <div className="join-visual">
        <img
          src={images.dining}
          alt="Crawdaddy's restaurant atmosphere"
        />

        <div className="join-visual-shade" />

        <div className="join-visual-copy">
          <span>GOOD FOOD & PUB CO.</span>

          <h2>
            GREAT FOOD.
            <br />
            GOOD PEOPLE.
            <br />
            BETTER TIMES.
          </h2>

          <div className="join-visual-bottom">
            <UtensilsCrossed size={21} />
            <span>THE GOOD FOOD CLUB</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* THE NEW FLIPPING MEMBERSHIP CARD */

function MembershipFlipCard({ member }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const membershipNumber = 'CDR-001842';
  const qrValue = `CRAWDADDYS-REWARDS:${membershipNumber}`;

  function flipCard() {
    setIsFlipped((current) => !current);
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      flipCard();
    }
  }

  return (
    <div
      className={`member-flip-card ${isFlipped ? 'flipped' : ''}`}
      role="button"
      tabIndex={0}
      onClick={flipCard}
      onKeyDown={handleKeyDown}
      aria-label={
        isFlipped
          ? 'Turn membership card to the front'
          : 'Turn membership card over to show QR code'
      }
      aria-pressed={isFlipped}
    >
      <div className="member-flip-inner">
        {/* FRONT */}
        <div className="member-flip-face member-flip-front membership-card">
          <div className="membership-card-top">
            <span>CRAWDADDY'S REWARDS</span>
            <Sparkles size={25} />
          </div>

          <div className="membership-card-center">
            <span>THE GOOD FOOD CLUB</span>
            <h2>{member.name}</h2>
          </div>

          <div className="membership-card-bottom">
            <div>
              <span>MEMBERSHIP NUMBER</span>
              <strong>{membershipNumber}</strong>
            </div>

            <span className="membership-demo">
              TAP TO SCAN ↗
            </span>
          </div>
        </div>

        {/* BACK */}
        <div className="member-flip-face member-flip-back">
          <span className="member-scan-eyebrow">
            CRAW DADDY'S REWARDS
          </span>

          <strong className="member-scan-title">
            SCAN YOUR CARD
          </strong>

          <div className="member-qr-box">
            <QRCodeSVG
              value={qrValue}
              size={154}
              level="M"
              marginSize={2}
              bgColor="#ffffff"
              fgColor="#171717"
            />
          </div>

          <strong className="member-scan-number">
            {membershipNumber}
          </strong>

          <span className="member-scan-instruction">
            Show your membership code at the restaurant
          </span>

          <span className="member-flip-back-hint">
            ↶ TAP TO FLIP BACK
          </span>
        </div>
      </div>
    </div>
  );
}

function DashboardPage({ member, onOffer }) {
  const firstName =
    member.name.trim().split(/\s+/)[0] || 'Friend';

  const days = birthdayCountdown(member.birthday);

  return (
    <div className="dashboard-page container">
      <div className="dashboard-welcome">
        <div>
          <span className="eyebrow">
            YOUR CRAW DADDY'S MEMBERSHIP
          </span>

          <h1>
            HELLO, <em>{firstName.toUpperCase()}!</em>
          </h1>

          <p>
            Good to have you back. Hungry for some rewards?
          </p>
        </div>

        <div className="member-avatar">
          {firstName.charAt(0).toUpperCase()}
        </div>
      </div>

      <div className="dashboard-feature-grid">
        <MembershipFlipCard member={member} />

        <div className="birthday-feature">
          <div className="birthday-feature-top">
            <span className="birthday-badge">
              <Gift size={16} />
              YOUR SPECIAL DAY
            </span>

            <PartyPopper size={26} />
          </div>

          <div>
            <h2>{birthdayMessage(days)}</h2>
            <p>
              There's nothing quite like good food on your birthday.
              We've got something delicious in mind.
            </p>
          </div>

          <button
            className="birthday-feature-link"
            onClick={() => onOffer(offers[0])}
          >
            VIEW BIRTHDAY REWARD
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <div className="dashboard-section-heading">
        <div>
          <span className="eyebrow">
            SOMETHING GOOD IS COOKING
          </span>

          <h2>
            YOUR REWARDS.
            <em> YOUR WAY.</em>
          </h2>
        </div>

        <Link to="/rewards" className="text-link">
          VIEW ALL REWARDS
          <ArrowUpRight size={19} />
        </Link>
      </div>

      <div className="dashboard-offers">
        {offers.slice(0, 2).map((offer) => (
          <button
            key={offer.id}
            className="dashboard-offer"
            onClick={() => onOffer(offer)}
          >
            <img src={offer.image} alt="" />

            <div>
              <span>{offer.eyebrow}</span>
              <h3>{offer.title}</h3>

              <span className="offer-arrow">
                <ArrowUpRight size={20} />
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function RewardsPage({ onOffer }) {
  const [filter, setFilter] = useState('All');

  const categories = [
    'All',
    'Birthday',
    'Dining',
    'Experiences',
  ];

  const visibleOffers =
    filter === 'All'
      ? offers
      : offers.filter((offer) => offer.category === filter);

  return (
    <div className="rewards-page container">
      <div className="rewards-header">
        <div>
          <span className="eyebrow">
            YOUR GOOD FOOD BENEFITS
          </span>

          <h1>
            GOOD FOOD.
            <br />
            <em>GREAT REWARDS.</em>
          </h1>

          <p>
            Delicious perks, birthday treats and more reasons
            to keep coming back.
          </p>
        </div>

        <div className="rewards-header-icon">
          <Gift size={43} strokeWidth={1.5} />
        </div>
      </div>

      <div className="filter-row" aria-label="Filter rewards">
        {categories.map((category) => (
          <button
            key={category}
            className={`filter-button ${
              filter === category ? 'active' : ''
            }`}
            onClick={() => setFilter(category)}
            aria-pressed={filter === category}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="rewards-grid">
        {visibleOffers.map((offer) => (
          <article className="reward-card" key={offer.id}>
            <div className="reward-image">
              <img src={offer.image} alt="" />

              <span className="reward-image-label">
                {offer.category.toUpperCase()}
              </span>
            </div>

            <div className="reward-body">
              <span className="eyebrow">
                {offer.eyebrow}
              </span>

              <h2>{offer.title}</h2>
              <p>{offer.description}</p>

              <button
                className="reward-button"
                onClick={() => onOffer(offer)}
              >
                VIEW REWARD
                <ArrowUpRight size={19} />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function RewardModal({ offer, onClose }) {
  if (!offer) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <section
        className="reward-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="reward-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close reward details"
        >
          <X size={21} />
        </button>

        <img
          src={offer.image}
          alt=""
          className="modal-image"
        />

        <div className="modal-content">
          <span className="eyebrow">
            {offer.eyebrow}
          </span>

          <h2 id="reward-modal-title">
            {offer.title}
          </h2>

          <p>{offer.description}</p>

          <div className="modal-terms">
            <strong>REWARD DETAILS</strong>
            <p>{offer.terms}</p>
          </div>

          <button
            className="button button-dark modal-button"
            onClick={onClose}
          >
            BACK TO REWARDS
            <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div>
          <span className="footer-brand">
            Crawdaddy's Rewards
          </span>

          <p>
            GOOD FOOD. GREAT COMPANY. BIG REWARDS.
          </p>
        </div>

        <div className="footer-disclaimer">
          <span>THE GOOD FOOD CLUB</span>
          <span>COME HUNGRY. LEAVE HAPPY.</span>
        </div>
      </div>
    </footer>
  );
}

function AppContent() {
  const location = useLocation();

  const [member, setMember] = useState(initialMember);
  const [form, setForm] = useState(initialMember);

  const [registrationComplete, setRegistrationComplete] =
    useState(false);

  const [selectedOffer, setSelectedOffer] = useState(null);

  function handleRegistration(event) {
    event.preventDefault();

    setMember({
      name: form.name.trim(),
      email: form.email.trim(),
      birthday: form.birthday,
      marketing: form.marketing,
    });

    setRegistrationComplete(true);
  }

  return (
    <div className="app-shell">
      <Header />

      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          <Routes location={location}>
            <Route
              path="/"
              element={<WelcomePage />}
            />

            <Route
              path="/join"
              element={
                <JoinPage
                  form={form}
                  setForm={setForm}
                  onSubmit={handleRegistration}
                  complete={registrationComplete}
                />
              }
            />

            <Route
              path="/dashboard"
              element={
                <DashboardPage
                  member={member}
                  onOffer={setSelectedOffer}
                />
              }
            />

            <Route
              path="/rewards"
              element={
                <RewardsPage onOffer={setSelectedOffer} />
              }
            />

            <Route
              path="*"
              element={<WelcomePage />}
            />
          </Routes>
        </motion.main>
      </AnimatePresence>

      <Footer />

      <MobileNavigation />

      {selectedOffer && (
        <RewardModal
          offer={selectedOffer}
          onClose={() => setSelectedOffer(null)}
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
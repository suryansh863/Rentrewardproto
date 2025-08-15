import { Link } from 'react-router-dom';
import { ArrowRightIcon, CheckCircleIcon, BuildingOfficeIcon, CurrencyDollarIcon, UserGroupIcon, GiftIcon } from '@heroicons/react/24/outline';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <header className="fixed w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg z-50 py-4 px-6 shadow-sm" role="banner">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 w-8 h-8 rounded-lg" role="img" aria-label="RentReward logo"></div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              RentReward
            </span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8" role="navigation" aria-label="Main navigation">
            <a href="#features" className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors">How It Works</a>
            <a href="#benefits" className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors">Benefits</a>
          </nav>
          
          <div className="flex items-center space-x-4" role="navigation" aria-label="User authentication">
            <Link 
              to="/login" 
              className="px-4 py-2 text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium"
              aria-label="Login"
            >
              Login
            </Link>
            <Link 
              to="/signup" 
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
              aria-label="Sign up"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6" role="region" aria-labelledby="hero-heading">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 id="hero-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Rewarding <span className="text-indigo-600 dark:text-indigo-400">On-time Rent</span> Payments
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                RentReward helps property owners incentivize timely rent payments while tenants earn rewards for their punctuality.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4" role="group" aria-label="Get started options">
                <Link 
                  to="/signup" 
                  className="btn-primary flex items-center justify-center"
                  role="button"
                  aria-label="Get started"
                >
                  Get Started
                  <ArrowRightIcon className="w-5 h-5 ml-2" aria-hidden="true" />
                </Link>
                <Link 
                  to="/login" 
                  className="btn-secondary flex items-center justify-center"
                  role="button"
                  aria-label="Already have an account? Login"
                >
                  Login
                  <ArrowRightIcon className="w-5 h-5 ml-2" aria-hidden="true" />
                </Link>
              </div>
            </div>
            <div className="relative" role="img" aria-label="Modern apartment building illustration">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-100 dark:bg-indigo-900/20 rounded-full filter blur-3xl opacity-70" aria-hidden="true"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-100 dark:bg-purple-900/20 rounded-full filter blur-3xl opacity-70" aria-hidden="true"></div>
              <img 
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop" 
                alt="Modern apartment building with glass facade and balconies" 
                className="rounded-2xl shadow-2xl w-full object-cover h-[500px] relative z-10"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section 
        id="features" 
        className="py-20 px-6 bg-white dark:bg-gray-800"
        role="region" 
        aria-labelledby="features-heading"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 id="features-heading" className="text-3xl md:text-4xl font-bold mb-4">Platform Features</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our comprehensive platform offers tools for both property owners and tenants to streamline the rent payment process.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center mb-6">
                <BuildingOfficeIcon className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Property Management</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Easily manage multiple properties, units, and tenants in one centralized dashboard.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-6">
                <CurrencyDollarIcon className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Rent Tracking</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Track rent payments, submission dates, and payment methods with detailed history.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-6">
                <GiftIcon className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Rewards System</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Incentivize on-time payments with a points-based reward system that tenants love.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Digital Receipts</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Generate and store digital payment receipts and cheque images for easy reference.
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Notifications</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Automated reminders for upcoming rent due dates and payment confirmations.
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-rose-100 dark:bg-rose-900/30 rounded-lg flex items-center justify-center mb-6">
                <UserGroupIcon className="w-8 h-8 text-rose-600 dark:text-rose-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Referral Program</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Expand your network with our built-in referral system for both owners and tenants.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our platform makes rent payments and property management simple and rewarding.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?q=80&w=800&auto=format&fit=crop" 
                alt="Person managing property details on laptop" 
                className="rounded-xl shadow-xl w-full"
                loading="lazy"
                decoding="async"
              />
            </div>
            
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">1</div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Property Registration</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Owners register their properties and add tenant information to the platform.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">2</div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Tenant Onboarding</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Tenants receive login credentials and can access their personalized dashboard.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">3</div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Rent Submission</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Tenants submit rent payments and upload cheque photos through the platform.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">4</div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Owner Confirmation</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Owners review and confirm receipt of payments with just a few clicks.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">5</div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Rewards Earned</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Tenants earn reward points for on-time payments that can be redeemed for benefits.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 px-6 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Benefits for Everyone</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our platform creates value for both property owners and tenants.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Owner Benefits */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <BuildingOfficeIcon className="w-7 h-7 mr-2 text-indigo-600 dark:text-indigo-400" />
                For Property Owners
              </h3>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircleIcon className="w-6 h-6 text-green-600 dark:text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-200">Increased on-time rent payments</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="w-6 h-6 text-green-600 dark:text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-200">Simplified property and tenant management</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="w-6 h-6 text-green-600 dark:text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-200">Digital record-keeping of all transactions</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="w-6 h-6 text-green-600 dark:text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-200">Better tenant relationships and retention</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="w-6 h-6 text-green-600 dark:text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-200">Comprehensive dashboard with payment analytics</span>
                </li>
              </ul>
            </div>
            
            {/* Tenant Benefits */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <UserGroupIcon className="w-7 h-7 mr-2 text-emerald-600 dark:text-emerald-400" />
                For Tenants
              </h3>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircleIcon className="w-6 h-6 text-green-600 dark:text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-200">Earn rewards for on-time rent payments</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="w-6 h-6 text-green-600 dark:text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-200">Easy-to-use digital rent submission</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="w-6 h-6 text-green-600 dark:text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-200">Complete payment history and receipts</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="w-6 h-6 text-green-600 dark:text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-200">Reminders for upcoming due dates</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="w-6 h-6 text-green-600 dark:text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-200">Referral bonuses for inviting friends</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your rental experience?</h2>
          <p className="text-xl mb-8 text-white/90">
            Join thousands of property owners and tenants already using RentReward.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link to="/signup" className="px-8 py-4 bg-white text-indigo-600 hover:bg-gray-100 rounded-lg shadow-lg hover:shadow-xl transition-all font-bold">
              Sign Up Now
            </Link>
            <Link to="/login" className="px-8 py-4 bg-indigo-800 hover:bg-indigo-900 text-white rounded-lg shadow-lg hover:shadow-xl transition-all font-bold">
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 w-8 h-8 rounded-lg"></div>
                <span className="text-xl font-bold">RentReward</span>
              </div>
              <p className="text-gray-400">
                Transforming the rental experience through technology and rewards.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#benefits" className="text-gray-400 hover:text-white transition-colors">Benefits</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Login</h4>
              <ul className="space-y-2">
                <li><Link to="/login" className="text-gray-400 hover:text-white transition-colors">Login</Link></li>
                <li><Link to="/signup" className="text-gray-400 hover:text-white transition-colors">Sign Up</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} RentReward. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage; 
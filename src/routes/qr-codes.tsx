import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

export const Route = createFileRoute("/qr-codes")({
  head: () => ({
    meta: [
      { title: "Scan for Menu — Cafe Buddy's Espresso" },
      {
        name: "description",
        content: "Scan this QR code to access the full menu with 3D AR models",
      },
    ],
  }),
  component: QRCode,
});

function QRCode() {
  // Function to generate QR code URL using QR Server API
  const getMainQRCodeURL = () => {
    // Get the current host or default to localhost
    const host = typeof window !== "undefined" ? window.location.host : "localhost:8080";
    const protocol = typeof window !== "undefined" ? window.location.protocol : "http:";
    const fullUrl = `${protocol}//${host}/`;
    
    // Use QR Server API to generate QR code (larger size for printing)
    return `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(fullUrl)}`;
  };

  const websiteURL = typeof window !== "undefined" 
    ? `${window.location.protocol}//${window.location.host}/`
    : "http://192.168.43.203:8080/";

  return (
    <div className="min-h-screen bg-coffee-100 px-6 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent">Scan To Order</span>
          <h1 className="font-display text-4xl md:text-5xl mt-3 mb-4">
            Menu with 3D AR
          </h1>
          <p className="text-coffee-800/60">
            One QR code for the complete menu. Customers scan to browse and view dishes in 3D augmented reality.
          </p>
        </motion.div>

        {/* Main QR Code Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-2xl p-12 mb-12 flex flex-col items-center"
        >
          <h2 className="font-display text-2xl text-coffee-900 mb-8">Scan This QR Code</h2>
          
          {/* QR Code Image */}
          <div className="bg-coffee-50 rounded-2xl p-8 mb-8">
            <img
              src={getMainQRCodeURL()}
              alt="QR code for Cafe Buddy's Espresso menu"
              className="w-80 h-80"
            />
          </div>

          {/* Website URL Display */}
          <div className="w-full text-center mb-8">
            <p className="text-xs text-coffee-800/60 mb-2">Or visit directly:</p>
            <code className="inline-block bg-accent/10 border border-accent/30 rounded-xl px-4 py-3 text-sm text-coffee-900 break-all">
              {websiteURL}
            </code>
          </div>

          {/* Download QR Button */}
          <a
            href={getMainQRCodeURL()}
            download="cafe-buddy-menu-qr.png"
            className="px-8 py-3.5 rounded-full bg-coffee-900 text-coffee-100 text-xs font-bold uppercase tracking-widest hover:bg-accent hover:text-coffee-900 transition-colors"
          >
            Download QR Code
          </a>
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-accent/10 border border-accent/20 rounded-2xl p-8 mb-12"
        >
          <h2 className="font-display text-2xl text-coffee-900 mb-6">📱 How Customers Use It:</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent flex items-center justify-center text-coffee-900 font-bold">1</div>
              <div>
                <h3 className="font-bold text-coffee-900">Scan QR Code</h3>
                <p className="text-sm text-coffee-800/70">Customer points phone camera at QR code on table</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent flex items-center justify-center text-coffee-900 font-bold">2</div>
              <div>
                <h3 className="font-bold text-coffee-900">Opens Website</h3>
                <p className="text-sm text-coffee-800/70">Full menu loads automatically in browser</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent flex items-center justify-center text-coffee-900 font-bold">3</div>
              <div>
                <h3 className="font-bold text-coffee-900">Browse Dishes</h3>
                <p className="text-sm text-coffee-800/70">Customer swipes through categories and selects dish</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent flex items-center justify-center text-coffee-900 font-bold">4</div>
              <div>
                <h3 className="font-bold text-coffee-900">View Details</h3>
                <p className="text-sm text-coffee-800/70">Sees dish image, description, price, ingredients</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent flex items-center justify-center text-coffee-900 font-bold">5</div>
              <div>
                <h3 className="font-bold text-coffee-900">Tap "View in AR"</h3>
                <p className="text-sm text-coffee-800/70">Camera opens with 3D model ready to place</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent flex items-center justify-center text-coffee-900 font-bold">6</div>
              <div>
                <h3 className="font-bold text-coffee-900">Place in AR</h3>
                <p className="text-sm text-coffee-800/70">GLB model appears on table — rotate, zoom, take photo</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Printing Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-coffee-900 text-coffee-100 rounded-2xl p-8 mb-12"
        >
          <h2 className="font-display text-2xl mb-6">🖨️ Print & Place Instructions:</h2>
          <ul className="space-y-3 text-sm leading-relaxed">
            <li>✓ Click "Download QR Code" button above</li>
            <li>✓ Print at least 3" x 3" (larger is better for reliable scanning)</li>
            <li>✓ Use color or B&W printer (both work)</li>
            <li>✓ Laminate or use clear tape for durability</li>
            <li>✓ Mount on table with label: "📱 Scan for Menu & 3D AR"</li>
            <li>✓ Test by scanning with your phone before placing</li>
          </ul>
        </motion.div>

        {/* Testing Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-accent/10 border border-accent/20 rounded-2xl p-8"
        >
          <h2 className="font-display text-2xl text-coffee-900 mb-6">🧪 Test Right Now:</h2>
          <div className="space-y-4">
            <div>
              <p className="font-bold text-coffee-900 mb-2">Option 1: Scan QR Code Above</p>
              <p className="text-sm text-coffee-800/70">Use your phone camera to scan the QR code on this page</p>
            </div>
            <div>
              <p className="font-bold text-coffee-900 mb-2">Option 2: Visit Website Directly</p>
              <p className="text-sm text-coffee-800/70 mb-2">On your phone, go to:</p>
              <code className="inline-block bg-white px-3 py-2 rounded text-[11px] text-coffee-900 break-all">
                http://192.168.43.203:8080/
              </code>
            </div>
            <div>
              <p className="font-bold text-coffee-900 mb-2">Expected Flow:</p>
              <p className="text-sm text-coffee-800/70">
                1. Menu loads 2. Select any dish 3. Tap "View in AR" 4. Camera opens with 3D model ✅
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

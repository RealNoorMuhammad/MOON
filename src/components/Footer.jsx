import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Footer.css";

const Footer = () => {
  const [copied, setCopied] = useState(false);
  const contractAddress = "AdxNrCntq6YkYC29VffF2Fw7WC1UatKhV8J6G4ekgNx3";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(contractAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Social icons */}
        <div className="social-icons">
          <a href="https://x.com/SonCoin_" target="_blank" rel="noopener noreferrer" className="x-logo"></a>
      
          <a href="https://t.me/winningsonsol" target="_blank" rel="noopener noreferrer" className="telegram-logo"></a>
          <a
            href="https://dexscreener.com/solana/gxqaxqzxmm7hmpqlrtbcm9tztukj2m4uatvqnqj1oznf"
            target="_blank"
            rel="noopener noreferrer"
            className="dexscreener-logo"
          ></a>
        </div>

        {/* Contract Address + Copy */}
        <div className="address-copy">
          <span className="footer-text">{contractAddress}</span>

          <AnimatePresence mode="wait">
            {copied ? (
              <motion.button
                key="copied"
                className="copy-btn copied"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                ✓
              </motion.button>
            ) : (
              <motion.button
                key="copy"
                onClick={handleCopy}
                className="copy-btn"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                ⧉
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

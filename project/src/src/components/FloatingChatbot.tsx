
import React, { useState } from 'react';
import { Bot, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import AIChat from './AIChat';

const FloatingChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="mb-4 bg-white rounded-lg shadow-xl w-[350px] overflow-hidden border"
            style={{ transformOrigin: 'bottom right' }}
          >
            <div className="flex items-center justify-between p-4 border-b bg-legal-primary text-white">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                <h2 className="font-semibold">Legal Assistant</h2>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-legal-light"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="h-[450px]">
              <AIChat />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className="bg-legal-primary text-white p-3 rounded-full shadow-lg flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bot className="h-6 w-6" />
        <motion.div 
          className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      </motion.button>
    </div>
  );
};

export default FloatingChatbot;

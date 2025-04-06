
import React from 'react';
import { motion } from 'framer-motion';

interface TutorialStepProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  step: number;
}

const TutorialStep: React.FC<TutorialStepProps> = ({ title, description, icon, step }) => {
  return (
    <motion.div 
      className="text-center p-6 flex flex-col items-center max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      <motion.div 
        className="bg-legal-muted w-20 h-20 flex items-center justify-center rounded-full mb-4 text-legal-primary relative overflow-hidden group cursor-pointer"
        whileHover={{ scale: 1.1, rotateZ: 5 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-legal-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <motion.div 
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        >
          {icon}
        </motion.div>
        <motion.div
          className="absolute inset-0 bg-white opacity-0"
          whileHover={{ opacity: 0.2 }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
      <div className="relative">
        <motion.div 
          className="w-8 h-8 rounded-full bg-yellow-400 text-legal-dark flex items-center justify-center text-sm font-bold absolute -top-4 -left-4 shadow-lg"
          whileHover={{ scale: 1.2, rotate: 0 }}
          initial={{ rotate: -5 }}
          animate={{ rotate: 5 }}
          transition={{ 
            rotate: { duration: 2, repeat: Infinity, repeatType: "reverse" },
            scale: { duration: 0.2 }
          }}
        >
          {step}
        </motion.div>
      </div>
      <motion.h3 
        className="text-xl font-bold mb-2 text-white"
        whileHover={{ scale: 1.05, color: "#FFD700" }}
        transition={{ duration: 0.2 }}
      >
        {title}
      </motion.h3>
      <motion.p 
        className="text-gray-300"
        initial={{ opacity: 0.8 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {description}
      </motion.p>
      <motion.div 
        className="w-full h-1 bg-gradient-to-r from-legal-primary/20 via-yellow-400/50 to-legal-primary/20 mt-4 rounded-full"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      />
    </motion.div>
  );
};

export default TutorialStep;

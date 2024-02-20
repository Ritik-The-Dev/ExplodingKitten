import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { motion, AnimatePresence, useCycle } from 'framer-motion';
import '../App.css';

const Cards = ({ image, title, text, onClick }) => {
  const [isFlipped, flipCard] = useCycle(false, true);

  return (
    <>
      <AnimatePresence>
        <motion.div
          key="card"
          initial={false}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="border-none card w-[20rem] mr-5 h-[100%]"
          onClick={() => {
            flipCard();
            setTimeout(() => {
              onClick(isFlipped);
            }, 500);
          }}
        >
          <motion.div className="card-inner w-[20rem] h-[30rem]">
            <Card.Img className=' object-cover h-[100%]' variant="top"  src={isFlipped ? image : '/back.jpg'} />
            <motion.div className={`card-info text-white ${isFlipped ? 'flipped' : ''}`}>
              <Card.Title>{title}</Card.Title>
              <Card.Text>{text}</Card.Text>
            </motion.div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default Cards;

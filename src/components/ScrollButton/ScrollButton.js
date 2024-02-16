import React, { useState } from "react";
import { IconButton, Box } from "@mui/material";
import { ArrowUpward } from "@mui/icons-material";

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    scrolled >= 350 ? setVisible(true) : setVisible(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: "50px",
        right: "5%",
        display: visible ? "flex" : "none",
        filter: "drop-shadow(0 0 3px white)",
      }}
    >
      <IconButton onClick={() => scrollToTop()} variant="hex">
        <ArrowUpward />
      </IconButton>
    </Box>
  );
};

export default ScrollButton;

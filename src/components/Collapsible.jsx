import { useState } from "react";
import { Button, Container } from "@mui/material";

const Collapsible = ({ children, contentDescriptor, commentCount }) => {
  const [isHidden, setIsHidden] = useState(false);

  const toggleIsHidden = () => {
    setIsHidden(!isHidden);
  };

  return (
    <Container component="section">
      <Button variant="contained" color="primary" onClick={toggleIsHidden}>
        {isHidden ? "Hide" : "Show"} {contentDescriptor} ({commentCount})
      </Button>
      {isHidden ? children : null}
    </Container>
  );
};

export default Collapsible;

import styled from "styled-components";
import "./Square.scss";
import { motion } from "framer-motion";

const Square = ({
  ind,
  updateSquares,
  oColor,
  xColor,
  gridColor,
  clsName,
}: {
  ind?: number;
  oColor?: string;
  xColor?: string;
  gridColor?: string;
  updateSquares?: (ind: number) => void;
  clsName?: string;
}) => {
  const handleClick = () => {
    if (ind != undefined && updateSquares != undefined) {
      updateSquares(ind);
    }
  };

  const StyledMotionSpan = styled(motion.span)<{ color: string }>`
    &::before,
    &::after {
      background: ${(props) => props.color};
    }
  `;
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="square"
      style={{ border: `2px solid ${gridColor}` || "2px solid #000" }}
      onClick={handleClick}
    >
      {clsName &&
        (clsName === "x" ? (
          <StyledMotionSpan
            initial={{ scale: 0 }}
            color={xColor || "#000000"}
            animate={{ scale: 1 }}
            className={clsName}
          ></StyledMotionSpan>
        ) : (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={clsName}
            style={{ borderColor: oColor || "blue" }}
          ></motion.span>
        ))}
    </motion.div>
  );
};

export default Square;

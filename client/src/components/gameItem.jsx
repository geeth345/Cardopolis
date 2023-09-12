import { motion } from 'framer-motion';
import {Box, Container} from "@chakra-ui/react";

export default GameItem;

function GameItem( {data} ) {

  return (
    <motion.div drag style={{ width: '100px', height: '100px' }}>
      <Container width='100px' height='100px' bg='tomato'>
        Game Item
        {data.id}
      </Container>
    </motion.div>
  )
}


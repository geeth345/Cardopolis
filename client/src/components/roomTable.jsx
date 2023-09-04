import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer, Tfoot,
} from '@chakra-ui/react'

function RoomTable({availableRoomsData, setSelected}) {

  if (!availableRoomsData || !availableRoomsData.rooms) {
    return <p>Loading rooms...</p>;
  }
  
  return (
    <TableContainer>
      <Table variant="striped" size="sm" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Room Name</Th>
            <Th>Host</Th>
            <Th>Players</Th>
            <Th>Max</Th>
          </Tr>
        </Thead>
        <Tbody>
        {availableRoomsData.rooms.map((room, index) => (
          <Tr key={index} onClick={() => setSelected(room.id)}>
            <Td>{room.name}</Td>
            <Td>{room.host}</Td>
            <Td>{room.numUsers}</Td>
            <Td>{room.capacity}</Td>
          </Tr>
        ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export {RoomTable};
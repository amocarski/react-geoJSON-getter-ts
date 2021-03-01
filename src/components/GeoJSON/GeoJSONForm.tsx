import { Box, Button, Flex, FormControl, FormLabel, Heading, Text, Input, SimpleGrid, Spacer, FormErrorMessage } from "@chakra-ui/react";
import React, { FC } from "react";
import useFields from "../../hooks/useFields";
import { ICoordinates } from "../../models/ICoordinates";

interface GeoJSONFormProps {
    onSubmit: (coordinates: ICoordinates) => void,
    initialCoordinates: ICoordinates,
    disabled: boolean
}

const GeoJSONForm: FC<GeoJSONFormProps> = (props: GeoJSONFormProps) => {
    const { onSubmit, initialCoordinates, disabled } = props;
    const [coordinates, setCoordinates] = useFields<ICoordinates>(initialCoordinates)
    const isSomeFieldInvalid = (): boolean => Object.values(coordinates).filter((el: number) => isNaN(el)).length > 0

    return (
        <Box borderRadius="lg" borderWidth="1px" p="6" mt="6">
            <Box mb="6">
                <Heading size="md">Location coordinates</Heading>
                <Text fontSize="sm" color="gray.500">As geolocation box</Text>
            </Box>
            <Flex align="flex-end">
                <SimpleGrid columns={4} gap={3}>
                    <FormControl isInvalid={isNaN(coordinates.left)} isRequired flexGrow={1} id="left" isDisabled={disabled}>
                        <FormLabel>Left</FormLabel>
                        <Input variant="filled" value={coordinates.left} onChange={setCoordinates} type="number" name="left" placeholder="left" />
                        <FormErrorMessage>Required</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={isNaN(coordinates.bottom)} isRequired id="bottom" isDisabled={disabled}>
                        <FormLabel>Bottom</FormLabel>
                        <Input variant="filled" value={coordinates.bottom} onChange={setCoordinates} type="number" name="bottom" placeholder="bottom" />
                        <FormErrorMessage>Required</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={isNaN(coordinates.right)} isRequired id="right" isDisabled={disabled}>
                        <FormLabel>Right</FormLabel>
                        <Input variant="filled" value={coordinates.right} onChange={setCoordinates} type="number" name="right" placeholder="right" />
                        <FormErrorMessage>Required</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={isNaN(coordinates.top)} isRequired id="top" isDisabled={disabled}>
                        <FormLabel>Top</FormLabel>
                        <Input variant="filled" value={coordinates.top} onChange={setCoordinates} type="number" name="top" placeholder="top" />
                        <FormErrorMessage>Required</FormErrorMessage>
                    </FormControl>
                </SimpleGrid>
                <Spacer />
                <Button data-testid="submit" disabled={isSomeFieldInvalid() || disabled} colorScheme="blue" onClick={() => onSubmit(coordinates)}>Get data</Button>
            </Flex>
        </Box>
    )
}

export default GeoJSONForm;
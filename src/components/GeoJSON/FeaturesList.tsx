import { Box, List, ListItem, useDisclosure } from "@chakra-ui/react";
import React, { FC, useRef, useState } from "react";
import { useVirtual, VirtualItem } from "react-virtual";
import { IGeoJSON } from "../../models/IGeoJSON";
import DataModal from "../DataModal/DataModal";
import "./FeaturesList.scss";

interface FeaturesListProps {
    geoJSON: IGeoJSON
}

const FeaturesList: FC<FeaturesListProps> = (props: FeaturesListProps) => {
    const { geoJSON } = props;
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [content, setContent] = useState<Object>({})
    const parentRef = useRef<any>();
    const rowVirtualizer = useVirtual({
        size: geoJSON.features.length,
        parentRef
    });

    return (
        <>
            <DataModal data-testid="modal" isOpen={isOpen} onClose={onClose} content={content} />
            <Box
                borderRadius="lg" borderWidth="1px" p="6"
                ref={parentRef}
                className="list"
                style={{
                    overflow: "auto"
                }}
            >
                <div style={{
                    height: `${rowVirtualizer.totalSize}px`,
                    width: "100%",
                    position: "relative"
                }}
                >
                    {
                        rowVirtualizer.virtualItems.map((virtualRow: VirtualItem) => (
                            <List
                                data-testid="row"
                                key={virtualRow.index}
                                onClick={(): void => {
                                    onOpen();
                                    setContent(geoJSON.features[virtualRow.index])
                                }}
                                ref={virtualRow.measureRef}
                                className={virtualRow.index % 2 ? "listItemOdd listItem" : "listItemEven listItem"}
                                style={{
                                    width: "100%",
                                    position: "absolute",
                                    transform: `translateY(${virtualRow.start}px)`
                                }}
                            >
                                <ListItem data-testid="item">{geoJSON.features[virtualRow.index].id}</ListItem>
                            </List>
                        ))
                    }
                </div>
            </Box>
        </>
    )
}

export default FeaturesList;